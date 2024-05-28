import { Router } from "express";
import * as tweetControllers from "../controllers/tweetControllers";
import * as authControllers from "../controllers/authControllers";
const tweetRouter = Router();

tweetRouter
  .route("/api/v1/tweets")
  .get(tweetControllers.getAllTweets)
  .post(authControllers.authenticateJwt, tweetControllers.createOneTweet);

tweetRouter
  .route("/api/v1/tweets/:id")
  .get(tweetControllers.getOneTweet)
  .patch(tweetControllers.updateOneTweet)
  .delete(tweetControllers.deleteOneTweet);

export default tweetRouter;
