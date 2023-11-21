import SpellBook from "@/components/SpellBook";
import { toSpellsAndClasses } from "@/lib/searchParamsConverter";
import { SpellAndClass } from "@/types/spell";
import { ConfigProvider } from "antd";
import theme from "../../theme/themeConfig";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const columns = 3;

  const spellsAndClasses: SpellAndClass[] = toSpellsAndClasses(searchParams);

  //<SpellBook spellNames={spells} columns={columns} />
  return (
    <ConfigProvider theme={theme}>
      <SpellBook spellsAndClasses={spellsAndClasses} columns={columns} print />
    </ConfigProvider>
  );
}
