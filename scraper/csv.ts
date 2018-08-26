import fs from "fs";
import { Course, Faculty } from "./models";
// tslint:disable-next-line no-var-requires
const csv = require("csv");

export function generateCsv(objects: any): Promise<string> {
  return new Promise((resolve, reject) => {
    csv.stringify(objects, { header: true }, (error: any, output: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
}

function loadCsv(path: string) {
  const data = fs.readFileSync(path).toString();

  return new Promise((resolve, reject) => {
    csv.parse(data, { columns: true }, (error: any, output: object) => {
      if (error) {
        reject(error);
      }
      console.log(error);

      resolve(output);
    });
  });
}

export async function loadCourses(): Promise<Course[]> {
  return loadCsv("./results/courses.csv") as Promise<Course[]>;
}

export async function loadFaculties(): Promise<Faculty[]> {
  return loadCsv("./results/faculties.csv") as Promise<Faculty[]>;
}
