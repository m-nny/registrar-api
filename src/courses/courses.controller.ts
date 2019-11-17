import express from 'express';

import Course from './course.interface';
import courseModel from './courses.model';
import CreateCourseDto from './course.dto';

import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';

class CourseController implements Controller {
  public path = '/courses';
  public router = express.Router();
  private course = courseModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(CreateCourseDto), this.createCourse);
    this.router.get(this.path, this.getAllCourses);
    this.router.get(`${this.path}/:id`, this.getCourseById);
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreateCourseDto, true), this.modifyCourse);
    this.router.delete(`${this.path}/:id`, this.deleteCourse);
  }

  private getAllCourses: express.RequestHandler = (request, response) => {
    this.course.find()
      .then((courses) => {
        response.send(courses);
      })
  }

  private getCourseById: express.RequestHandler = (request, response, next) => {
    const { id } = request.params;
    this.course.findById(id)
      .then((course) => {
        if (course) {
          response.send(course)
        } else {
          next(new PostNotFoundException(id));
        }
      })
  }

  private modifyCourse: express.RequestHandler = (request, response, next) => {
    const { id } = request.params;
    const courseData: Course = request.body;
    this.course.findByIdAndUpdate(id, courseData, { new: true })
      .then(course => {
        if (course) {
          response.send(course);
        } else {
          next(new PostNotFoundException(id));
        }
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

  private deleteCourse: express.RequestHandler = (request, response, next) => {
    const { id } = request.params;
    this.course.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.sendStatus(200);
        } else {
          next(new PostNotFoundException(id));
        }
      })
  }
}

export default CourseController;