export default interface Course {
  id: string,
  title: string,
  instructor: string,
  capacity: number,
  filled: number,
}

export type CourseEventHandler = (couse: Course) => void;

export function newCourse(id: string, title: string, instructor: string, capacity: number, filled = 0): Course {
  return {
    id,
    title,
    instructor,
    capacity,
    filled,
  }
}