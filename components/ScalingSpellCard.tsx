import ScaleToParent from "./ScaleToParent";
import SuspendingSpellCard from "./SpellCard/SuspendingSpellCard";

export default function ScalingSpellCard({ spellName }: { spellName: string }) {
  return (
    <div key={`scaling-spell-${spellName}`}>
      <ScaleToParent>
        <SuspendingSpellCard spellName={spellName} />
      </ScaleToParent>
    </div>
  );
}
