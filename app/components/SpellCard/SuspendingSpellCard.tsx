import { SpellCastingClass } from "@/types/classes";
import { Suspense } from "react";
import BlankSpellRender from "./BlankSpellRender";
// import SpellCard from "./SpellCard";
import React from "react";

const SpellCard = React.lazy(() => import("./SpellCard"));

export default async function SuspendingSpellCard({
  spellName,
  dndClass,
}: {
  spellName: string;
  dndClass: SpellCastingClass;
}) {
  return (
    <Suspense
      fallback={<BlankSpellRender spellKey={spellName} dndClass={dndClass} />}
    >
      <SpellCard spellName={spellName} dndClass={dndClass} />
    </Suspense>
  );
}
