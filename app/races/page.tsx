import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

async function getRaces() {
  const res = await fetch(`https://www.dnd5eapi.co/api/races/gnome/traits`, {
    cache: "force-cache",
  });

  if (!res.ok) {
  }

  return await res.json();
}

export default async function Races() {
  const races = await getRaces();

  console.log(races);

  return (
    <ConfigProvider theme={theme}>
      <div></div>
    </ConfigProvider>
  );
}
