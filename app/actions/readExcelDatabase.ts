import { SpellCastingClass } from "@/types/classes";
import Spell from "@/types/spell";
import { parse } from "csv-parse";
import fs from "fs";
import { cache } from "react";
import {
  capitalizeFirstLetter,
  generateAtHigherLevel,
  generateDamageType,
  generateMaterial,
} from "../lib/spellUtils";
import { spellCastingClasses } from "@/types/types";

export const readClassSpellList = cache(async (dndClass: SpellCastingClass) => {
  if (!spellCastingClasses.includes(dndClass)) return [];

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
    const name = entry[1].replace(/\s*\((R|r)itual\)\s*/, "").trim();

    if (spellList.find((spell) => spell.name === name)) return;

    const range = entry[4].replace(/\(.*\)/, "");

    const descSplit = entry[7]
      .split(/<br>|\\n/)
      .map((s: string) => s.trim())
      .filter((s: string) => s && s.length > 0);

    const { desc, atHigherLevel } = generateAtHigherLevel(descSplit);
    const material = generateMaterial(desc);

    if (material && desc) desc[0] = desc[0].replace(material, "");

    spellList.push({
      level: parseInt(entry[0]),
      name: name,
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
      damage: generateDamageType(desc),
      material: material?.replace(/\(|\)/g, ""),
    });
  });

  return spellList;
});
