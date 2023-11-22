import { Mirza } from "next/font/google";

import Spell from "@/types/spell";

import classToColor from "@/app/lib/classToColor";
import { SpellCastingClass } from "@/types/classes";
import classNames from "classnames";
import CornerStarSvg from "../../../public/cornerStar.svg";
import TextResize from "../TextResize/TextResize";
import MetaInformation from "./MetaInformation";

import { capitalizeFirstLetter } from "@/app/lib/spellUtils";
import fastHashCode from "fast-hash-code";

const mirza = Mirza({
  subsets: ["latin"],
  weight: "600",
});

export const CARD_WIDTH = 250;
export const CARD_HEIGHT = 356;

export default async function SpellRender({
  spellKey,
  spell,
  dndClass,
}: {
  spellKey: string;
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
    material,
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
    const boldRegex = /(\*\*\*.*\*\*\*)|(<b>.*<\/b>)/g;
    const italicRegex = /(<i>.*<\/i>|\(?[1-9]?[0-9]d[1-9]?[0-9]\)?)/g;
    const splicedContent = content
      .split(boldRegex)
      .filter((line) => line && line.length > 0)
      .flatMap((line) => line.split(italicRegex))
      .filter((line) => line && line.length > 0)
      .map((line) => {
        if (line.match(boldRegex)) {
          return (
            <span
              key={genKey(line)}
              className={mirza.className}
              style={{ fontSize: "1.3em" }}
            >
              {line.replaceAll(/\*\*\*|<b>|<\/b>/g, "")}
            </span>
          );
        } else if (line.match(italicRegex)) {
          return (
            <span key={genKey(line)} className="italic">
              {line.replaceAll(/<i>|<\/i>/g, "")}
            </span>
          );
        }
        return line;
      });

    return <span>{splicedContent}</span>;
  };

  const color = classToColor(dndClass);

  const useMaterial = material?.includes("which the spell consumes");

  const materialSpan = (
    <span style={{ fontSize: "0.7em" }}>{` (${material?.replace(
      /, which the spell consumes\.?/,
      "",
    )})`}</span>
  );

  const componentsSpan = (
    <span>
      {components}
      {useMaterial && materialSpan}
    </span>
  );

  const descWordCount =
    (desc?.reduce((acc, current) => acc + current.length, 0) ?? 0) +
    (atHigherLevel?.reduce((acc, current) => acc + current.length, 0) ?? 0);

  const useSmallMetaInfo = descWordCount > 1000 && !material;

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
            content={componentsSpan}
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
              <p className="-mb-0.5 mt-1">
                <span className={mirza.className} style={{ fontSize: "1.3em" }}>
                  At Higher Levels:
                </span>
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
