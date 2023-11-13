import ScalingSpellCard from "@/app/components/ScalingSpellCard";
import { ConfigProvider } from "antd";
import theme from "../../../theme/themeConfig";
import SpellBook from "@/app/components/SpellBook";
import PrintSpellBook from "@/app/components/PrintSpellBook";

export default async function Page() {
  const columns = 3;
  const spells = [
    "guidance",
    "sacred-flame",
    "light",
    "thaumaturgy",
    "bless",
    "burning-hands",
    "create-or-destroy-water",
    "faerie-fire",
    "guiding-bolt",
    "flaming-sphere",
    "hold-person",
    "scorching-ray",
    "spiritual-weapon"
  ];

  //<SpellBook spellNames={spells} columns={columns} />
  return (
    <ConfigProvider theme={theme}>
      <SpellBook spellNames={spells} columns={columns} print />
    </ConfigProvider>
  );
}
