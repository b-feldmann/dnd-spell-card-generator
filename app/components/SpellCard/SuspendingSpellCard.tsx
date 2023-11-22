import { SpellCastingClass } from "@/types/classes";
import { Suspense } from "react";
import SpellCard, { EmptySpell } from "./SpellCard";
import SpellRender from "./SpellRender";

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
