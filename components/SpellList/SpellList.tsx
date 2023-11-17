import { SpellListEntry } from "@/types/spell";
import SpellListRender from "./SpellListRender";
import { SpellCastingClass } from "@/types/classes";
import ChooseClass from "../ChooseClass";

async function getSpells(dndClass: SpellCastingClass) {
  const res = await fetch(
    `https://www.dnd5eapi.co/api/classes/${dndClass}/spells`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
    console.log(skipSpells + " : " + `${parsedSpellName}/${dndClass}`)
    return !skipSpells.includes(`${parsedSpellName}/${dndClass}`);
  };

  const filteredSpells = spells.filter(spellFilter);

  return (
    <div className="max-h-screen">
      <h2>
        List of <ChooseClass /> spells
      </h2>
      <div className="scroll-smooth overflow-auto" style={{ height: "calc(100vh - 90px)" }}>
        <SpellListRender spells={filteredSpells} dndClass={dndClass} />
      </div>
    </div>
  );
}
