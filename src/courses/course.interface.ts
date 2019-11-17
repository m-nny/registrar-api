export default interface Course {
  abbreviation: string,
  title: string,
  instructor: string,
  capacity: number,
  enrolled: number,
}

export type CourseEventHandler = (couse: Course) => void;

export function newCourse(abbreviation: string, title: string, instructor: string, capacity: number, enrolled = 0): Course {
  return {
    abbreviation,
    title,
    instructor,
    capacity,
    enrolled,
  }
}