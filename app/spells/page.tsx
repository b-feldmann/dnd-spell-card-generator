import React from 'react';
import { Button, ConfigProvider } from 'antd';
import Link from 'next/link'

import theme from '../../theme/themeConfig';

async function getSpells() {
    const api = 'https://www.dnd5eapi.co/api/'
    const route = 'classes/cleric/spells'
    const res = await fetch(api + route)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export default async function Page() {
    const res = await getSpells()
    const spells = res.results

    const spellcard = (spell: any) => (
        <p>
            <Link href={'/spells/' + spell.name.toLowerCase().split(' ').join('-')}>
                <Button type="default">{spell.name}</Button>
            </Link>
        </p>
    )

    return (
        <ConfigProvider theme={theme}>
            <div>
                <h1>List of all Spells</h1>
                {spells.map((spell: any) => spellcard(spell))}
            </div>
        </ConfigProvider>
    )
}