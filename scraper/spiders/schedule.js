const cheerio = require("cheerio");

function scrapeSchedule(html) {
  const $ = cheerio.load(html);

  if ($("div#erro > h2").text() === "Sem Resultados") {
    return [];
  }

  const schedule = $("table.horario");

  const classes = [];

  // The first tr is the days of the week, so must be removed.
  const rows = $(schedule)
    .find("tr")
    .slice(1);

  // This array represents the rowspans left in the current row
  // It is used because when a row has rowspan > 1, the table
  // will seem to be missing a column and can cause out of sync errors
  // between the HTML table and its memory representation
  const rowspans = [0, 0, 0, 0, 0, 0];

  let hour = 8;

  rows.each((_, row) => {
    // First child is the time, so must be removed.
    const columns = $(row).children("td:not(:first-child)");

    const DAYS_OF_WEEK = 6; // 0 -> Monday, 1 -> Tuesday, ..., 5 -> Saturday (No sunday)
    let currentColumn = 0;
    for (let i = 0; i < DAYS_OF_WEEK; i += 1) {
      if (rowspans[i] > 0) {
        rowspans[i] -= 1;
      }

      if (rowspans[i] === 0) {
        const column = columns[currentColumn];

        const rowspan = $(column).attr("rowspan");

        // The rowspan indicates how much time a class takes
        // If there is no rowspan, it means it is a blank cell
        if (parseInt(rowspan, 10) > 0) {
          classes.push({
            dayOfTheWeek: i,
            startTime: hour,
            duration: parseFloat(rowspan, 10) / 2
          });
        }
      }

      currentColumn += 1;
    }

    hour += 0.5;
  });

  return classes;
}

module.exports = {
  scrapeSchedule
};
