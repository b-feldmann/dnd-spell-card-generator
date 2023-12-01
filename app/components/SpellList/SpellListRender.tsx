"use client";

import { SpellCastingClass } from "@/types/classes";
import { SpellListEntry } from "@/types/spell";
import { List } from "antd";
import AddSpellButton from "../AddSpellButton/AddSpellButton";

export default function SpellListRender({
  spells,
  printClassName,
}: {
  spells: SpellListEntry[];
  printClassName: boolean;
}) {
  const getLevelList = (lvl: number) => {
    return spells
      .filter((spell) => spell.level == lvl)
      .sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "variant" }),
      );
  };

  const spellsByLevel: { [key: number]: SpellListEntry[] } = {
    0: getLevelList(0),
    1: getLevelList(1),
    2: getLevelList(2),
    3: getLevelList(3),
    4: getLevelList(4),
    5: getLevelList(5),
    6: getLevelList(6),
    7: getLevelList(7),
    8: getLevelList(8),
    9: getLevelList(9),
  };

  return (
    <div>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .filter((level) => spellsByLevel[level].length > 0)
        .map((level) => {
          return (
            <div key={`spell-list-block-${level}`}>
              <p>{level === 0 ? "Cantrips" : `Level ${level}`}</p>
              <List
                key={`spell-list-${level}`}
                size="small"
                itemLayout="horizontal"
                dataSource={spellsByLevel[level]}
                renderItem={(item) => (
                  <List.Item className="!p-0">
                    <AddSpellButton
                      link={item.url.substring(item.url.lastIndexOf("/") + 1)}
                      spellName={item.name}
                      dndClass={item.dndClass}
                      printClassName={printClassName}
                    />
                  </List.Item>
                )}
              />
            </div>
          );
        })}
    </div>
  );
}
