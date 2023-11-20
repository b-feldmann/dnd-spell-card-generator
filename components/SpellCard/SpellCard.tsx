import Spell from "@/types/spell";
import SpellRender from "./SpellRender";
import { SpellCastingClass } from "@/types/classes";

const EmptySpell: Spell = {
  name: "Loading",
  level: 0,
  school: {
    name: "Divination",
  },
};

async function getSpell(spellName: string) {
  if (!spellName) return EmptySpell;

  const res = await fetch(`https://www.dnd5eapi.co/api/spells/${spellName}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return EmptySpell;
  }

  return res.json();
}

export default async function SpellCard({
  spellName,
  dndClass,
}: {
  spellName: string;
  dndClass: SpellCastingClass;
}) {
  const spell = await getSpell(spellName);

  return <SpellRender spell={spell} dndClass={dndClass} />;
}
