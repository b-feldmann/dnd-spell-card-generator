export const spellCastingClasses = [
  "artificer",
  "bard",
  "cleric",
  "druid",
  "paladin",
  "ranger",
  "sorcerer",
  "warlock",
  "wizard",
] as const;

export const dndClasses = [
  ...spellCastingClasses,
  "barbarian",
  "fighter",
  "monk",
  "rouge",
] as const;

export const races = [
  "Dragonborn",
  "Darf-Hill",
  "Darf-Mountain",
  "Elf-Dark",
  "Elf-High",
  "Elf-Sea",
  "Elf-Wood",
  "Gnome-Deep",
  "Gnome-Forest",
  "Gnome-Rock",
  "Half-Elf",
  "Half-Orc",
  "Halfling-Lightfoot",
  "Halfling-Stout",
  "Human",
  "Human-Variant",
  "Tiefling",
  "Tortle",
  "Triton",
  "Yuan-ti",
] as const;
