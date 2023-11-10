import React from "react";

import theme from "../../../theme/themeConfig";
import { ConfigProvider } from "antd";
import SpellCard from "@/app/components/SpellCard";
import ScaleToParent from "@/app/components/ScaleToParent";

export default async function Page() {
  return (
    <ConfigProvider theme={theme}>
      <div className="grid grid-cols-3 gap-4">
        <ScaleToParent divider={3}>
          <SpellCard spellName="guidance" />
        </ScaleToParent>
       
        <ScaleToParent divider={3}>
          <SpellCard spellName="sacred-flame" />
        </ScaleToParent>
      
        {/* 
         <ScaleToParent divider={3}>
          <SpellCard spellName="light" />
        </ScaleToParent>
          <ScaleToParent divider={3}>
          <SpellCard spellName="thaumaturgy" />
        </ScaleToParent>
        <ScaleToParent divider={3}>
          <SpellCard spellName="bless" />
        </ScaleToParent>
        <ScaleToParent divider={3}>
          <SpellCard spellName="burning-hands" />
        </ScaleToParent> */}
    {/*     <SpellCard spellName="command" />
        <SpellCard spellName="create-or-destroy-water" />
        <SpellCard spellName="faerie-fire" />
        <SpellCard spellName="guiding-bolt" />
        <SpellCard spellName="flaming-sphere" />
        <SpellCard spellName="hold-person" />
        <SpellCard spellName="scorching-ray" />
        <SpellCard spellName="spiritual-weapon" /> */}
      </div>
    </ConfigProvider>
  );
}
