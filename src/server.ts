import App from "./app";
import CourseController from "./courses/courses.controller";

const app = new App([
  new CourseController(),
],
  5000
);

app.listen();