// tslint:disable-next-line no-var-requires
const csv = require("csv");

export function generateCsv(objects: any): Promise<string> {
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
