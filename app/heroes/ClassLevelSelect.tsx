"use client";
import { useRouter } from "next/navigation";
import { HeroClassAtLevel } from "@/types/hero";
import { Select } from "antd";
import { capitalizeFirstLetter } from "../lib/spellUtils";
import { updateLevelForClass } from "./page";

export default function ClassLevelSelect({
  classAtLevel,
}: {
  classAtLevel: HeroClassAtLevel;
}) {
  const router = useRouter();

  const reload = () => {
    router.refresh();
  };

  return (
    <div className="text-blue-600">
      {capitalizeFirstLetter(classAtLevel.className)} level:
      <Select
        size="small"
        options={Array.from(Array(21).keys()).map((level) => {
          return { value: level, label: level };
        })}
        value={classAtLevel.level}
        onChange={(level) =>
          updateLevelForClass(classAtLevel, level).then(reload)
        }
      />
    </div>
  );
}
