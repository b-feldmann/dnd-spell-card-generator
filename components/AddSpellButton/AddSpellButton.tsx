"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";

export default function AddSpellButton({ spell, content }: { spell: string, content?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const spellLink = spell.toLowerCase().split(/ |\//).join("-");

  const addSpell = () => {
    const current = new URLSearchParams(searchParams);

    const value = spellLink;
    current.append("s", value);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div>
      <Button shape="round" type="default" onClick={addSpell}>{content ?? spell}</Button>
    </div>
  );
}
