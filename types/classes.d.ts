import { spellCastingClasses, dndClasses } from "./types";

export type SpellCastingClass = (typeof spellCastingClasses)[number];
export type DndClass = (typeof dndClasses)[number];
