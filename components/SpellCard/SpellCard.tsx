import Spell from "@/types/spell";
import SpellRender from "./SpellRender";

const EmptySpell: Spell = {
  name: "Loading",
  level: 0,
  school: {
    name: "Divination",
  },
};

async function getSpell(spellName: string) {
  if (!spellName) return EmptySpell;

  const res = await fetch(`https://www.dnd5eapi.co/api/spells/${spellName}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return EmptySpell;
  }

  return res.json();
}

export default async function SpellCard({
  spellName,
  color = "red",
}: {
  spellName: string;
  color?: string;
}) {
  const spell = await getSpell(spellName);

  return <SpellRender spell={spell} color={color} />;
}
