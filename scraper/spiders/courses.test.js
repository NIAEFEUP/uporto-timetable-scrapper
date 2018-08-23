const fs = require("fs");
const { scrapeCourse, scrapeCourses } = require("./courses");

describe("courses", () => {
  test("are scraped correctly", () => {
    const html = fs
      .readFileSync("./examples/courses.html", "latin1")
      .toString();
    const facultyId = 0;

    const expected = [
      {
        id: 454,
        facultyId,
        year: 2017
      },
      {
        id: 455,
        facultyId,
        year: 2017
      },
      {
        id: 738,
        facultyId,
        year: 2017
      }
    ];

    expect(scrapeCourses(html, facultyId)).toEqual(expected);
  });
});

describe("course", () => {
  test("is scraped correctly", () => {
    const html = fs.readFileSync("./examples/course.html", "latin1").toString();

    const referer = {
      id: 455,
      facultyId: 0,
      year: 2017
    };

    const expected = {
      ...referer,
      acronym: "MIEIC",
      name: "Mestrado Integrado em Engenharia Informática e Computação",
      planId: 2496
    };

    expect(scrapeCourse(html, referer)).toEqual(expected);
  });
});
