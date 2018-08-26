const csv = require("csv");

export function generateCsv(objects: any) {
  return new Promise((resolve, reject) => {
    csv.stringify(objects, (error: any, output: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
}
