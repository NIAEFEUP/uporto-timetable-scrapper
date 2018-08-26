import fs from "fs";
import { generateCsv } from "./csv";
import { Class, Course, CourseUnit, Faculty, Lesson } from "./models";

const FACULTIES_PATH = "./results/faculties.csv";
const COURSES_PATH = "./results/courses.csv";
const COURSE_UNITS_PATH = "./results/course_units.csv";
const CLASSES_PATH = "./results/classes.csv";
const SCHEDULES_PATH = "./results/schedules.csv";

const faculties = fs.createWriteStream(FACULTIES_PATH, {
  flags: "a"
});
const courses = fs.createWriteStream(COURSES_PATH, {
  flags: "a"
});
const courseUnits = fs.createWriteStream(COURSE_UNITS_PATH, {
  flags: "a"
});
const classes = fs.createWriteStream(CLASSES_PATH, {
  flags: "a"
});
const schedules = fs.createWriteStream(SCHEDULES_PATH, {
  flags: "a"
});

export async function appendToFaculties(facultiesArray: Faculty[]) {
  const data = await generateCsv(facultiesArray);
  faculties.write(data);
}

export async function appendToCourses(coursesArray: Course[]) {
  const data = await generateCsv(coursesArray);
  courses.write(data);
}

export async function appendToCourseUnits(courseUnitsArray: CourseUnit[]) {
  const data = await generateCsv(courseUnitsArray);
  courseUnits.write(data);
}

export async function appendToClasses(classesArray: Class[]) {
  const data = await generateCsv(classesArray);
  classes.write(data);
}

export async function appendToSchedules(schedulesArray: Lesson[]) {
  const data = await generateCsv(schedulesArray);
  schedules.write(data);
}
