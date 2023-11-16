"use client"

import { SpellCastingClass } from "@/types/classes";
import { SpellListEntry } from "@/types/spell";
import { List } from "antd";
import AddSpellButton from "../AddSpellButton/AddSpellButton";

export default function SpellListRender({
  spells,
  dndClass
}: {
  spells: SpellListEntry[];
  dndClass: SpellCastingClass
}) {
  return (
    <List
        size="small"
      itemLayout="horizontal"
      dataSource={spells}
      renderItem={(item) => (
        <List.Item className="!p-0">
            <AddSpellButton link={item.url.substring(item.url.lastIndexOf('/') + 1)} spellName={item.name} dndClass={dndClass}/>
        </List.Item>
      )}
    />
  );
}
