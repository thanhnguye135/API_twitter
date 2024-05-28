import express, { Request, Response } from "express";
import "dotenv/config";
import userRouter from "./routes/userRoutes";
import tweetRouter from "./routes/tweetRoutes";
import authRouter from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(tweetRouter);
app.use(authRouter);

app.get("/", async (req: Request, res: Response) => {});

export default app;
