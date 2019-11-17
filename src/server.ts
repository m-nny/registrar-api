import "dotenv/config";
import App from "./app";
import CourseController from "./courses/courses.controller";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([
  new CourseController(),
]);

app.listen();