import { Router } from "express";
import * as tweetControllers from "../controllers/tweetControllers";

const tweetRouter = Router();

tweetRouter
  .route("/api/v1/tweets")
  .get(tweetControllers.getAllTweets)
  .post(tweetControllers.createOneTweet);

tweetRouter
  .route("/api/v1/tweets/:id")
  .get(tweetControllers.getOneTweet)
  .patch(tweetControllers.updateOneTweet)
  .delete(tweetControllers.deleteOneTweet);

export default tweetRouter;
