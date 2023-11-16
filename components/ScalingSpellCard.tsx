import { SpellCastingClass } from "@/types/classes";
import ScaleToParent from "./ScaleToParent";
import SuspendingSpellCard from "./SpellCard/SuspendingSpellCard";

export default function ScalingSpellCard({ spellName, dndClass }: { spellName: string, dndClass: SpellCastingClass }) {
  return (
    <div key={`scaling-spell-${spellName}`}>
      <ScaleToParent>
        <SuspendingSpellCard spellName={spellName} dndClass={dndClass} />
      </ScaleToParent>
    </div>
  );
}
