import * as cheerio from "cheerio";
import { Faculty } from "../models";

export function scrapeFaculties(html: string): Faculty[] {
  const $ = cheerio.load(html);

  return ($(".menu-nivel-3 > a")
    .map((i, elem) => ({
      acronym: $(elem)
        .attr("href")
        .slice(2),
      name: $(elem).attr("title")
    }))
    .get() as any) as Faculty[];
}
