// tslint:disable-next-line no-var-requires
const ProgressBar = require("ascii-progress");
import { fetch } from "./fetcher";
import {
  Class,
  Course,
  CourseType,
  CourseUnit,
  CourseUnitSearch,
  Faculty,
  IncompleteCourse,
  Lesson,
  Period
} from "./models";
import { scrapeClasses } from "./spiders/classes";
import { scrapeCourse, scrapeCourses } from "./spiders/courses";
import { scrapeCourseUnitInfo, scrapeSearchPages } from "./spiders/courseUnits";
import { scrapeFaculties } from "./spiders/faculties";
import { scrapeSchedule } from "./spiders/schedule";
import {
  generateClassesUrl,
  generateClassScheduleUrl,
  generateCoursesUrl,
  generateCourseUnitInfoUrl,
  generateCourseUnitSearchUrl,
  generateCourseUrl,
  generateFacultyUrl
} from "./url-generator";
import {
  appendToClasses,
  appendToCourses,
  appendToCourseUnits,
  appendToFaculties,
  appendToSchedules
} from "./writer";

async function fetchFaculties(): Promise<Faculty[]> {
  const url = generateFacultyUrl();

  const html = await fetch(url);

  return scrapeFaculties(html);
}

async function fetchCoursesByType(
  faculty: Faculty,
  courseType: CourseType,
  year: number
): Promise<IncompleteCourse[]> {
  const url = generateCoursesUrl(faculty.acronym, courseType, year);

  const html = await fetch(url);

  return scrapeCourses(html, faculty.acronym);
}

async function fetchCourseInfo(
  faculty: Faculty,
  referer: IncompleteCourse,
  year: number
) {
  const url = generateCourseUrl(faculty.acronym, referer.id, year);

  const html = await fetch(url);

  return scrapeCourse(html, referer);
}

async function fetchCourses(faculty: Faculty, year: number): Promise<Course[]> {
  const courseTypes: CourseType[] = ["MI", "M", "L", "D"];

  const coursesPromises: Array<Promise<IncompleteCourse[]>> = courseTypes.map(
    courseType => fetchCoursesByType(faculty, courseType, year)
  );

  const incompleteCourses: IncompleteCourse[] = ([] as IncompleteCourse[]).concat(
    ...(await Promise.all(coursesPromises))
  );

  const courseInfoPromises = incompleteCourses.map(c =>
    fetchCourseInfo(faculty, c, year)
  );

  return (await Promise.all(courseInfoPromises)).filter(
    c => c !== null
  ) as Course[];
}

async function fetchCourseUnits(
  faculty: Faculty,
  course: Course,
  year: number,
  periodId: Period
): Promise<CourseUnit[]> {
  let url = generateCourseUnitSearchUrl(
    faculty.acronym,
    course.id,
    year,
    periodId,
    1
  );
  const html = await fetch(url);
  const { courseUnitIds, lastPage }: CourseUnitSearch = scrapeSearchPages(html);

  for (let i = 2; i < lastPage; i++) {
    url = generateCourseUnitSearchUrl(
      faculty.acronym,
      course.id,
      year,
      periodId,
      i
    );
    const { courseUnitIds: ids }: CourseUnitSearch = scrapeSearchPages(
      await fetch(url)
    );

    courseUnitIds.push(...ids);
  }

  const unitsUrls = courseUnitIds.map(id =>
    generateCourseUnitInfoUrl(faculty.acronym, id)
  );

  const results: Array<CourseUnit | null> = await Promise.all(
    unitsUrls.map(async uri => scrapeCourseUnitInfo(await fetch(uri), course))
  );

  return results.filter(cu => cu !== null) as CourseUnit[];
}

async function fetchClasses(
  acronym: string,
  courseId: number,
  year: number,
  periodId: Period
) {
  const url = generateClassesUrl(acronym, courseId, year, periodId);

  const html = await fetch(url, { cookieNeeded: true });

  return scrapeClasses(html);
}

async function fetchClassesSchedule(
  acronym: string,
  year: number,
  periodId: Period,
  classId: number
) {
  const url = generateClassScheduleUrl(acronym, year, periodId, classId);

  const html = await fetch(url, { cookieNeeded: true });

  return scrapeSchedule(html);
}

function createBar(expectedTotal: number, objects: any[]) {
  const bar = new ProgressBar({
    current: 0,
    total: expectedTotal
  });

  const timer = setInterval(() => {
    bar.update(objects.length / expectedTotal);

    if (bar.completed) {
      clearInterval(timer);
    }
  }, 500);
}

function createProgressBars(
  faculties: Faculty[],
  courses: Course[],
  courseUnits: CourseUnit[],
  classes: Class[],
  schedules: Lesson[]
) {
  createBar(15, faculties);
  createBar(327, courses);
  createBar(414, courseUnits);
  createBar(206, classes);
  createBar(1500, schedules);
}

export async function fetchAll(year: number, periodId: Period) {
  const faculties: Faculty[] = [];
  const courses: Course[] = [];
  const courseUnits: CourseUnit[] = [];
  const classes: Class[] = [];
  const schedules: Lesson[] = [];

  createProgressBars(faculties, courses, courseUnits, classes, schedules);

  faculties.push(...(await fetchFaculties()));
  await appendToFaculties(faculties);

  await Promise.all(
    faculties.map(async f => {
      const facultyCourses = await fetchCourses(f, year);
      courses.push(...facultyCourses);

      await Promise.all(
        facultyCourses.map(async c => {
          courseUnits.push(...(await fetchCourseUnits(f, c, year, periodId)));
        })
      );

      await Promise.all(
        courses.map(async c => {
          const courseClasses = await fetchClasses(
            f.acronym,
            c.id,
            year,
            periodId
          );
          classes.push(...courseClasses);

          await Promise.all(
            courseClasses.map(async cl => {
              const classesSchedule = await fetchClassesSchedule(
                f.acronym,
                year,
                periodId,
                cl.id
              );
              schedules.push(...classesSchedule);
            })
          );
        })
      );
    })
  );

  await Promise.all([
    appendToCourses(courses),
    appendToCourseUnits(courseUnits),
    appendToClasses(classes),
    appendToSchedules(schedules)
  ]);
}
