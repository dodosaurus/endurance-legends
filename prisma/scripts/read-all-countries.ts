import prisma from "../../server/db/db";

const main = async () => {
  await readAllCountries();
};

const readAllCountries = async () => {
  //from card table, read and return all unique countries/country codes found in that table
  const countries = await prisma.card.findMany({
    select: {
      country: true,
    },
  });

  const uniqueCountries = [...new Set(countries.map((country) => country.country))];

  console.log(uniqueCountries);

  await prisma.$disconnect();
};

main();
