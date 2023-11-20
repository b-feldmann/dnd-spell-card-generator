import { SpellCastingClass } from "./classes";

export interface SpellAreaOfEffect {
  size?: number;
  type?: string;
}

export interface Damage {
  damage_type: ApiReference;
  damage_at_slot_level: { [key: string]: string };
}

export interface ApiReference {
  index: string;
  name: string;
  url: string;
}

export default interface Spell {
  name: String;
  desc?: string[];
  level: number;
  higher_level?: string[];
  casting_time?: string;
  range?: string;
  components?: string[];
  area_of_effect?: SpellAreaOfEffect;
  ritual?: boolean;
  duration?: string;
  concentration?: boolean;
  attack_type?: string;
  damage?: any;
  school: ApiReference;
  classes?: ApiReference[];
  subclasses?: ApiReference[];
  attack_type?: string;
  damage?: Damage;
}

export interface SpellListEntry {
  index: string;
  name: string;
  url: string;
}

export interface SpellAndClass {
  spell: string;
  dndClass: SpellCastingClass;
}
