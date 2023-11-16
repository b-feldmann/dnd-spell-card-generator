import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import SpellBook from "@/components/SpellBook";
import SpellList from "@/components/SpellList/SpellList";
import { PrintButton } from "@/components/PrintButton";
import { SpellCastingClass } from "@/types/classes";
import { SpellAndClass } from "@/types/spell";
import { toSpellsAndClasses } from "@/lib/searchParamsConverter";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const spellsAndClasses: SpellAndClass[] = toSpellsAndClasses(searchParams)

  const selectedClass = searchParams?.class ?? "cleric";
  const dndClass: SpellCastingClass = Array.isArray(selectedClass)
    ? selectedClass[0]
    : selectedClass;

  const spellNames = spellsAndClasses.map(spellAndClass => spellAndClass.spell)
  const printParams = spellsAndClasses.map(spellAndClass => `${spellAndClass.spell}/${spellAndClass.dndClass}`)

  return (
    <ConfigProvider theme={theme}>
      <div className="grid grid-cols-8">
        <div className="col-span-1">
          <SpellList skipSpells={spellNames} dndClass={dndClass} />
        </div>
        <div className="col-span-7">
          {spellsAndClasses && <SpellBook spellsAndClasses={spellsAndClasses} columns={6} />}
        </div>
      </div>
      <PrintButton searchParams={`?s=${printParams.join("&s=")}`} />
    </ConfigProvider>
  );
}
