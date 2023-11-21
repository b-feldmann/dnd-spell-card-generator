import { SpellCastingClass } from "@/types/classes";
import Spell from "@/types/spell";
import { parse } from "csv-parse";
import fs from "fs";
import { cache } from "react";

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
    const range = entry[4].replace(/\(.*\)/, "");

    const descSplit = entry[7].split(
      /(?=When you cas this spell using a spell slot of|The spell's damage increases by)/g,
    );

    const desc: string[] = descSplit[0]
      .split(/<br>|\\n/)
      .map((s: string) => s.trim())
      .filter((s: string) => s && spellList.length > 0);
    const atHigherLevel: string[] | undefined = descSplit[1]
      ?.split(/<br>|\\n/)
      .map((s: string) => s.trim())
      .filter((s: string) => s && spellList.length > 0);

    spellList.push({
      level: parseInt(entry[0]),
      name: entry[1].replace(/\s*\((R|r)itual\)\s*/, "").trim(),
      school: entry[2]
        .replace("level", "")
        .replace("cantrip", "")
        .replace(/1st|2nd|3rd|[0-9]?[0-9]th/, "")
        .trim(),
      castingTime: entry[3],
      range: range,
      areaOfEffect: entry[4].replace(range, "").replace(/\(|\)/g, ""),
      components: entry[5].split(", "),
      duration: capitalizeFirstLetter(
        entry[6].replace(/(C|c)oncentration\s?,?\s?/, ""),
      ),
      desc: desc,
      concentration: entry[6].toLowerCase().includes("concentration"),
      ritual: entry[1].toLowerCase().includes("ritual"),
      atHigherLevel: atHigherLevel,
    });
  });

  return spellList;
});
