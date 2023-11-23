import classToColor from "@/app/lib/classToColor";
import { SpellCastingClass } from "@/types/classes";

import Spell from "@/types/spell";
import CornerStarSvg from "../../../public/cornerStar.svg";
import { getSpell } from "../SpellCard/SpellCard";

import classNames from "classnames";
import styles from "./style.module.scss";

export default async function BackSideRender({
  spellKey,
  dndClass,
}: {
  spellKey: string;
  dndClass: SpellCastingClass;
}) {
  const level: number = await getSpell(spellKey, dndClass).then(
    (spell: Spell) => spell.level,
  );
  const color = classToColor(dndClass);

  const cardClassConfig = {
    "relative box-border h-[358px] min-h-0 w-[250px] overflow-hidden rounded border border-2 border-solid bg-white font-sans antialiased":
      true,
  };
  // @ts-ignore
  cardClassConfig[styles.artificer] = dndClass === "artificer";
  // @ts-ignore
  cardClassConfig[styles.bard] = dndClass === "bard";
  // @ts-ignore
  cardClassConfig[styles.cleric] = dndClass === "cleric";
  // @ts-ignore
  cardClassConfig[styles.druid] = dndClass === "druid";
  // @ts-ignore
  cardClassConfig[styles.paladin] = dndClass === "paladin";
  // @ts-ignore
  cardClassConfig[styles.ranger] = dndClass === "ranger";
  // @ts-ignore
  cardClassConfig[styles.sorcerer] = dndClass === "sorcerer";
  // @ts-ignore
  cardClassConfig[styles.warlock] = dndClass === "warlock";
  // @ts-ignore
  cardClassConfig[styles.wizard] = dndClass === "wizard";

  const cardClass = classNames(cardClassConfig);

  const topIconClass = classNames({
    "rpg-Icon5_57": dndClass === "artificer",
  });

  const centerIconClass = classNames({
    "rpg-Icon7_62": dndClass === "artificer",
  });

  const botIconClass = classNames({
    "rpg-Icon3_89": dndClass === "artificer",
  });

  const getTopIcon = () => {
    switch (dndClass) {
      case "artificer":
        return "";
      case "bard":
        return "";
      case "cleric":
        return "";
      case "druid":
        return "";
      case "paladin":
        return "";
      case "ranger":
        return "";
      case "sorcerer":
        return "";
      case "warlock":
        return "";
      case "wizard":
        return "";
    }
  };

  const getCenterIcon = () => {
    switch (dndClass) {
      case "artificer":
        return "";
      case "bard":
        return "";
      case "cleric":
        return "";
      case "druid":
        return "";
      case "paladin":
        return "";
      case "ranger":
        return "";
      case "sorcerer":
        return "";
      case "warlock":
        return "";
      case "wizard":
        return "";
    }
  };

  const getBotIcon = () => {
    switch (dndClass) {
      case "artificer":
        return "";
      case "bard":
        return "";
      case "cleric":
        return "";
      case "druid":
        return "";
      case "paladin":
        return "";
      case "ranger":
        return "";
      case "sorcerer":
        return "";
      case "warlock":
        return "";
      case "wizard":
        return "";
    }
  };

  return (
    <div
      className={cardClass}
      style={{ borderColor: color }}
      key={`spell-render-${spellKey}`}
    >
      <CornerStarSvg
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        fill={color}
      />
      <CornerStarSvg
        className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
        fill={color}
      />
      <CornerStarSvg
        className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
        fill={color}
      />
      <CornerStarSvg
        className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
        fill={color}
      />
      <div className={styles.body}>
        <div className={styles.line}>
          <i className={styles.b_lt}></i>
          <i className={styles.b_rt}></i>
          <i className={styles.b_lb}></i>
          <i className={styles.b_rb}></i>
          <b className={styles.level_1}>{level}</b>
          <b className={styles.level_2}>{level}</b>
          <i className={`${styles.icon_top} ${topIconClass}`}>{getTopIcon()}</i>
          <i className={`${styles.icon} ${centerIconClass}`}>
            {getCenterIcon()}
          </i>
          <i className={`${styles.icon_bot} ${botIconClass}`}>{getBotIcon()}</i>
        </div>
      </div>
    </div>
  );
}
