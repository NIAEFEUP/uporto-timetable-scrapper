import * as cheerio from "cheerio";
import { URLSearchParams } from "url";
import { Course, IncompleteCourse } from "../models";
import { deleteUntilFirstOccurence } from "../utils";

export function scrapeCourses(
  html: string,
  facultyAcronym: string
): IncompleteCourse[] {
  const $ = cheerio.load(html);

  return ($("#conteudoinner h2 + ul li a:first-child")
    .map((i, elem) => {
      const href = $(elem).attr("href");
      const searchPart = href.substring(href.indexOf("?") + 1);

      const queryParams = new URLSearchParams(searchPart);

      return {
        id: parseInt(queryParams.get("pv_curso_id")!, 10),
        facultyAcronym,
        year: parseInt(queryParams.get("pv_ano_lectivo")!, 10)
      };
    })
    .get() as any) as IncompleteCourse[];
}

export function scrapeCourse(
  html: string,
  referer: IncompleteCourse
): Course | null {
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
    ...referer,
    acronym: $("span.pagina-atual")
      .text()
      .substring(3),
    name: $("#conteudoinner > h1:last-of-type").text(),
    planId: parseInt(queryParams.get("pv_plano_id") as string, 10)
  };
}
