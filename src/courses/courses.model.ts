import mongoose from 'mongoose';

import Course from './course.interface';

const courseSchema = new mongoose.Schema({
  abbreviation: String,
  title: String,
  instructor: String,
  capacity: Number,
  enrolled: Number,
})

const courseModel = mongoose.model<Course & mongoose.Document>('Course', courseSchema);

export default courseModel;
