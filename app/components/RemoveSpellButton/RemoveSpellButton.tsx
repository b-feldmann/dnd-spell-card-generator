"use client";

import { SpellCastingClass } from "@/types/classes";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    <div className="absolute right-0.5 top-0.5 z-50 m-2">
      <Button
        size="small"
        style={{
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
        type="primary"
        shape="circle"
        icon={<DeleteOutlined />}
        onClick={removeSpell}
      ></Button>
    </div>
  );
}
