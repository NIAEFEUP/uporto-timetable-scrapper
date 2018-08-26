import fs from "fs";
import { IncompleteCourse } from "../models";
import { scrapeCourse, scrapeCourses } from "./courses";

describe("courses", () => {
  test("are scraped correctly", () => {
    const html = fs
      .readFileSync("./examples/courses.html", "latin1")
      .toString();
    const facultyAcronym = "feup";

    const expected = [
      {
        id: 454,
        facultyAcronym,
        year: 2017
      },
      {
        id: 455,
        facultyAcronym,
        year: 2017
      },
      {
        id: 738,
        facultyAcronym,
        year: 2017
      }
    ];

    expect(scrapeCourses(html, facultyAcronym)).toEqual(expected);
  });
});

describe("course", () => {
  test("is scraped correctly", () => {
    const html = fs.readFileSync("./examples/course.html", "latin1").toString();

    const referer: IncompleteCourse = {
      id: 455,
      facultyAcronym: "feup",
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
