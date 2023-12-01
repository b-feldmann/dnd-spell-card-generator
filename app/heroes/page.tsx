"use server";

import theme from "@/theme/themeConfig";
import { PrismaClient } from "@prisma/client";
import { ConfigProvider } from "antd";
import ClassLevelSelect from "./ClassLevelSelect";
import CreateHeroForm from "./CreateHeroForm";
import HeroListRender from "./HeroListRender";
import { HeroClassAtLevel } from "@/types/hero";
import SpellList from "../components/SpellList/SpellList";
import SpellBook from "../components/SpellBook";
const prisma = new PrismaClient();

export async function updateLevelForClass(
  classAtLevel: HeroClassAtLevel,
  newLevel: number,
) {
  await prisma.classAtLevel.update({
    where: {
      className_heroId: {
        className: classAtLevel.className,
        heroId: classAtLevel.heroId,
      },
    },
    data: {
      level: newLevel,
    },
  });
}

export default async function Heroes({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const selectedHero = searchParams?.hero;
  const heroName: string | undefined = Array.isArray(selectedHero)
    ? selectedHero[0]
    : selectedHero;

  const heroes = await prisma.hero.findMany({});
  const currentHero = await prisma.hero.findFirst({
    where: { name: heroName },
    include: {
      classes: true,
      race: true,
    },
  });

  console.log(currentHero);

  return (
    <ConfigProvider theme={theme}>
      <div className="grid h-full grid-cols-12 gap-1">
        <div className="col-span-2 m-1 flex flex-col justify-between rounded border border-2 border-solid p-2">
          <HeroListRender heroes={heroes} />
          <CreateHeroForm />
        </div>
        {currentHero && (
          <div className="col-span-10">
            <div className="flex">
              {currentHero.classes.map((classAtLevel) => (
                <ClassLevelSelect
                  key={`level-select-${classAtLevel.className}`}
                  classAtLevel={classAtLevel}
                />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-3">
                <SpellList
                  skipSpells={[]}
                  dndClass={currentHero?.classes}
                  disableClassSelect
                  printClassName
                />
              </div>
              <div className="col-span-9">
                <SpellBook spellsAndClasses={[]} columns={3} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}
