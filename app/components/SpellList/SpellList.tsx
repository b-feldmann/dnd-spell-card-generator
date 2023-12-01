import { readClassSpellList } from "@/app/actions/readExcelDatabase";
import { spellNameToUrl } from "@/app/lib/spellUtils";
import { SpellCastingClass } from "@/types/classes";
import Spell, { SpellListEntry } from "@/types/spell";
import ChooseClass from "../ChooseClass";
import SpellListRender from "./SpellListRender";

// async function getSpells(dndClass: SpellCastingClass) {
//   const res = await fetch(
//     `https://www.dnd5eapi.co/api/classes/${dndClass}/spells`,
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

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
  dndClass: SpellCastingClass;
  maxLevel?: number;
  disableClassSelect?: boolean;
  printClassName?: boolean;
}) {
  // const rawSpells: Dnd5eApiReference[] = await getSpells(dndClass).then(
  //   (res) => res.results,
  // );

  const spellList: SpellListEntry[] = await getSpells(
    dndClass,
    skipSpells,
    maxLevel,
  );

  return (
    <div className="max-h-screen">
      {!disableClassSelect && (
        <h2>
          List of <ChooseClass initialClass={dndClass} /> spells
        </h2>
      )}
      <div
        className="overflow-auto scroll-smooth"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <SpellListRender
          spells={spellList}
          dndClass={dndClass}
          printClassName={printClassName}
        />
      </div>
    </div>
  );
}
