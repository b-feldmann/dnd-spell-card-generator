import { Mirza } from "next/font/google";

import Spell, { SpellAreaOfEffect } from "@/types/spell";

import CornerStarIcon from "@/components/SVG/CornerStar";
import MetaInformation from "./MetaInformation";

const mirza = Mirza({
  subsets: ["latin"],
  weight: "600",
});

export const CARD_WIDTH = 250;
export const CARD_HEIGHT = 356;

export default async function SpellRender({
  spell,
  color = "red",
}: {
  spell: Spell;
  color?: string;
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
  }: Spell = spell;

  const levelAsText = ordinalLevel(level);
  const areaOfEffectDescription = getAreaOfEffectDescription(areaOfEffect);

  const concentrationDescription = concentration ? "(C)" : "";
  const ritualDescription = ritual ? "or Ritual" : "";

  const spellType =
    level === 0 ? `${school} ${levelAsText}` : `${levelAsText} ${school}`;

  const parseMarkdown = (content: string) => {
    const regex = /(\*\*\*.*\*\*\*)/g
    const splicedContent = content.split(regex)
      .filter(line => line.length > 0)
      .map(line => {
        if(line.match(regex)) {
          return <span className="font-bold">{line.replaceAll('***', '')}</span>
        }
        return line
      })

    return <span>{splicedContent}</span>
  }

  return (
    <div
      className="antialiased relative box-border font-sans w-[250px] h-[358px] min-h-0 overflow-hidden border border-solid"
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
      <div className="p-2">
        <p className="mx-4 mt-1 mb-2 text-lg text-center font-bold border-0 border-b border-solid">
          <span className={mirza.className}>{name}</span>
        </p>
        <div className="text-[10px]">
          <MetaInformation
            type="casting-time"
            content={`${castingTime} ${ritualDescription}`}
          />
          <MetaInformation
            type="range"
            content={`${range} ${areaOfEffectDescription}`}
          />
          <MetaInformation type="components" content={components} />
          <MetaInformation
            type="duration"
            content={`${duration} ${concentrationDescription}`}
          />
        </div>

        <div className="text-[10px] leading-tight">
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
        </div>
      </div>
      <div className="absolute bottom-0.5 right-2 text-xs">
        <span className={mirza.className}>{spellType}</span>
      </div>
    </div>
  );
}
