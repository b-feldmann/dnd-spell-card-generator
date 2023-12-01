import { readClassSpellList } from "@/app/actions/readExcelDatabase";
import { spellNameToUrl } from "@/app/lib/spellUtils";
import { SpellCastingClass } from "@/types/classes";
import Spell, { SpellListEntry } from "@/types/spell";
import ChooseClass from "../ChooseClass";
import SpellListRender from "./SpellListRender";
import { ClassAtLevel } from "@prisma/client";

// async function getSpells(dndClass: SpellCastingClass) {
//   const res = await fetch(
//     `https://www.dnd5eapi.co/api/classes/${dndClass}/spells`,
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

function toClassAtLevelArray(
  dndClass: SpellCastingClass | ClassAtLevel | ClassAtLevel[],
): ClassAtLevel[] {
  if (typeof dndClass === "string") {
    return [{ className: dndClass, level: 20, heroId: 0 }];
  }

  if (Array.isArray(dndClass)) {
    return dndClass;
  }
  return [dndClass];
}

async function getSpells(
  dndClass: SpellCastingClass,
  skipSpells: string[] = [],
  maxLevel?: number,
) {
  const dbList: Spell[] = await readClassSpellList(dndClass);

  const spellMap = (raw: Spell): SpellListEntry => {
    return {
      name: raw.name,
      url: spellNameToUrl(raw.name),
      level: raw.level,
      dndClass,
    };
  };

  const spellFilter = (spell: SpellListEntry) => {
    return !skipSpells.includes(`${spell.url}/${dndClass}`);
  };

  const levelFilter = (spell: SpellListEntry) => {
    if (maxLevel == 0) return false;
    if (!maxLevel || !spell.level) return true;

    return spell.level <= maxLevel;
  };

  return dbList.map(spellMap).filter(spellFilter).filter(levelFilter);
}

export default async function SpellList({
  skipSpells,
  dndClass,
  maxLevel,
  disableClassSelect = false,
  printClassName = false,
}: {
  skipSpells: string[];
  dndClass: SpellCastingClass | ClassAtLevel | ClassAtLevel[];
  maxLevel?: number;
  disableClassSelect?: boolean;
  printClassName?: boolean;
}) {
  // const rawSpells: Dnd5eApiReference[] = await getSpells(dndClass).then(
  //   (res) => res.results,
  // );

  const spellList: SpellListEntry[] = [];

  const classesAtLevel = toClassAtLevelArray(dndClass);
  for (const i in classesAtLevel) {
    const classAtLevel = classesAtLevel[i];
    const dbListForClass: SpellListEntry[] = await getSpells(
      classAtLevel.className as SpellCastingClass,
      skipSpells,
      classAtLevel.level,
    );
    spellList.push(...dbListForClass);
  }

  return (
    <div className="max-h-screen">
      {!disableClassSelect && typeof dndClass === "string" && (
        <h2>
          List of <ChooseClass initialClass={dndClass} /> spells
        </h2>
      )}
      <div
        className="overflow-auto scroll-smooth"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <SpellListRender spells={spellList} printClassName={printClassName} />
      </div>
    </div>
  );
}
