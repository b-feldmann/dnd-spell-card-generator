"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import { SpellCastingClass } from "@/types/classes";

export default function RemoveSpellButton({
  spell,
  dndClass,
}: {
  spell: string;
  dndClass: SpellCastingClass;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const spellLink = spell.toLowerCase().split(/ |\//).join("-");

  const removeSpell = () => {
    const current = new URLSearchParams(searchParams);

    const value = `${spellLink}/${dndClass}`;
    current.delete("s", value);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="absolute right-1 top-1 z-50 m-2">
      <Button
        style={{
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
        danger
        shape="circle"
        icon={<DeleteOutlined />}
        onClick={removeSpell}
      ></Button>
    </div>
  );
}
