const fs = require("fs");
const { generateFacultyUrl } = require("./url-generator");
const { fetch } = require("./fetcher");
const scrape = require("./spiders/faculties");
const { generateCsv } = require("./csv");

async function scrapeFaculties() {
  const url = generateFacultyUrl();
  const html = await fetch(url);
  const objects = scrape(html);

  const csv = await generateCsv(objects);

  fs.writeFileSync("./results/faculties.csv", csv);
}

module.exports = {
  scrapeFaculties
};
