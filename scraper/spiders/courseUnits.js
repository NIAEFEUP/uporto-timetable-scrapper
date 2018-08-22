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

  console.log(lastPageSpan);

  const lastPage = Math.max(lastPageAnchor, lastPageSpan);

  return {
    currentPage,
    lastPage,
    courseUnitIds
  };
}

module.exports = {
  scrapeSearchPages
};
