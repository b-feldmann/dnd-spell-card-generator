"use client";

import { SpellCastingClass } from "@/types/classes";
import { Button } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import classNames from "classnames";
import styles from "./styles.module.scss";

export default function AddSpellButton({
  spellName,
  link,
  dndClass,
}: {
  spellName: string;
  link: string;
  dndClass: SpellCastingClass;
}) {
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

  const buttonClassConfig = {
    "w-full": true,
    "!text-left": true,
  };
  // @ts-ignore
  buttonClassConfig[styles.artificer] = dndClass === "artificer";
  // @ts-ignore
  buttonClassConfig[styles.bard] = dndClass === "bard";
  // @ts-ignore
  buttonClassConfig[styles.cleric] = dndClass === "cleric";
  // @ts-ignore
  buttonClassConfig[styles.druid] = dndClass === "druid";
  // @ts-ignore
  buttonClassConfig[styles.paladin] = dndClass === "paladin";
  // @ts-ignore
  buttonClassConfig[styles.ranger] = dndClass === "ranger";
  // @ts-ignore
  buttonClassConfig[styles.sorcerer] = dndClass === "sorcerer";
  // @ts-ignore
  buttonClassConfig[styles.warlock] = dndClass === "warlock";
  // @ts-ignore
  buttonClassConfig[styles.wizard] = dndClass === "wizard";

  const buttonClass = classNames(buttonClassConfig);

  return (
    <Button type="primary" className={buttonClass} onClick={addSpell}>
      {spellName}
    </Button>
  );
}
