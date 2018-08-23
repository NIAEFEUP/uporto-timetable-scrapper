const cheerio = require("cheerio");

const daysOfTheWeek = {
  Segunda: 0,
  Terça: 1,
  Quarta: 2,
  Quinta: 3,
  Sexta: 4,
  Sábado: 5
};

function scrapeOverlappingLessons(html) {
  const $ = cheerio.load(html);

  // First two rows are headers, so must be removed
  const overlappingLessons = $("table.dados > tbody > tr").slice(2);

  return $(overlappingLessons)
    .map((_, row) => {
      let lessonType = $(row)
        .children(":nth-child(1)")
        .text();

      lessonType = lessonType
        .replace(")", "")
        .substring(lessonType.indexOf("(") + 1);

      const dayStr = $(row)
        .children(":nth-child(2)")
        .text();

      const timeStr = $(row)
        .children(":nth-child(3)")
        .text();

      const hour = parseInt(timeStr.substring(0, timeStr.indexOf(":")), 10);
      const minutes = parseInt(timeStr.substring(timeStr.indexOf(":") + 1), 10);

      const startTime = hour + (minutes % 30);

      const room = $(row)
        .children(":nth-child(4)")
        .text();

      const professor = $(row)
        .children(":nth-child(5)")
        .text();

      const clazz = $(row).find(":nth-child(6) > a");
      const className = $(clazz).text();
      const classUrl = $(clazz).attr("href");

      return {
        lessonType,
        dayOfTheWeek: daysOfTheWeek[dayStr],
        startTime,
        room,
        professor,
        className,
        classUrl
      };
    })
    .get();
}

function scrapeLesson($, lessonElem) {
  let lessonType = $(lessonElem)
    .find("b")
    .text();

  // Lesson type is something like "AOCO (TP)" and we want to obtain the "TP" part
  lessonType = lessonType
    .replace(")", "")
    .substring(lessonType.indexOf("(") + 1);

  const clazz = $(lessonElem).find("span > a");
  const className = $(clazz).text();

  const table = $(lessonElem).find("table > tbody > tr");
  const room = $(table)
    .find("td > a")
    .text();
  const professor = $(table)
    .find("td.textod a")
    .text();

  return {
    lessonType,
    className,
    room,
    professor
  };
}

// This array represents the rowspans left in the current row
// It is used because when a row has rowspan > 1, the table
// will seem to be missing a column and can cause out of sync errors
// between the HTML table and its memory representation
/**
 * Scrapes a schedule row
 * @param $ cheerio
 * @param rows all rows but the header
 * @param rowspans a 6 dimension array that stores the rowspan of the column, decremented every iteration.
 * @param rowIndex current row index in the rows array. Also used for calculating class start time.
 * @return {*}
 */
function scrapeRow($, rows, rowspans = [0, 0, 0, 0, 0, 0], rowIndex = 0) {
  if (rows.length === rowIndex) {
    return [];
  }

  const classes = [];

  // First column is the time, so must be removed.
  const columns = $(rows[rowIndex])
    .children("td")
    .slice(1);

  const newRowspans = [];
  const DAYS_OF_WEEK = 6; // 0 -> Monday, 1 -> Tuesday, ..., 5 -> Saturday (No sunday)
  let currentColumn = 0;
  for (let i = 0; i < DAYS_OF_WEEK; i += 1) {
    newRowspans[i] = Math.max(0, rowspans[i] - 1);

    if (newRowspans[i] === 0) {
      const column = columns[currentColumn];

      const rowspan = parseInt($(column).attr("rowspan"), 10);

      // The rowspan indicates how much time a class takes
      // If there is no rowspan, it means it is a blank cell
      if (rowspan > 0) {
        newRowspans[i] = rowspan;
        classes.push({
          dayOfTheWeek: i,
          startTime: 8 + rowIndex / 2,
          duration: rowspan / 2.0,
          ...scrapeLesson($, column)
        });
      }

      currentColumn += 1;
    }
  }

  return classes.concat(scrapeRow($, rows, newRowspans, rowIndex + 1));
}

function scrapeSchedule(html) {
  const $ = cheerio.load(html);

  if ($("div#erro > h2").text() === "Sem Resultados") {
    return [];
  }

  const schedule = $("table.horario > tbody");

  // The first tr is the days of the week, so must be removed.
  const rows = $(schedule)
    .children("tr")
    .slice(1);

  const classes = scrapeRow($, rows);

  return classes;
}

module.exports = {
  scrapeSchedule,
  scrapeOverlappingLessons
};
