import mongoose from "mongoose";
import app from "./app";
import env from "./util/validateEnv";

const PORT = env.PORT;

mongoose
  .connect(env.MONGODB_CONNECTION)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });
