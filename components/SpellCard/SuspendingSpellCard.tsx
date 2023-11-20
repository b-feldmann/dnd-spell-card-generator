import Spell from "@/types/spell";
import SpellRender from "./SpellRender";
import { Suspense } from "react";
import SpellCard from "./SpellCard";
import { SpellCastingClass } from "@/types/classes";

const EmptySpell: Spell = {
  name: "Loading",
  level: 0,
  casting_time: "1 action",
  range: "Touch",
  duration: "Instantaneous",
  components: ["M", "S", "M"],
  school: {
    name: "Divination",
  },
};

export default async function SuspendingSpellCard({
  spellName,
  dndClass,
}: {
  spellName: string;
  dndClass: SpellCastingClass;
}) {
  return (
    // <Suspense fallback={<SpellRender spell={EmptySpell} dndClass={dndClass} />}>
    <SpellCard spellName={spellName} dndClass={dndClass} />
    // </Suspense>
  );
}
