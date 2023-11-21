import { SpellCastingClass } from "@/types/classes";
import Spell from "@/types/spell";
import { parse } from "csv-parse";
import fs from "fs";
import xlsx from "node-xlsx";
import { cache } from "react";

export const readExcelDatabase = cache(async (id: string) => {
  const workSheetsFromFile = xlsx.parse(
    `${process.cwd()}/app/csv/dndSpells.xlsm`,
  );
  const rawSpellSheet = workSheetsFromFile[0].data;
  const spellBook: Spell[] = [];
  rawSpellSheet.forEach((entry) => {
    spellBook.push({
      name: entry[1].trim(),
      level: entry[2],
      school: entry[3],
      castingTime: entry[4],
      duration: entry[5],
      range: entry[6],
      areaOfEffect: entry[7],
      damage: entry[10],
      ritual: entry[11] === "Y",
      concentration: entry[12] === "Y",
      components: [
        entry[13] === "Y" ? "V" : "",
        entry[14] === "Y" ? "S" : "",
        entry[15] === "Y" ? "M" : "",
      ].filter((item) => item && item.length > 0),
      desc: entry[18],
    });
  });

  return spellBook;
});

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const readClassSpellList = cache(async (dndClass: SpellCastingClass) => {
  const records = [];
  const parser = fs
    .createReadStream(
      `${process.cwd()}/app/csv/${capitalizeFirstLetter(dndClass)}.csv`,
    )
    .pipe(
      parse({
        delimiter: ";",
      }),
    );
  for await (const record of parser) {
    // Work with each record
    records.push(record);
  }

  const spellList: Spell[] = [];
  records.forEach((entry) => {
    spellList.push({
      level: parseInt(entry[0]),
      name: entry[1].replace(/\s*\((R|r)itual\)\s*/, "").trim(),
      school: entry[2]
        .replace("level", "")
        .replace("cantrip", "")
        .replace(/1st|2nd|3rd|[0-9]?[0-9]th/, "")
        .trim(),
      castingTime: entry[3],
      range: entry[4].replace(/\(.*\)/, ""),
      areaOfEffect: entry[4]
        .replace(entry[4].replace(/\(.*\)/, ""), "")
        .replace(/\(|\)/g, ""),
      components: entry[5].split(", "),
      duration: capitalizeFirstLetter(
        entry[6].replace(/(C|c)oncentration\s?,?\s?/, ""),
      ),
      desc: entry[7].split(/<br>|\\n/).map((s: string) => s.trim()),
      concentration: entry[6].toLowerCase().includes("concentration"),
      ritual: entry[1].toLowerCase().includes("ritual"),
      atHigherLevel: undefined,
    });
  });

  return spellList;
});
