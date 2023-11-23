import { readClassSpellList } from "@/app/actions/readExcelDatabase";
import { generateAtHigherLevel, spellNameToUrl } from "@/app/lib/spellUtils";
import { SpellCastingClass } from "@/types/classes";
import Spell, {
  DamageTypes,
  Dnd5eSpell,
  Dnd5eSpellAreaOfEffect,
} from "@/types/spell";
import SpellRender from "./SpellRender";

export const EmptySpell: Spell = {
  name: "Loading",
  level: 0,
  castingTime: "1 action",
  range: "Touch",
  duration: "Instantaneous",
  components: ["V", "S", "M"],
  school: "Divination",
};

const getAreaOfEffectDescription = (areaOfEffect?: Dnd5eSpellAreaOfEffect) => {
  if (!areaOfEffect) return "";
  const { type, size } = areaOfEffect;

  return type + " " + size;
};

async function getSpell(spellName: string, dndClass: SpellCastingClass) {
  if (!spellName) return EmptySpell;

  const res = await fetch(`https://www.dnd5eapi.co/api/spells/${spellName}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    const dbList: Spell[] = await readClassSpellList(dndClass);
    return (
      dbList.find((spell) => {
        return spellNameToUrl(spell.name) === spellName;
      }) || EmptySpell
    );
  }

  const rawSpell: Dnd5eSpell = await res.json();

  const { desc, atHigherLevel } = generateAtHigherLevel(
    rawSpell.desc,
    rawSpell.higher_level,
  );

  const spell: Spell = {
    name: rawSpell.name,
    desc: desc,
    level: rawSpell.level,
    atHigherLevel: atHigherLevel,
    castingTime: rawSpell.casting_time,
    range: rawSpell.range,
    components: rawSpell.components,
    material: rawSpell.material,
    areaOfEffect: getAreaOfEffectDescription(rawSpell.area_of_effect),
    ritual: rawSpell.ritual,
    duration: rawSpell.duration,
    concentration: rawSpell.concentration,
    school: rawSpell.school.name,
    damage: rawSpell.damage?.damage_type.name as DamageTypes,
  };

  return spell;
}

export default async function SpellCard({
  spellName,
  dndClass,
}: {
  spellName: string;
  dndClass: SpellCastingClass;
}) {
  const spell: Spell = await getSpell(spellName, dndClass);

  return <SpellRender spell={spell} dndClass={dndClass} spellKey={spellName} />;
}
