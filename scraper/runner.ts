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
  const faculties: Faculty[] = scrapeFaculties(html);

  console.log(`Scraped ${faculties.length} faculties successfully.`);

  return faculties;
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

  const courses: Course[] = (await Promise.all(courseInfoPromises)).filter(
    c => c !== null
  ) as Course[];

  console.log(`Scraped ${courses.length} courses successfully.`);

  return courses;
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

  const courseUnits: CourseUnit[] = results.filter(
    cu => cu !== null
  ) as CourseUnit[];

  console.log(`Scraped ${courseUnits.length} course units successfully.`);

  return courseUnits;
}

async function fetchClasses(
  acronym: string,
  courseId: number,
  year: number,
  periodId: Period
) {
  const url = generateClassesUrl(acronym, courseId, year, periodId);
  const html = await fetch(url, { cookieNeeded: true });
  const classes: Class[] = scrapeClasses(html);

  console.log(`Scraped ${classes.length} classes successfully.`);

  return classes;
}

async function fetchClassesSchedule(
  acronym: string,
  year: number,
  periodId: Period,
  classId: number
) {
  const url = generateClassScheduleUrl(acronym, year, periodId, classId);
  const html = await fetch(url, { cookieNeeded: true });
  const schedules: Lesson[] = scrapeSchedule(html);

  console.log(`Scraped ${schedules.length} schedules successfully.`);

  return schedules;
}

export async function fetchAll(year: number, periodId: Period) {
  const courses: Course[] = [];
  const courseUnits: CourseUnit[] = [];

  const faculties = await fetchFaculties();
  await appendToFaculties(faculties);
  // const faculties = await loadFaculties();

  faculties.forEach(async f => {
    const facultyCourses = await fetchCourses(f, year);
    courses.push(...facultyCourses);

    facultyCourses.forEach(async c => {
      courseUnits.push(...(await fetchCourseUnits(f, c, year, periodId)));
    });

    // courses.forEach(async c => {
    //   const classes = await fetchClasses(f.acronym, c.id, year, periodId);

    //   classes.forEach(async cl => {
    //     await fetchClassesSchedule(f.acronym, year, periodId, cl.id);
    //   });
    // });
  });

  await appendToCourses(courses);
  await appendToCourseUnits(courseUnits);
}
