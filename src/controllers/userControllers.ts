import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allUsers = await prisma.user.findMany({
    include: {
      tweets: {
        select: { id: true, content: true, image: true, impression: true },
      },
    },
  });

  res.json(allUsers);
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: +id },
    include: {
      tweets: {
        select: { id: true, content: true, image: true, impression: true },
      },
    },
  });

  res.json(user);
};

// TEST WITH CURL WITHOUT POSTMAN

// curl -X POST -H "Content-Type: application/json" \
// -d "{\"name\": \"Elon Musk\", \"email\": \"doge@twitter.com\", \"username\": \"elon\"}" \
// http://localhost:3000/api/v1/users

export const createOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, username } = req.body;
  const user = await prisma.user.create({
    data: {
      email,
      name,
      username,
      bio: "Hello world, I'm boring",
    },
  });

  res.json(user);
};

export const updateOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { email, name, username, bio, image } = req.body;
  const updateUser = await prisma.user.update({
    where: { id: +id },
    data: { email, name, username, bio, image },
  });

  res.json(updateUser);
};

export const deleteOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: +id } });

  res.sendStatus(204);
};
