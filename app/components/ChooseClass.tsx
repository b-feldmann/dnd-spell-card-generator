"use client";

import { SpellCastingClass } from "@/types/classes";
import { Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ChooseClass({
  initialClass,
}: {
  initialClass: SpellCastingClass;
}) {
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
      id="choose-class-select"
      style={{ width: 110 }}
      onChange={chooseClass}
      defaultValue={initialClass}
      options={[
        { value: "artificer", label: "Artificer" },
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
