import { SpellListEntry } from "@/types/spell";
import SpellListRender from "./SpellListRender";
import { SpellCastingClass } from "@/types/classes";

async function getSpells(dndClass: SpellCastingClass) {
  const res = await fetch(
    `https://www.dnd5eapi.co/api/classes/${dndClass}/spells`
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
  const spells: SpellListEntry[] = await getSpells(dndClass).then(
    (res) => res.results
  );

  const spellFilter = (spell: SpellListEntry) => {
    const parsedSpellName = spell.name.toLowerCase().split(/ |\//).join("-");
    return !skipSpells.includes(parsedSpellName);
  };

  const filteredSpells = spells.filter(spellFilter);

  return (
    <div>
      <h1>List of all Spells</h1>
      <SpellListRender spells={filteredSpells} dndClass={dndClass} />
    </div>
  );
}
