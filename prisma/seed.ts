import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const races = [
  "Dragonborn",
  "Darf-Hill",
  "Darf-Mountain",
  "Elf-Dark",
  "Elf-High",
  "Elf-Sea",
  "Elf-Wood",
  "Gnome-Deep",
  "Gnome-Forest",
  "Gnome-Rock",
  "Half-Elf",
  "Half-Orc",
  "Halfling-Lightfoot",
  "Halfling-Stout",
  "Human",
  "Human-Variant",
  "Tiefling",
  "Tortle",
  "Triton",
  "Yuan-ti",
];

const spellCastingClasses = [
  "artificer",
  "bard",
  "cleric",
  "druid",
  "paladin",
  "ranger",
  "sorcerer",
  "warlock",
  "wizard",
];

const dndClasses = [
  ...spellCastingClasses,
  "barbarian",
  "fighter",
  "monk",
  "rouge",
];

async function main() {
  for (const i in races) {
    const race = races[i];
    await prisma.race.upsert({
      where: { name: race },
      create: { name: race },
      update: {},
    });
  }

  for (const i in dndClasses) {
    const dndClass = dndClasses[i];
    await prisma.class.upsert({
      where: { name: dndClass },
      create: { name: dndClass },
      update: {},
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
