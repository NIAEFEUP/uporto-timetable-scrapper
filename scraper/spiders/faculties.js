const cheerio = require("cheerio");

function scrapeFaculties(html) {
  const $ = cheerio.load(html);

  return $(".menu-nivel-3 > a")
    .map((i, elem) => ({
      acronym: $(elem)
        .attr("href")
        .slice(2),
      name: $(elem).attr("title")
    }))
    .get();
}

module.exports = {
  scrapeFaculties
};
