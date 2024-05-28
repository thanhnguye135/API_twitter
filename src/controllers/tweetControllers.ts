import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
type AuthRequest = Request & { user?: User };

export const getAllTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tweets = await prisma.tweet.findMany({
    select: {
      id: true,
      content: true,
      image: true,
      impression: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  res.json(tweets);
};

export const getOneTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const tweet = await prisma.tweet.findUnique({
    where: { id: +id },
    select: {
      id: true,
      content: true,
      image: true,
      impression: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          image: true,
        },
      },
    },
  });

  res.json(tweet);
};

export const createOneTweet = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { content, image, impression } = req.body;
  const user = req.user;
  const tweet = await prisma.tweet.create({
    data: {
      content,
      image,
      impression,
      userId: user?.id || 1,
    },
  });

  res.json(tweet);
};

export const updateOneTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { content, image, impression } = req.body;
  const updateTweet = await prisma.tweet.update({
    where: { id: +id },
    data: {
      content,
      image,
      impression,
    },
  });

  res.json(updateTweet);
};

export const deleteOneTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  await prisma.tweet.delete({ where: { id: +id } });

  res.sendStatus(204);
};
