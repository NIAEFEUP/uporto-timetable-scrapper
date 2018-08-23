const fs = require("fs");
const { scrapeSchedule, scrapeOverlappingLessons } = require("./schedule");

const courseUnitScheduleWithResults = fs
  .readFileSync("./examples/course_unit_schedule.html", "latin1")
  .toString();
const courseUnitScheduleWithNoResults = fs
  .readFileSync("./examples/course_unit_schedule_no_results.html", "latin1")
  .toString();
const classScheduleWithResults = fs
  .readFileSync("./examples/class_schedule.html", "latin1")
  .toString();
const classScheduleWithNoResults = fs
  .readFileSync("./examples/class_schedule_no_results.html", "latin1")
  .toString();

describe("course unit schedule", () => {
  test("is scraped correctly when there are no results", () => {
    const expected = [];

    expect(scrapeSchedule(courseUnitScheduleWithNoResults)).toEqual(expected);
  });

  test("is scraped correctly when there are results", () => {
    const expected = [
      {
        dayOfTheWeek: 0,
        duration: 2,
        startTime: 8,
        className: "COMP_443",
        lessonType: "TP",
        professor: "BMCL",
        room: "B335"
      },
      {
        className: "1MIEIC03",
        dayOfTheWeek: 1,
        duration: 2,
        startTime: 8.5,
        lessonType: "TP",
        professor: "AJA",
        room: "B336"
      },
      {
        className: "1MIEIC04",
        dayOfTheWeek: 3,
        duration: 2,
        startTime: 8.5,
        lessonType: "TP",
        professor: "BMCL",
        room: "B326"
      },
      {
        className: "COMP_640",
        dayOfTheWeek: 4,
        duration: 2,
        startTime: 9,
        lessonType: "TP",
        professor: "JCF",
        room: "B331"
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 2,
        duration: 1.5,
        startTime: 10,
        lessonType: "T",
        professor: "JCF",
        room: "B003"
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 1,
        duration: 1.5,
        startTime: 10.5,
        lessonType: "T",
        professor: "JCF",
        room: "B002"
      },
      {
        className: "1MIEIC01",
        dayOfTheWeek: 2,
        duration: 2,
        startTime: 11.5,
        lessonType: "TP",
        professor: "AJA",
        room: "B113"
      }
    ];

    expect(scrapeSchedule(courseUnitScheduleWithResults)).toEqual(expected);
  });
});

// describe("overlapping lessons", () => {
//   test("are scraped correctly", () => {
//     const expected = [
//       {
//         className: "1MIEIC02",
//         classUrl:
//           "hor_geral.turmas_view?pv_turma_id=208139&pv_ano_lectivo=2018&pv_periodos=1&pv_periodos=2&pv_periodos=4&pv_periodos=5&pv_periodos=8",
//         dayOfTheWeek: 0,
//         duration: 2,
//         startTime: 8,
//         lessonType: "TP",
//         professor: "AJA",
//         room: "B319"
//       }
//     ];
//
//     expect(scrapeOverlappingLessons(courseUnitScheduleWithResults)).toEqual(
//       expected
//     );
//   });
// });

describe("class schedule", () => {
  test("is scraped correctly when there are no results", () => {
    const expected = [];

    expect(scrapeSchedule(classScheduleWithNoResults)).toEqual(expected);
  });

  test("is scraped correctly when there are results", () => {
    const expected = [
      {
        className: "1MIEIC02",
        dayOfTheWeek: 0,
        duration: 2,
        lessonType: "TP",
        professor: "AJA",
        room: "B319",
        startTime: 8
      },
      {
        className: "1MIEIC02",
        dayOfTheWeek: 1,
        duration: 2,
        lessonType: "TP",
        professor: "MRRS",
        room: "B332",
        startTime: 8.5
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 2,
        duration: 1.5,
        lessonType: "T",
        professor: "AMPA",
        room: "B003",
        startTime: 8.5
      },
      {
        className: "1MIEIC02",
        dayOfTheWeek: 3,
        duration: 2,
        lessonType: "TP",
        professor: "AMAN",
        room: "B331",
        startTime: 8.5
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 0,
        duration: 2,
        lessonType: "T",
        professor: "AMF",
        room: "B001",
        startTime: 10
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 2,
        duration: 1.5,
        lessonType: "T",
        professor: "JCF",
        room: "B003",
        startTime: 10
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 1,
        duration: 1.5,
        lessonType: "T",
        professor: "JCF",
        room: "B002",
        startTime: 10.5
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 3,
        duration: 1.5,
        lessonType: "T",
        professor: "GTD",
        room: "B001",
        startTime: 10.5
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 4,
        duration: 1.5,
        lessonType: "T",
        professor: "AMPA",
        room: "B003",
        startTime: 11
      },
      {
        className: "1MIEIC02",
        dayOfTheWeek: 2,
        duration: 2,
        lessonType: "TP",
        professor: "RBAMS",
        room: "B305",
        startTime: 11.5
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 0,
        duration: 1.5,
        lessonType: "T",
        professor: "GTD",
        room: "B001",
        startTime: 12
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 1,
        duration: 1.5,
        lessonType: "T",
        professor: "JCL",
        room: "B002",
        startTime: 12
      },
      {
        className: "COMP_1490",
        dayOfTheWeek: 3,
        duration: 1.5,
        lessonType: "T",
        professor: "JCL",
        room: "B001",
        startTime: 12
      },
      {
        className: "1MIEIC02",
        dayOfTheWeek: 4,
        duration: 2,
        lessonType: "TP",
        professor: "RCS",
        room: "B309",
        startTime: 14
      },
      {
        className: "1MIEIC02",
        dayOfTheWeek: 2,
        duration: 2,
        lessonType: "TP",
        professor: "MMC",
        room: "B303",
        startTime: 14.5
      }
    ];

    expect(scrapeSchedule(classScheduleWithResults)).toEqual(expected);
  });
});
