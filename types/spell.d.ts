import { SpellCastingClass } from "./classes";

export interface Dnd5eSpellAreaOfEffect {
  size?: number;
  type?: string;
}

export interface Dnd5eDamage {
  damage_type: Dnd5eApiReference;
  damage_at_slot_level: { [key: string]: string };
}

export interface Dnd5eApiReference {
  index: string;
  name: string;
  url: string;
}

export interface Dnd5eSpell {
  name: string;
  desc?: string[];
  level: number;
  higher_level?: string[];
  casting_time?: string;
  range?: string;
  components?: string[];
  material?: string;
  area_of_effect?: Dnd5eSpellAreaOfEffect;
  ritual?: boolean;
  duration?: string;
  concentration?: boolean;
  school: Dnd5eApiReference;
  classes?: Dnd5eApiReference[];
  subclasses?: Dnd5eApiReference[];
  attack_type?: string;
  damage?: Dnd5eDamage;
}

export default interface Spell {
  name: string;
  desc?: string[];
  level: number;
  atHigherLevel?: string[];
  castingTime?: string;
  range?: string;
  components?: string[];
  material?: string;
  areaOfEffect?: string;
  ritual?: boolean;
  duration?: string;
  concentration?: boolean;
  school: string;
  damage?: DamageTypes;
}

export type DamageTypes =
  | "Acid"
  | "Bludgeoning"
  | "Cold"
  | "Fire"
  | "Force"
  | "Lightning"
  | "Necrotic"
  | "Piercing"
  | "Poison"
  | "Psychic"
  | "Radiant"
  | "Slashing"
  | "Thunder";

export interface SpellListEntry {
  name: string;
  url: string;
  level?: number;
  dndClass: SpellCastingClass;
}

export interface SpellAndClass {
  spell: string;
  dndClass: SpellCastingClass;
}
