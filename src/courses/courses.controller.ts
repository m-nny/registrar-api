import express from 'express';

import Course, { newCourse } from './course.interface';

import Controller from '../interfaces/controller.interface';


class CourseController implements Controller {
  public path = '/courses';
  public router = express.Router();

  private courses: Course[] = [
    newCourse('MATH101', 'Calculus I', 'TBA', 40),
    newCourse('MATH102', 'Calculus II', 'TBB', 40),
  ]

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllCourses);
    this.router.post(this.path, this.createNewCourse);
  }

  getAllCourses: express.RequestHandler = (request, response) => {
    response.send(this.courses);
  }

  createNewCourse: express.RequestHandler = (request, response) => {
    const course: Course = request.body;
    this.courses.push(course);
    response.send(course);
  }
}

export default CourseController;