const fs = require("fs");
const { scrapeSchedule } = require("./schedule");

const scheduleWithResults = fs
  .readFileSync("./examples/schedule.html", "latin1")
  .toString();
const scheduleWithNoResults = fs
  .readFileSync("./examples/schedule_no_results.html", "latin1")
  .toString();

describe("schedule", () => {
  test("is scraped correctly when there are no results", () => {
    const expected = [];

    expect(scrapeSchedule(scheduleWithNoResults)).toEqual(expected);
  });

  test("is scraped correctly when there are results", () => {
    const expected = [
      { dayOfTheWeek: 0, duration: 2, startTime: 8 },
      { dayOfTheWeek: 1, duration: 2, startTime: 8.5 },
      { dayOfTheWeek: 3, duration: 2, startTime: 8.5 },
      { dayOfTheWeek: 4, duration: 2, startTime: 9 },
      { dayOfTheWeek: 2, duration: 1.5, startTime: 10 },
      { dayOfTheWeek: 1, duration: 1.5, startTime: 10.5 },
      { dayOfTheWeek: 2, duration: 2, startTime: 11.5 }
    ];

    expect(scrapeSchedule(scheduleWithResults)).toEqual(expected);
  });
});
