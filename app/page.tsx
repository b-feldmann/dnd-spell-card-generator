import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import SpellBook from "@/components/SpellBook";
import SpellList from "@/components/SpellList/SpellList";
import { PrintButton } from "@/components/PrintButton";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const selectedSearch = searchParams?.s;
  const spells = selectedSearch
    ? Array.isArray(selectedSearch)
      ? selectedSearch
      : [selectedSearch]
    : [];

  console.log(spells);

  return (
    <ConfigProvider theme={theme}>
      <div className="grid grid-cols-8">
        <div className="col-span-1">
          <SpellList skipSpells={spells} dndClass="ranger" />
        </div>
        <div className="col-span-7">
          {spells && <SpellBook spellNames={spells} columns={6} />}
        </div>
      </div>
      <PrintButton searchParams={`?s=${spells.join('&s=')}`}/>
    </ConfigProvider>
  );
}
