import { SpellAndClass } from "@/types/spell";

export const toSpellsAndClasses = (searchParams?: {
  [key: string]: string | string[] | undefined;
}) => {
  const selectedSearch = searchParams?.s;
  const spellQueries: string[] = selectedSearch
    ? Array.isArray(selectedSearch)
      ? selectedSearch
      : [selectedSearch]
    : [];

  const spellsAndClasses: SpellAndClass[] = spellQueries.map((spellQuery) => {
    const split: string[] = spellQuery.split("/");
    return { spell: split[0], dndClass: split[1] };
  }) as SpellAndClass[];

  return spellsAndClasses;
};
