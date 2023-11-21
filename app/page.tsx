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
  const spellsAndClasses: SpellAndClass[] = toSpellsAndClasses(searchParams);

  const selectedClass = searchParams?.class ?? "cleric";
  const dndClass: SpellCastingClass = Array.isArray(selectedClass)
    ? selectedClass[0]
    : selectedClass;

  const printParams = spellsAndClasses.map(
    (spellAndClass) => `${spellAndClass.spell}/${spellAndClass.dndClass}`,
  );

  return (
    <ConfigProvider theme={theme}>
      <div className="grid grid-cols-11 gap-2">
        <div className="col-span-2">
          <SpellList skipSpells={printParams} dndClass={dndClass} />
        </div>
        <div className="col-span-9">
          {spellsAndClasses && (
            <div
              className="overflow-auto scroll-smooth"
              style={{ height: "calc(100vh - 18px)" }}
            >
              <SpellBook spellsAndClasses={spellsAndClasses} columns={5} />
            </div>
          )}
        </div>
      </div>
      <PrintButton searchParams={`?s=${printParams.join("&s=")}`} />
    </ConfigProvider>
  );
}
