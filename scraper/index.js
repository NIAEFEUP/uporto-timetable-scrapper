const fs = require("fs");
const scrape = require("./spiders/faculties");
const { generateCsv } = require("./csv");

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "latin1", (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data.toString());
    });
  });
}

async function run() {
  const html = await readFilePromise("./examples/faculties.html");

  const data = await generateCsv(scrape(html));

  fs.writeFileSync("./faculties.csv", data);
}

run();
