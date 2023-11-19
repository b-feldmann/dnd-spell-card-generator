import { SpellCastingClass } from "./classes"

export interface SpellAreaOfEffect {
    size?: number
    type?: string
}

export interface Damage {
    damage_type: { index: string, name: string, url: string }; 
    damage_at_slot_level: { [key: string]: string; };
}

export default interface Spell {
    name: String,
    desc?: string[],
    level: number,
    higher_level?: string[],
    casting_time?: string,
    range?: string,
    components?: string[],
    area_of_effect?: SpellAreaOfEffect,
    ritual?: boolean,
    duration?: string,
    concentration?: boolean,
    attack_type?: string,
    damage?: any,
    school: {
        name: string,
    },
    classes?: {
        names: string
    }[],
    subclasses?: {
        name: string
    }[],
    attack_type?: string,
    damage?: Damage
}

export interface SpellListEntry { index: string; name: string; url: string }

export interface SpellAndClass { spell: string, dndClass: SpellCastingClass }