export interface Faculty {
  acronym: string;
  name: string;
}

export interface IncompleteCourse {
  facultyAcronym: string;
  id: number;
  year: number;
}

export interface Course extends IncompleteCourse {
  acronym: string;
  name: string;
  planId: number;
}

export interface Class {
  id: number;
  className: string;
}

export interface CourseUnit {
  acronym: string;
  name: string;
  courseYear: number;
  courseId: number;
  year: number;
  semesters: Period[];
}

export interface CourseUnitSearch {
  currentPage: number;
  lastPage: number;
  courseUnitIds: number[];
}

export interface IncompleteLesson {
  lessonType: LessonType;
  className: string;
  room: string;
  professor: string;
}

export interface Lesson extends IncompleteLesson {
  dayOfTheWeek: number;
  startTime: number;
  duration: number;
}

export type LessonType = "TP" | "T" | string;

export type CourseType = "MI" | "M" | "L" | "D";

/** @param 1 for annual, 2 for first semester, 3 for second semester */
export type Period = 1 | 2 | 3;
