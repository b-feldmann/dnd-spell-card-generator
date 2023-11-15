import Spell from "@/types/spell";
import SpellRender from "./SpellRender";
import { Suspense } from "react";
import SpellCard from "./SpellCard";

const EmptySpell: Spell = {
  name: "Loading",
  level: 0,
  school: {
    name: "Divination",
  },
};

export default async function SuspendingSpellCard({
  spellName,
  color = "red",
}: {
  spellName: string;
  color?: string;
}) {
  return (
    <Suspense fallback={<SpellRender spell={EmptySpell} color={color} />}>
      <SpellCard spellName={spellName} color={color} />
    </Suspense>
  );
}
