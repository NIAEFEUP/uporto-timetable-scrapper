const { fetchAll } = require("./runner");

async function run() {
  await fetchAll(2018, 1);
}

run();
