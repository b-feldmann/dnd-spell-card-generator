export interface SpellAreaOfEffect {
    size?: number
    type?: string
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
    }[]
}