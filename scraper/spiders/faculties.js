const cheerio = require("cheerio");

module.exports = function scrapeFaculties(html) {
  const $ = cheerio.load(html);

  return $(".menu-nivel-3 > a")
    .map((i, elem) => ({
      acronym: $(elem)
        .attr("href")
        .slice(2),
      name: $(elem).attr("title")
    }))
    .get();
};
