const fs = require("fs");
const {
  generateFacultyUrl,
  generateCoursesUrl,
  generateClassesUrl,
  generateClassScheduleUrl
} = require("./url-generator");
const { fetch } = require("./fetcher");
const { scrapeFaculties } = require("./spiders/faculties");
const { scrapeCourses } = require("./spiders/courses");
const { scrapeClasses } = require("./spiders/classes");
const { scrapeSchedule } = require("./spiders/schedule");
const { generateCsv } = require("./csv");

async function fetchFaculties() {
  const url = generateFacultyUrl();
  const html = await fetch(url);
  const objects = scrapeFaculties(html);

  const csv = await generateCsv(objects);

  fs.writeFileSync("./results/faculties.csv", csv);

  return objects;
}

async function fetchCourses(acronym, courseType, year) {
  const url = generateCoursesUrl(acronym, courseType, year);
  const html = await fetch(url);
  const objects = scrapeCourses(html);

  const csv = await generateCsv(objects);

  fs.writeFileSync("./results/courses.csv", csv);

  return objects;
}

async function fetchClasses(acronym, courseId, year, periodId) {
  const url = generateClassesUrl(acronym, courseId, year, periodId);
  const html = await fetch(url, { cookie: true });
  const objects = scrapeClasses(html);

  const csv = await generateCsv(objects);

  fs.writeFileSync("./results/classes.csv", csv);

  return objects;
}

async function fetchClassesSchedule(acronym, year, periodId, classId) {
  const url = generateClassScheduleUrl(acronym, year, periodId, classId);
  const html = await fetch(url, { cookie: true });
  const objects = scrapeSchedule(html);

  const csv = await generateCsv(objects);

  fs.writeFileSync("./results/schedules.csv", csv);

  return objects;
}

async function fetchAll(year, periodId) {
  const faculties = await fetchFaculties();
  const courseTypes = ["MI", "M", "L", "D"];

  faculties.forEach(async f => {
    const courses = [].concat(
      ...(await Promise.all(
        courseTypes.map(type => fetchCourses(f.acronym, type, year))
      ))
    );

    courses.forEach(async c => {
      const classes = await fetchClasses(f.acronym, c.id, year, periodId);

      classes.forEach(async cl => {
        await fetchClassesSchedule(f.acronym, year, periodId, cl.id);
      });
    });
  });
}

module.exports = {
  fetchAll
};
