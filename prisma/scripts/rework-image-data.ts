import latestRaw from "../../raw/images_metadata.json";
const fs = require("fs");

const cardImageNames = [
  "tadejPogacar",
  "remcoEvenepoel",
  "jonasVingegaard",
  "jasperPhilipsen",
  "madsPedersen",
  "marcHirschi",
  "mathieuVanDerPoel",
  "primozRoglic",
  "juanAyuso",
  "woutVanAert",
  "aleksandrVlasov",
  "adamYates",
  "mattiasSkjelmose",
  "olavKooij",
  "brandonMcnulty",
  "arnaudDeLie",
  "pelloBilbao",
  "carlosRodriguez",
  "matejMohoric",
  "benOconnor",
  "timMerlier",
  "simonYates",
  "ilanVanWilder",
  "joaoAlmeida",
  "seppKuss",
  "lennyMartinez",
  "jaiHindley",
  "stephenWilliams",
  "romainGregoire",
  "maximVanGils",
  "tobiasHallandJohannessen",
  "dylanGroenewegen",
  "felixGall",
  "thomasPidcock",
  "guillaumeMartin",
  "jonathanMilan",
  "santosTourDownUnder",
  "cadelEvansRace",
  "uaeTour",
  "omloopHetNieuwsblad",
  "stradeBianche",
  "parisNice",
  "tirrenoAdriatico",
  "milanoSanremo",
  "voltaCiclista",
  "bruggeDePanne",
  "e3SaxoClassic",
  "gentWevelgem",
  "dwarsDoorVlaanderen",
  "rondeVanVlaanderen",
  "itzuliaBasque",
  "parisRoubaix",
  "amstelGoldRace",
  "flecheWallonne",
  "liegeBastogneLiege",
  "tourDeRomandie",
  "eschbornFrankfurt",
  "giroDitalia",
  "criteriumDuDauphine",
  "tourDeSuisse",
  "tourDeFrance",
  "sanSebastian",
  "tourDePologne",
  "vuelta",
  "bretagneClassic",
  "renewiTour",
  "bemerCyclassics",
  "cyclisteDeQuebec",
  "cyclisteDeMontreal",
  "ilLombardia",
  "tourOfGuangxi",
];

const main = () => {
  reworkImagesData();
};

const reworkImagesData = async () => {
  //take raw data array from latest_raw.json
  const old_raw = latestRaw;

  //new array
  const new_raw: any[] = [];

  //remove property-value pair "finalUrl" from each subobject
  old_raw.forEach((card, index) => {
    let new_obj = {
      cardId: card.cardId,
      filename: card.filename,
      source: card.source,
      name: cardImageNames[index],
    };

    new_raw.push(new_obj);
  });

  //write new array to latest_raw_new.json
  fs.writeFileSync("images_metadata_new.json", JSON.stringify(new_raw));
};

main();
