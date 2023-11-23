import { DamageTypes } from "@/types/spell";

export function spellNameToUrl(name: string): string {
  return name.toLowerCase().split(/ |\//).join("-").replace("'", "");
}

export const generateAtHigherLevel = (
  desc?: string[],
  atHigherLevel?: string[],
): { desc?: string[]; atHigherLevel?: string[] } => {
  if (!desc) return { desc, atHigherLevel };
  if (atHigherLevel && atHigherLevel.length > 0) return { desc, atHigherLevel };

  const higherLevelRegex =
    /(When you cas this spell using a spell slot of|(The|This) spell's damage increases by|(<b>)?At Higher Levels(<\/b>)?(\.|:))/g;
  const hasHigherLevel: number = desc.findIndex((line) =>
    line.match(higherLevelRegex),
  );

  if (hasHigherLevel === -1) return { desc, atHigherLevel };

  return {
    desc: desc.slice(0, hasHigherLevel),
    atHigherLevel: desc
      .slice(hasHigherLevel)
      .map((line) => line.replace(/(<b>)?At Higher Levels(<\/b>)?(\.|:)?/, "")),
  };
};

export const generateDamageType = (
  desc?: string[],
): DamageTypes | undefined => {
  if (!desc) return undefined;

  const damageTypeRegex =
    /(Acid|Bludgeoning|Cold|Fire|force|Lightning|Necrotic|Piercing|Poison|Psychic|Radiant|Slashing|Thunder) damage/gi;
  const damageLine = desc.find((line) => {
    return line.match(damageTypeRegex);
  });

  if (!damageLine) return undefined;
  const damageTypeMatches = damageLine.match(damageTypeRegex);

  return damageTypeMatches
    ? (capitalizeFirstLetter(
        damageTypeMatches[0].replace(" damage", ""),
      ) as DamageTypes)
    : undefined;
};

export const generateMaterial = (desc?: string[]): string | undefined => {
  if (!desc || desc.length === 0) return undefined;

  const materialRegex = /^\(.+\)/;
  const materialMatch = desc[0].match(materialRegex);
  return materialMatch ? materialMatch[0] : undefined;
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
