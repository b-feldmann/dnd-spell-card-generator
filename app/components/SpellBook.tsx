import classNames from "classnames";

import SpellCard from "./SpellCard";
import ScalingSpellCard from "./ScalingSpellCard";

export default function SpellBook({
  spellNames,
  columns,
  print,
}: {
  spellNames: string[];
  columns: number;
  print: boolean;
}) {
  const gridClass = classNames({
    "print-grid": true,
    grid: true,
    "gap-1": true,
    "grid-cols-2": columns === 2,
    "grid-cols-3": columns === 3,
    "grid-cols-4": columns === 4,
    "grid-cols-5": columns === 5,
    "grid-cols-6": columns === 6,
    "grid-cols-7": columns === 7,
    "grid-cols-8": columns === 8,
  });

  const generateCard = (name: string) => {
    if (print) {
      return <SpellCard spellName={name} />;
    }

    return (
      <ScalingSpellCard divider={columns} spellName={name} />
    );
  };

  return <div className={gridClass}>{spellNames.map(generateCard)}</div>;
}

SpellBook.defaultProps = {
  print: false,
};
