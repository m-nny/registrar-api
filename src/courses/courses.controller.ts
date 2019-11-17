import express from 'express';

import Course, { newCourse } from './course.interface';
import courseModel from './courses.model';

import Controller from '../interfaces/controller.interface';

class CourseController implements Controller {
  public path = '/courses';
  public router = express.Router();

  private course = courseModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createCourse);
    this.router.get(this.path, this.getAllCourses);
    this.router.get(`${this.path}/:id`, this.getCourseById);
    this.router.put(`${this.path}/:id`, this.modifyCourse);
    this.router.delete(`${this.path}/:id`, this.deleteCourse);
  }

  private getAllCourses: express.RequestHandler = (request, response) => {
    this.course.find()
      .then((courses) => {
        response.send(courses);
      })
  }

  private getCourseById: express.RequestHandler = (request, response) => {
    const id = request.params.id;
    this.course.findById(id)
      .then((course) => {
        response.send(course)
      })
  }

  private modifyCourse: express.RequestHandler = (request, response) => {
    const id = request.params.id;
    const courseData: Course = request.body;
    this.course.findByIdAndUpdate(id, courseData, { new: true })
      .then(course => {
        response.send(course);
      })
  }

  private createCourse: express.RequestHandler = (request, response) => {
    const courseData = request.body;
    const createdCourse = new this.course(courseData);
    createdCourse.save()
      .then((savedCourse) => {
        response.send(savedCourse);
      });
  }

  private deleteCourse: express.RequestHandler = (request, response) => {
    const id = request.params.id;
    this.course.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.sendStatus(200);
        } else {
          response.sendStatus(404);
        }
      })
  }
}

export default CourseController;