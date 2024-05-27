import express, { Request, Response } from "express";
import "dotenv/config";
import userRouter from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(userRouter);

app.get("/", async (req: Request, res: Response) => {});

export default app;
