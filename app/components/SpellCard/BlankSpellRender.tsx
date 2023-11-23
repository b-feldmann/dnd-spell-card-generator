import classToColor from "@/app/lib/classToColor";
import { SpellCastingClass } from "@/types/classes";
import React, { Suspense } from "react";

import CornerStarSvg from "../../../public/cornerStar.svg";

export default async function BlankSpellRender({
  spellKey,
  dndClass,
  children,
}: {
  spellKey: string;
  dndClass: SpellCastingClass;
  children?: React.ReactNode;
}) {
  const color = classToColor(dndClass);

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
      {children}
    </div>
  );
}
