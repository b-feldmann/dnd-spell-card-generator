import { readClassSpellList } from "@/app/actions/readExcelDatabase";
import { spellNameToUrl } from "@/app/lib/spellUtils";
import { SpellCastingClass } from "@/types/classes";
import Spell, { SpellListEntry } from "@/types/spell";
import ChooseClass from "../ChooseClass";
import SpellListRender from "./SpellListRender";

async function getSpells(dndClass: SpellCastingClass) {
  const res = await fetch(
    `https://www.dnd5eapi.co/api/classes/${dndClass}/spells`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SpellList({
  skipSpells,
  dndClass,
}: {
  skipSpells: string[];
  dndClass: SpellCastingClass;
}) {
  // const rawSpells: Dnd5eApiReference[] = await getSpells(dndClass).then(
  //   (res) => res.results,
  // );

  const dbList: Spell[] = await readClassSpellList(dndClass);

  // const spellList: SpellListEntry[] = rawSpells.map((raw) => {
  //   return { name: raw.name, url: raw.url };
  // });

  const spellList: SpellListEntry[] = dbList.map((raw) => {
    return {
      name: raw.name,
      url: spellNameToUrl(raw.name),
      level: raw.level,
    };
  });

  const spellFilter = (spell: SpellListEntry) => {
    const parsedSpellName = spell.name.toLowerCase().split(/ |\//).join("-");
    return !skipSpells.includes(`${parsedSpellName}/${dndClass}`);
  };

  const filteredSpells = spellList.filter(spellFilter);

  return (
    <div className="max-h-screen">
      <h2>
        List of <ChooseClass initialClass={dndClass} /> spells
      </h2>
      <div
        className="overflow-auto scroll-smooth"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <SpellListRender spells={filteredSpells} dndClass={dndClass} />
      </div>
    </div>
  );
}
