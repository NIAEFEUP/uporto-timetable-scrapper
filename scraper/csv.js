const csv = require("csv");

function generateCsv(objects) {
  return new Promise((resolve, reject) => {
    csv.stringify(objects, (error, output) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
}

module.exports = {
  generateCsv
};
