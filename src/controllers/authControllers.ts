import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import env from "../util/validateEnv";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

function generateToken(): string {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

function generateJWT(tokenId: number): string {
  const payloadId = { tokenId };
  return jwt.sign(payloadId, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

type AuthRequest = Request & { user?: User };

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const emailToken = generateToken();
  const expiration = new Date(new Date().getTime() + 600000);
  const createdToken = await prisma.token.create({
    data: {
      type: "EMAIL",
      emailToken,
      expiration,
      user: {
        connectOrCreate: {
          where: {
            email,
          },
          create: {
            email,
          },
        },
      },
    },
  });
  //   console.log(createdToken);

  res.sendStatus(201);
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, emailToken } = req.body;
  const token = await prisma.token.findUnique({
    where: { emailToken },
    include: { user: { select: { id: true, email: true } } },
  });

  if (!token || !token.valid || token.expiration < new Date())
    return res.sendStatus(401);

  if (email !== token.user.email || emailToken !== token.emailToken)
    return res.sendStatus(401);

  const expiration = new Date(new Date().getTime() + env.EXPIRATION * 60);
  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  await prisma.token.update({
    where: {
      id: token.id,
    },
    data: {
      valid: false,
    },
  });

  const access_token = generateJWT(apiToken.id);
  //   console.log(access_token);
  res.sendStatus(201).json(access_token);
};

export const authenticateJwt = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader?.split(" ")[1];

  if (!jwtToken) res.sendStatus(401);

  const payloadId = jwt.verify(jwtToken!, process.env.JWT_SECRET!) as {
    tokenId: number;
  };

  if (!payloadId) res.sendStatus(401);
  const token = await prisma.token.findUnique({
    where: { id: payloadId.tokenId },
    include: { user: true },
  });

  req.user = token?.user;

  next();
};
