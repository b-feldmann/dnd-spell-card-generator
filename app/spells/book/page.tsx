import ScalingSpellCard from "@/components/ScalingSpellCard";
import { ConfigProvider } from "antd";
import theme from "../../../theme/themeConfig";
import SpellBook from "@/components/SpellBook";

export default async function Page() {
  const columns = 5;
  const spells = [
    "command",
    "comprehend-languages",
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
      <SpellBook spellNames={spells} columns={columns} />
    </ConfigProvider>
  );
}
