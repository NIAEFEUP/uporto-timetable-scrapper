import fs from "fs";

const FACULTIES_PATH = "./results/faculties.csv";
const COURSES_PATH = "./results/courses.csv";
const CLASSES_PATH = "./results/classes.csv";
const SCHEDULES_PATH = "./results/schedules.csv";

if (fs.existsSync(FACULTIES_PATH)) {
  fs.unlinkSync(FACULTIES_PATH);
}

if (fs.existsSync(COURSES_PATH)) {
  fs.unlinkSync(COURSES_PATH);
}

if (fs.existsSync(CLASSES_PATH)) {
  fs.unlinkSync(CLASSES_PATH);
}

if (fs.existsSync(SCHEDULES_PATH)) {
  fs.unlinkSync(SCHEDULES_PATH);
}

const faculties = fs.createWriteStream(FACULTIES_PATH, {
  flags: "a"
});
const courses = fs.createWriteStream(COURSES_PATH, {
  flags: "a"
});
const classes = fs.createWriteStream(CLASSES_PATH, {
  flags: "a"
});
const schedules = fs.createWriteStream(SCHEDULES_PATH, {
  flags: "a"
});

export function appendToFaculties(data: string) {
  faculties.write(data);
}

export function appendToCourses(data: string) {
  courses.write(data);
}

export function appendToClasses(data: string) {
  classes.write(data);
}

export function appendToSchedules(data: string) {
  schedules.write(data);
}
