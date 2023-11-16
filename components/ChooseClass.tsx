"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "antd";

export default function ChooseClass() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const chooseClass = (dndClass: string) => {
    const current = new URLSearchParams(searchParams);

    current.set("class", dndClass);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <Select
      defaultValue="cleric"
      style={{ width: 110 }}
      onChange={chooseClass}
      options={[
        { value: "cleric", label: "Cleric" },
        { value: "bard", label: "Bard" },
        { value: "druid", label: "Druid" },
        { value: "paladin", label: "Paladin" },
        { value: "ranger", label: "Ranger" },
        { value: "sorcerer", label: "Sorcerer" },
        { value: "warlock", label: "Warlock" },
        { value: "wizard", label: "Wizard" },
      ]}
    />
  );
}
