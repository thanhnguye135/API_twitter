import express, { Request, Response } from "express";
import "dotenv/config";
import userRouter from "./routes/userRoutes";
import tweetRouter from "./routes/tweetRoutes";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(tweetRouter);

app.get("/", async (req: Request, res: Response) => {});

export default app;
