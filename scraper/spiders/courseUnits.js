const cheerio = require("cheerio");
const { deleteUntilFirstOccurence } = require("../utils");

function scrapeSearchPages(html) {
  const $ = cheerio.load(html);

  const courseUnitIds = $("table.dados .d .t > a")
    .map((i, elem) => {
      const href = $(elem).attr("href");

      const queryParams = new URLSearchParams(
        deleteUntilFirstOccurence(href, "?")
      );

      return parseInt(queryParams.get("pv_ocorrencia_id"), 10);
    })
    .get();

  const currentPage = parseInt($(".paginar-paginas-atual > span").text(), 10);

  // The last page may be in a span, in case you are on the last page,
  // or in an anchor, otherwise. As such, it's needed to handle both cases.

  const lastPageSpan = parseInt(
    $(".paginar-paginas-envolvente span:last-of-type")
      .last()
      .text(),
    10
  );
  const lastPageAnchor = parseInt(
    $(".paginar-paginas-envolvente span:last-of-type a").text(),
    10
  );

  const lastPage = Math.max(lastPageAnchor, lastPageSpan);

  return {
    currentPage,
    lastPage,
    courseUnitIds
  };
}

function scrapeCourseUnitInfo(html) {
  const $ = cheerio.load(html);

  const name = $("div#conteudoinner > h1:nth-child(2)").text();

  // Checks if the course unit page is valid.
  // If name == 'Sem Resultados', then it is not and should be discarded.
  if (name === "Sem Resultados") {
    return null;
  }

  const acronym = $(
    "#conteudoinner > table:first-of-type tr > td:last-child"
  ).text();

  const courseYear = parseInt(
    $("#conteudoinner > table.dados td.l").text(),
    10
  );

  // Occurrence has a string that contains both the year and the semester type
  const occurrence = $("#conteudoinner > h2").text();

  // Possible semster types: '1', '2', 'A', 'SP'
  // '1' and '2' represent a semester number
  // 'A' represents an annual course unit
  // 'SP' represents a course unit without effect this year
  const semester = occurrence.substring(24, 26).trim();

  // Represents the civil year. If the course unit is taught on the curricular year
  // 2017/2018, then year is 2017.
  const year = parseInt(occurrence.substring(12, 16), 10);

  let semesters = [];

  // FIXME: Find a better way to allocate trimestral course units
  if (semester === "1S" || semester === "1T" || semester === "2T") {
    semesters = [1];
  } else if (semester === "2S" || semester === "3T" || semester === "4T") {
    semesters = [2];
  } else if (semester === "A") {
    semesters = [1, 2];
  }

  return {
    acronym,
    courseYear,
    year,
    semesters
  };
}

module.exports = {
  scrapeSearchPages,
  scrapeCourseUnitInfo
};
