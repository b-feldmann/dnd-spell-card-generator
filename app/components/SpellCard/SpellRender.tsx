import { Mirza } from "next/font/google";

import Spell from "@/types/spell";

import CornerStarSvg from "../../../public/cornerStar.svg";
import classToColor from "@/app/lib/classToColor";
import { SpellCastingClass } from "@/types/classes";
import classNames from "classnames";
import TextResize from "../TextResize/TextResize";
import MetaInformation from "./MetaInformation";

import fastHashCode from "fast-hash-code";

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
  dndClass,
}: {
  spell: Spell;
  dndClass: SpellCastingClass;
}) {
  const ordinalLevel = (level: number) => {
    if (level === 0) return "Cantrip";
    if (level === 1) return "1st-level";
    if (level === 2) return "2nd-level";
    if (level === 3) return "3rd-level";
    return `${level}th-level`;
  };

  const {
    name,
    level,
    school,
    desc,
    atHigherLevel,
    castingTime,
    duration,
    range,
    concentration,
    ritual,
    components,
    areaOfEffect,
    damage,
  }: Spell = spell;

  const genKey = (content: string) => {
    return fastHashCode(`${name}/${content}`);
  };

  const levelAsText = ordinalLevel(level);

  const concentrationDescription = concentration ? "(C)" : "";
  const ritualDescription = ritual ? "or Ritual" : "";

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
            <span key={genKey(line)} className={mirza.className}>
              {line.replaceAll("***", "")}
            </span>
          );
        }
        return line;
      });

    return <span>{splicedContent}</span>;
  };

  const color = classToColor(dndClass);

  const descWordCount =
    (desc?.reduce((acc, current) => acc + current.length, 0) ?? 0) +
    (atHigherLevel?.reduce((acc, current) => acc + current.length, 0) ?? 0);

  const useSmallMetaInfo = descWordCount > 1000;

  const textResizeClass = classNames({
    "!h-[224px]": !damage && !useSmallMetaInfo,
    "!h-[209px]": !!damage && !useSmallMetaInfo,
    "!h-[254px]": !damage && useSmallMetaInfo,
    "!h-[239px]": !!damage && useSmallMetaInfo,
  });

  const metaGridClass = classNames("grid", "text-[11px]", {
    "grid-cols-2": useSmallMetaInfo,
  });

  return (
    <div
      className="relative box-border h-[358px] min-h-0 w-[250px] overflow-hidden rounded border border-2 border-solid bg-white font-sans antialiased"
      style={{ borderColor: color }}
      key={`spell-render-${name}`}
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
      <div className="h-full p-2">
        <p
          className="mx-1 -mt-1 mb-2 border-0 border-b-2 border-solid text-center text-lg font-bold"
          style={{ borderColor: color }}
        >
          <span className={mirza.className}>{name}</span>
        </p>
        <div className={metaGridClass}>
          <MetaInformation
            color={color}
            type="casting-time"
            content={`${castingTime} ${ritualDescription}`}
          />
          <MetaInformation
            color={color}
            type="range"
            content={`${range} ${areaOfEffect}`}
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
            <MetaInformation color={color} type="damage" content={damage} />
          )}
        </div>
        <div
          className="mx-1 mb-1 mt-1 border-0 border-b-2 border-solid text-center text-lg font-bold"
          style={{ borderColor: color }}
        ></div>

        <div className={textResizeClass}>
          <TextResize defaultFontSize={10} minFontSize={5} maxFontSize={10}>
            {desc?.map((line) => (
              <p key={genKey(line)} className="my-0.5">
                {parseMarkdown(line)}
              </p>
            ))}
            {atHigherLevel && atHigherLevel.length > 0 && (
              <p className="-mb-0.5 mt-1 text-xs">
                <span className={mirza.className}>At Higher Levels:</span>
              </p>
            )}
            {atHigherLevel?.map((line) => (
              <p key={genKey(line)} className="my-0.5">
                {parseMarkdown(line)}
              </p>
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
