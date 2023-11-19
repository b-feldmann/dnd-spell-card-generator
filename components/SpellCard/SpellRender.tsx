import { Mirza } from "next/font/google";

import Spell, { SpellAreaOfEffect, Damage } from "@/types/spell";

import CornerStarIcon from "@/components/SVG/CornerStar";
import MetaInformation from "./MetaInformation";
import { SpellCastingClass } from "@/types/classes";
import CardDivider from "../SVG/CardDivider";
import classToColor from "@/lib/classToColor";
import ResizableText from "../ResizingText";
import TextResize from "../TextResize/TextResize";
import classNames from "classnames";

const mirza = Mirza({
  subsets: ["latin"],
  weight: "600",
});

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const CARD_WIDTH = 250;
export const CARD_HEIGHT = 356;

export default async function SpellRender({
  spell,
  dndClass = "cleric",
}: {
  spell: Spell;
  dndClass?: SpellCastingClass;
}) {
  const ordinalLevel = (level: number) => {
    if (level === 0) return "Cantrip";
    if (level === 1) return "1st-level";
    if (level === 2) return "2nd-level";
    if (level === 3) return "3rd-level";
    return `${level}th-level`;
  };

  const getAreaOfEffectDescription = (areaOfEffect?: SpellAreaOfEffect) => {
    if (!areaOfEffect) return "";
    const { type, size } = areaOfEffect;

    return type + " " + size;
  };

  const {
    name,
    level,
    school: { name: school },
    desc,
    higher_level: atHigherLevel,
    casting_time: castingTime,
    duration,
    range,
    concentration,
    ritual,
    components,
    area_of_effect: areaOfEffect,
    attack_type: attackType,
    damage,
  }: Spell = spell;

  const levelAsText = ordinalLevel(level);
  const areaOfEffectDescription = getAreaOfEffectDescription(areaOfEffect);

  const concentrationDescription = concentration ? "(C)" : "";
  const ritualDescription = ritual ? "or Ritual" : "";

  const parseDamage = (damage?: Damage) => {
    return damage?.damage_type?.name;
  };

  const parseDamageAtLevel = (damage?: Damage) => {
    if(!damage?.damage_at_slot_level) return null;

    return Object.keys(damage.damage_at_slot_level).map(key => `${key}: ${damage.damage_at_slot_level[key]}`).join(', ')
  };

  const spellType =
    level === 0 ? `${school} ${levelAsText}` : `${levelAsText} ${school}`;

  const parseMarkdown = (content: string) => {
    const regex = /(\*\*\*.*\*\*\*)/g;
    const splicedContent = content
      .split(regex)
      .filter((line) => line.length > 0)
      .map((line) => {
        if (line.match(regex)) {
          return (
            <span className="font-bold">{line.replaceAll("***", "")}</span>
          );
        }
        return line;
      });

    return <span>{splicedContent}</span>;
  };

  const color = classToColor(dndClass);

  const textResizeClass = classNames({
     "!h-[210px]": !damage,
     "!max-h-[210px]": !damage,
     "!h-[195px]": !!damage,
     "!max-h-[195px]": !!damage
  })

  return (
    <div
      className="antialiased relative box-border font-sans w-[250px] h-[358px] min-h-0 overflow-hidden border border-2 border-solid rounded"
      style={{ borderColor: color }}
    >
      <CornerStarIcon
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
        style={{ fill: color }}
      />
      <CornerStarIcon
        className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
        style={{ fill: color }}
      />
      <CornerStarIcon
        className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
        style={{ fill: color }}
      />
      <CornerStarIcon
        className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
        style={{ fill: color }}
      />
      <div className="p-2 h-full">
        <p
          className="mx-1 mt-1 mb-2 text-lg text-center font-bold border-0 border-b-2 border-solid"
          style={{ borderColor: color }}
        >
          <span className={mirza.className}>{name}</span>
        </p>
        {/* <CardDivider style={{ fill: color }} /> */}
        <div className="text-[11px]">
          <MetaInformation
            color={color}
            type="casting-time"
            content={`${castingTime} ${ritualDescription}`}
          />
          <MetaInformation
            color={color}
            type="range"
            content={`${range} ${areaOfEffectDescription}`}
          />
          <MetaInformation
            color={color}
            type="components"
            content={components}
          />
          <MetaInformation
            color={color}
            type="duration"
            content={`${duration} ${concentrationDescription}`}
          />
          {damage && (
            <MetaInformation
              color={color}
              type="damage"
              content={parseDamage(damage)}
            />
          )}
          {/* {damage && (
            <MetaInformation
              color={color}
              type="damage"
              content={parseDamageAtLevel(damage)}
            />
          )} */}
        </div>
        <p
          className="mx-1 mt-1 mb-2 text-lg text-center font-bold border-0 border-b-2 border-solid"
          style={{ borderColor: color }}
        >
        </p>

        <div className={textResizeClass}>
          <TextResize defaultFontSize={10} minFontSize={5} maxFontSize={13}>
            {desc?.map((line) => (
              <p className="my-1">{parseMarkdown(line)}</p>
            ))}
            {atHigherLevel && atHigherLevel.length > 0 && (
            <p className="mt-1 mb-0 text-xs">
              <span className={mirza.className}>At Higher Levels:</span>
            </p>
          )}
          {atHigherLevel?.map((line) => (
            <p className="my-1">{parseMarkdown(line)}</p>
          ))}
          </TextResize>
        </div>
      </div>
      <div className="absolute bottom-0.5 right-2 text-xs">
        <span className={mirza.className}>{spellType}</span>
      </div>
      <div className="absolute bottom-0.5 left-2 text-xs">
        <span className={mirza.className}>
          {capitalizeFirstLetter(dndClass)}
        </span>
      </div>
    </div>
  );
}
