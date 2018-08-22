const cheerio = require("cheerio");
const { deleteUntilFirstOccurence } = require("../utils");

function scrapeCourses(html, facultyId) {
  const $ = cheerio.load(html);

  return $("#conteudoinner h2 + ul li a:first-child")
    .map((i, elem) => {
      const href = $(elem).attr("href");
      const searchPart = href.substring(href.indexOf("?") + 1);

      const queryParams = new URLSearchParams(searchPart);

      return {
        courseId: parseInt(queryParams.get("pv_curso_id"), 10),
        facultyId,
        year: parseInt(queryParams.get("pv_ano_lectivo"), 10)
      };
    })
    .get();
}

function scrapeCourse(html, referer) {
  const $ = cheerio.load(html);

  // tests if this page points to another one
  if ($("#conteudoinner > div:first-child > a").length !== 0) {
    return null;
  }

  const planUrl = $(
    "div.caixa-informativa:nth-child(4) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)"
  ).attr("href");

  const searchPart = deleteUntilFirstOccurence(planUrl, "?");

  const queryParams = new URLSearchParams(searchPart);

  return {
    acronym: $("span.pagina-atual")
      .text()
      .substring(3),
    courseId: referer.courseId,
    facultyId: referer.facultyId,
    name: $("#conteudoinner > h1:last-of-type").text(),
    planId: parseInt(queryParams.get("pv_plano_id"), 10),
    year: referer.year
  };
}

module.exports = {
  scrapeCourses,
  scrapeCourse
};
