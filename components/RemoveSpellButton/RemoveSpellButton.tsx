"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import { CloseOutlined, DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";

export default function RemoveSpellButton({ spell }: { spell: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const spellLink = spell.toLowerCase().split(/ |\//).join("-");

  const removeSpell = () => {
    const current = new URLSearchParams(searchParams);

    const value = spellLink;
    current.delete("s", value);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="z-50 absolute right-0 m-2" >
      <Button size="small" danger shape="circle" icon={<DeleteOutlined />} onClick={removeSpell}></Button>
    </div>
  );
}
