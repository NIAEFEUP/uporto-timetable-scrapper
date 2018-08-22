const fs = require("fs");
const { scrapeSearchPages, scrapeCourseUnitInfo } = require("./courseUnits");

describe("searchPages", () => {
  test("first page is scraped correctly", () => {
    const html = fs
      .readFileSync("./examples/course_unit_search_first_page.html", "latin1")
      .toString();

    const expected = {
      currentPage: 1,
      lastPage: 2,
      courseUnitIds: [
        401632,
        401641,
        401661,
        401662,
        401626,
        401622,
        401637,
        401668,
        401667,
        401664,
        401635,
        401623,
        401633,
        401628,
        401627,
        401630,
        401636,
        401629,
        401642,
        401621
      ]
    };

    expect(scrapeSearchPages(html)).toEqual(expected);
  });

  test("last page is scraped correctly", () => {
    const html = fs
      .readFileSync("./examples/course_unit_search_last_page.html", "latin1")
      .toString();

    const expected = {
      currentPage: 2,
      lastPage: 2,
      courseUnitIds: [
        401624,
        401663,
        401643,
        401666,
        401634,
        401625,
        401631,
        401644,
        401665,
        401646,
        401645
      ]
    };

    expect(scrapeSearchPages(html)).toEqual(expected);
  });
});

describe("courseUnitInfo", () => {
  test("is scraped correctly", () => {
    const html = fs
      .readFileSync("./examples/course_unit_info.html", "latin1")
      .toString();

    const expected = {
      acronym: "AGRS",
      courseYear: 4,
      year: 2018,
      semesters: [2]
    };

    expect(scrapeCourseUnitInfo(html)).toEqual(expected);
  });
});
