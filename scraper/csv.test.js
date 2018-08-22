const { generateCsv } = require("./csv");

describe("csv", () => {
  test("is generated correctly", async () => {
    const input = [
      {
        acronym: "faup",
        name: "Faculdade de Arquitetura (FAUP)"
      }
    ];

    const expected = "faup,Faculdade de Arquitetura (FAUP)\n";

    expect(await generateCsv(input)).toEqual(expected);
  });
});
