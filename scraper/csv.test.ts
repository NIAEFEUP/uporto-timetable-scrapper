import { generateCsv } from "./csv";

describe("csv", () => {
  test("is generated correctly", async () => {
    const input = [
      {
        acronym: "faup",
        name: "Faculdade de Arquitetura (FAUP)"
      }
    ];

    const expected = "acronym,name\nfaup,Faculdade de Arquitetura (FAUP)\n";

    expect(await generateCsv(input)).toEqual(expected);
  });
});
