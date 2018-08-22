const cheerio = require("cheerio");

module.exports = function scrape(html) {
  const $ = cheerio.load(html);

  const courseType = $("#conteudoinner h2 + ul li a:first-child")
    .map((i, elem) => $(elem).text())
    .get();

  return courseType;
};
