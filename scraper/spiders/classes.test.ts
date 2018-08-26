import fs from "fs";
import { Class } from "../models";
import { scrapeClasses } from "./classes";

const classes = fs.readFileSync("./examples/classes.html", "latin1").toString();

describe("classes", () => {
  test("are scraped correctly", () => {
    const expected: Class[] = [
      { className: "1MIEIC01", id: 207783 },
      { className: "1MIEIC02", id: 207784 },
      { className: "1MIEIC03", id: 207785 },
      { className: "1MIEIC04", id: 207786 },
      { className: "1MIEIC05", id: 207787 },
      { className: "1MIEIC06", id: 207788 },
      { className: "1MIEIC07", id: 207789 },
      { className: "1MIEIC08", id: 207790 },
      { className: "2MIEIC01", id: 207792 },
      { className: "2MIEIC02", id: 207793 },
      { className: "2MIEIC03", id: 207794 },
      { className: "2MIEIC04", id: 207795 },
      { className: "2MIEIC05", id: 207796 },
      { className: "2MIEIC06", id: 207797 },
      { className: "2MIEIC07", id: 207798 },
      { className: "2MIEIC08", id: 207799 },
      { className: "3MIEIC01", id: 207800 },
      { className: "3MIEIC02", id: 207801 },
      { className: "3MIEIC03", id: 207802 },
      { className: "3MIEIC04", id: 207803 },
      { className: "3MIEIC05", id: 207804 },
      { className: "3MIEIC06", id: 207805 },
      { className: "3MIEIC07", id: 207806 },
      { className: "4MIEIC01", id: 207807 },
      { className: "4MIEIC02", id: 207808 },
      { className: "4MIEIC03", id: 207809 },
      { className: "4MIEIC04", id: 207810 },
      { className: "4MIEIC05", id: 207811 },
      { className: "5MIEIC01", id: 207814 },
      { className: "5MIEIC02", id: 207815 }
    ];

    expect(scrapeClasses(classes)).toEqual(expected);
  });
});
