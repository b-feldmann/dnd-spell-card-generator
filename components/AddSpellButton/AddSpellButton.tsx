"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import { SpellCastingClass } from "@/types/classes";
import classToColor from "@/lib/classToColor";

export default function AddSpellButton({ spellName, link, dndClass }: { spellName: string, link: string, dndClass: SpellCastingClass }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addSpell = () => {
    const current = new URLSearchParams(searchParams);

    const value = `${link}/${dndClass}`;
    current.append("s", value);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div>
      <Button shape="round" type="default" style={{"color": classToColor(dndClass)}} onClick={addSpell}>{spellName}</Button>
    </div>
  );
}
