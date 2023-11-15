"use client"

import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { useEffect, useState } from "react";
import SpellBook from "@/components/SpellBook";
import SpellList from "@/components/SpellList/SpellList";


export default function Home() {
  const [spells, setSpells] = useState<string[]>([])

  useEffect(() => {
    console.log('Spells are now: ', spells);
  }, [spells]);

  const addSpell = (spellName: string) => {
    console.log(spells)
    setSpells([...spells, spellName])
  }

  return (
    <ConfigProvider theme={theme}>
    <div>
      <div>
        <SpellList dndClass='cleric' onClick={(spell) => addSpell(spell)}/>
      </div>
      <div>
        {/* <SpellBook spellNames={spells} columns={4} /> */}
      </div>
    </div>
    </ConfigProvider>
  )
}
