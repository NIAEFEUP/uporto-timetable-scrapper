const cheerio = require("cheerio");

function scrapeClasses(html) {
  const $ = cheerio.load(html);

  return $("table.tabela > tbody > tr.d > td a")
    .map((_, elem) => {
      const className = $(elem).text();
      const href = $(elem).attr("href");

      const searchPart = href.substring(href.indexOf("?") + 1);

      const queryParams = new URLSearchParams(searchPart);

      return {
        id: parseInt(queryParams.get("pv_turma_id"), 10),
        className
      };
    })
    .get();
}

module.exports = {
  scrapeClasses
};
