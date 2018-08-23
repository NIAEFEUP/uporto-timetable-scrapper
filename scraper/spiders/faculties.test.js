const fs = require("fs");
const { scrapeFaculties } = require("./faculties");

const html = fs.readFileSync("./examples/faculties.html", "latin1").toString();

describe("faculties", () => {
  test("are scraped correctly", () => {
    const expected = [
      { acronym: "faup", name: "Faculdade de Arquitetura (FAUP)" },
      { acronym: "fbaup", name: "Faculdade de Belas Artes (FBAUP)" },
      { acronym: "fcup", name: "Faculdade de Ciências (FCUP)" },
      {
        acronym: "fcnaup",
        name: "Faculdade de Ciências da Nutrição e da Alimentação (FCNAUP)"
      },
      { acronym: "fadeup", name: "Faculdade de Desporto (FADEUP)" },
      { acronym: "fdup", name: "Faculdade de Direito (FDUP)" },
      { acronym: "fep", name: "Faculdade de Economia (FEP)" },
      { acronym: "feup", name: "Faculdade de Engenharia (FEUP)" },
      { acronym: "ffup", name: "Faculdade de Farmácia (FFUP)" },
      { acronym: "flup", name: "Faculdade de Letras (FLUP)" },
      { acronym: "fmup", name: "Faculdade de Medicina (FMUP)" },
      { acronym: "fmdup", name: "Faculdade de Medicina Dentária (FMDUP)" },
      {
        acronym: "fpceup",
        name: "Faculdade de Psicologia e de Ciências da Educação (FPCEUP)"
      },
      {
        acronym: "icbas",
        name: "Instituto de Ciências Biomédicas Abel Salazar (ICBAS)"
      },
      { acronym: "pbs", name: "Porto Business School" }
    ];

    expect(scrapeFaculties(html)).toEqual(expected);
  });
});
