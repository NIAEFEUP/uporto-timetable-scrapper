import { Class, Course, CourseType, Faculty, IncompleteCourse, Lesson, Period } from "./models";

const {
  appendToFaculties,
  appendToClasses,
  appendToCourses,
  appendToSchedules
} = require("./writer");
const {
  generateFacultyUrl,
  generateCoursesUrl,
  generateClassesUrl,
  generateClassScheduleUrl,
  generateCourseUrl
} = require("./url-generator");
import { fetch } from "./fetcher";
import { scrapeFaculties } from "./spiders/faculties";
import { scrapeCourses, scrapeCourse } from "./spiders/courses";
import { scrapeClasses } from"./spiders/classes";
import { scrapeSchedule } from "./spiders/schedule";
import { generateCsv } from "./csv";

async function fetchFaculties(): Promise<Faculty[]> {
  const url = generateFacultyUrl();
  const html = await fetch(url);
  const faculties: Faculty[] = scrapeFaculties(html);

  const csv = await generateCsv(faculties);

  appendToFaculties(csv);

  console.log(`Scraped ${faculties.length} faculties successfully.`);

  return faculties;
}

async function fetchCoursesByType(faculty: Faculty, courseType: CourseType, year: number): Promise<IncompleteCourse[]> {
  const url = generateCoursesUrl(faculty.acronym, courseType, year);
  const html = await fetch(url);
  return scrapeCourses(html, faculty.acronym);
}

async function fetchCourseInfo(faculty: Faculty, referer: IncompleteCourse, year: number) {
  const url = generateCourseUrl(faculty.acronym, referer.id, year);

  const html = await fetch(url);

  return scrapeCourse(html, referer);
}

async function fetchCourses(faculty: Faculty, year: number): Promise<Course[]> {
  const courseTypes: CourseType[] = ["MI", "M", "L", "D"];

  const coursesPromises: Promise<IncompleteCourse[]>[] = courseTypes.map(courseType =>
    fetchCoursesByType(faculty, courseType, year)
  );

  const incompleteCourses: IncompleteCourse[] = ([] as IncompleteCourse[]).concat(...await Promise.all(coursesPromises));

  const courseInfoPromises = incompleteCourses.map(c =>
    fetchCourseInfo(faculty, c, year)
  );

  const courses: Course[] = (await Promise.all(courseInfoPromises)).filter(c => c !== null) as Course[];

  const csv = await generateCsv(courses);

  appendToCourses(csv);

  console.log(`Scraped ${courses.length} courses successfully.`);

  return courses;
}

async function fetchClasses(acronym: string, courseId: number, year: number, periodId: Period) {
  const url = generateClassesUrl(acronym, courseId, year, periodId);
  const html = await fetch(url, { cookie: true });
  const classes: Class[] = scrapeClasses(html);

  const csv = await generateCsv(classes);

  appendToClasses(csv);

  console.log(`Scraped ${classes.length} classes successfully.`);

  return classes;
}

async function fetchClassesSchedule(acronym: string, year:number, periodId: Period, classId: number) {
  const url = generateClassScheduleUrl(acronym, year, periodId, classId);
  const html = await fetch(url, { cookie: true });
  const schedules: Lesson[] = scrapeSchedule(html);

  const csv = await generateCsv(schedules);

  appendToSchedules(csv);

  console.log(`Scraped ${schedules.length} schedules successfully.`);

  return schedules;
}

export async function fetchAll(year: number, periodId: Period) {
  const faculties = await fetchFaculties();

  faculties.forEach(async f => {
    const courses = await fetchCourses(f, year);

    courses.forEach(async c => {
      const classes = await fetchClasses(f.acronym, c.id, year, periodId);

      classes.forEach(async cl => {
        await fetchClassesSchedule(f.acronym, year, periodId, cl.id);
      });
    });
  });
}
