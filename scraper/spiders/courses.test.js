const fs = require("fs");
const scrape = require("./courses");

const html = fs.readFileSync("./examples/courses.html", "latin1").toString();

describe("courses", () => {
  test("are scraped correctly", () => {
    const expected = [];

    expect(scrape(html)).toEqual(expected);
  });
});
