"use client"

import { SpellListEntry } from "@/types/spell";
import { List } from "antd";
import AddSpellButton from "../AddSpellButton/AddSpellButton";
import { SpellCastingClass } from "@/types/classes";

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
            <AddSpellButton spell={item.url.substring(item.url.lastIndexOf('/') + 1)} content={item.name}/>
        </List.Item>
      )}
    />
  );
}
