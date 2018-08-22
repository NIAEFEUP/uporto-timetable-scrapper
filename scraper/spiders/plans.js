const cheerio = require("cheerio");

function scrapePlan(html) {
  const $ = cheerio.load(html);

  return $("#conteudoinner h2 + ul li a:first-child")
    .map((i, elem) => {
      const href = $(elem).attr("href");

      const queryParams = new URL(href).searchParams;

      return {
        courseId: queryParams.get("pv_curso_id"),
        courseType: queryParams.get("pv_tipo_cur_sigla"),
        year: queryParams.get("pv_ano_lectivo")
      };
    })
    .get();
}
