import { Router } from "express";
import * as authControllers from "../controllers/authControllers";
const authRouter = Router();

authRouter.route("/api/v1/auth/login").post(authControllers.login);

authRouter
  .route("/api/v1/auth/authenticate")
  .post(authControllers.authenticate);

export default authRouter;
