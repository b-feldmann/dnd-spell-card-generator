"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import { SpellCastingClass } from "@/types/classes";

import styles from "./styles.module.scss";
import classNames from "classnames";

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
  buttonClassConfig[styles.artificer] = dndClass === "artificer";
  buttonClassConfig[styles.bard] = dndClass === "bard";
  buttonClassConfig[styles.cleric] = dndClass === "cleric";
  buttonClassConfig[styles.druid] = dndClass === "druid";
  buttonClassConfig[styles.paladin] = dndClass === "paladin";
  buttonClassConfig[styles.ranger] = dndClass === "ranger";
  buttonClassConfig[styles.sorcerer] = dndClass === "sorcerer";
  buttonClassConfig[styles.warlock] = dndClass === "warlock";
  buttonClassConfig[styles.wizard] = dndClass === "wizard";

  const buttonClass = classNames(buttonClassConfig);

  return (
    <Button type="primary" className={buttonClass} onClick={addSpell}>
      {spellName}
    </Button>
  );
}
