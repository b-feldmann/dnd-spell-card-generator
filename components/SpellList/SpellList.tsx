import { Button } from 'antd';
import Link from 'next/link';

async function getSpells(dndClass: string) {
    const res = await fetch(`https://www.dnd5eapi.co/api/classes/${dndClass}/spells`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export default async function SpellList({ dndClass, onClick }: { dndClass: "cleric" | "wizard" | "paladin" | "sorcerer", onClick: (spell: string) => void }) {
    const res = await getSpells(dndClass)
    const spells = res.results

    const spellcard = (spell: any) => (
        <p>
            <Button type="default" onClick={() => onClick(spell.name.toLowerCase().split(' ').join('-'))}>{spell.name}</Button>
        </p>
    )

    return (
        <div>
            <h1>List of all Spells</h1>
            {spells.map((spell: any) => spellcard(spell))}
        </div>
    )
}