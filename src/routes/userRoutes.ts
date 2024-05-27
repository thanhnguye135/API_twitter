import { Router } from "express";
import * as userControllers from "../controllers/userControllers";

const userRouter = Router();

userRouter
  .route("/api/v1/users")
  .get(userControllers.getAllUsers)
  .post(userControllers.createOneUser);

userRouter
  .route("/api/v1/users/:id")
  .get(userControllers.getOneUser)
  .patch(userControllers.updateOneUser)
  .delete(userControllers.deleteOneUser);

export default userRouter;
