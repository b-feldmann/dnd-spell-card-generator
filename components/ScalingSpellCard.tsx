import ScaleToParent from "./ScaleToParent";
import SpellCard from "./SpellCard/SpellCard";

export default function ScalingSpellCard({ spellName }: { spellName: string }) {
  const resizeFactor = (width: number) => width / CARD_WIDTH;

  return (
    <div id={`scaling-spell-${spellName}`}>
      <ScaleToParent>
        <SpellCard spellName={spellName} />
      </ScaleToParent>
    </div>
  );
}
