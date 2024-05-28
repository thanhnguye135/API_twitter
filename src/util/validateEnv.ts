import { cleanEnv } from "envalid";
import { port, str, num } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGODB_CONNECTION: str(),
  PORT: port(),
  EXPIRATION: num(),
});
