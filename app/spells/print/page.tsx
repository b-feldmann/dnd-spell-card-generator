import { ConfigProvider } from "antd";
import theme from "../../../theme/themeConfig";
import SpellBook from "@/components/SpellBook";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const columns = 3;

  const selectedSearch = searchParams?.s;
  const spells = selectedSearch
    ? Array.isArray(selectedSearch)
      ? selectedSearch
      : [selectedSearch]
    : [];

  //<SpellBook spellNames={spells} columns={columns} />
  return (
    <ConfigProvider theme={theme}>
      <SpellBook spellNames={spells} columns={columns} print />
    </ConfigProvider>
  );
}
