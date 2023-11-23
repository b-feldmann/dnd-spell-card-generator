import classNames from "classnames";

import { SpellAndClass } from "@/types/spell";
import RemoveSpellButton from "./RemoveSpellButton/RemoveSpellButton";
import ScalingSpellCard from "./ScalingSpellCard";
import SpellCard from "./SpellCard/SpellCard";
import BackSideRender from "./BackSideRender/BackSideRender";

export default function SpellBook({
  spellsAndClasses,
  columns,
  print,
  includeBackSide,
}: {
  spellsAndClasses: SpellAndClass[];
  columns: number;
  print?: boolean;
  includeBackSide?: boolean;
}) {
  const gridClass = classNames({
    grid: true,
    "gap-x-2": true,
    "gap-y-3": true,
    "grid-cols-2": columns === 2,
    "grid-cols-3": columns === 3,
    "grid-cols-4": columns === 4,
    "grid-cols-5": columns === 5,
    "grid-cols-6": columns === 6,
    "grid-cols-7": columns === 7,
    "grid-cols-8": columns === 8,
  });

  const generateCard = (spellAndClass: SpellAndClass) => {
    const { spell: name, dndClass } = spellAndClass;

    if (print) {
      return [
        <SpellCard spellName={name} dndClass={dndClass} />,
        <BackSideRender spellKey={name} dndClass={dndClass} />,
      ];
    }

    return (
      <div className="relative" key={`spell-card-wrapper-${name}`}>
        <RemoveSpellButton spell={name} dndClass={dndClass} />
        <ScalingSpellCard spellName={name} dndClass={dndClass} />
      </div>
    );
  };

  return <div className={gridClass}>{spellsAndClasses.map(generateCard)}</div>;
}
