async function getSpell(spellName: string) {
  const api = "https://www.dnd5eapi.co/api/";
  const route = "spells/" + spellName;

  console.log(api + route);

  const res = await fetch(api + route);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SpellCard({ spellName }: { spellName: string }) {
  const spell = await getSpell(spellName);

  console.log(spell);

  if (!spell) return <h1>loading...</h1>;

  const ordinalLevel = (level: number) => {
    if (level === 0) return "Cantrip";
    if (level === 1) return "1st-level";
    if (level === 2) return "2nd-level";
    if (level === 3) return "3rd-level";
    return `${level}th-level`;
  };

  const getAreaOfEffectDescription = (areaOfEffect: {
    type: string;
    size: string;
  }) => {
    if (!areaOfEffect) return "";
    const { type, size } = areaOfEffect;

    return type + " " + size;
  };

  const {
    name,
    level,
    school: { name: school },
    desc,
    higher_level,
    casting_time,
    duration,
    range,
    concentration,
    ritual,
    components,
    area_of_effect: areaOfEffect,
  } = spell;

  const levelAsText = ordinalLevel(level);
  const areaOfEffectDescription = getAreaOfEffectDescription(areaOfEffect);

  const spellType =
    level === 0 ? `${school} ${levelAsText}` : `${levelAsText} ${school}`;

  return (
    <div className="text-[100%] p-4 box-border font-sans w-72 aspect-[2/3] min-h-0 overflow-hidden border-2 border-solid border-indigo-600">
      <p className="mx-8 text-lg text-center font-semibold border-0 border-b-2 border-solid">
        {name}
      </p>
      <div className="text-sm leading-4">
        <div>{duration}</div>
        <div>{casting_time}</div>
        <div>{range + " " + areaOfEffectDescription}</div>
        <div>{components}</div>
      </div>

      <div className="text-sm leading-4">
        <p>{desc}</p>
        <h3>At Higher Levels:</h3>
        <p>{higher_level}</p>
      </div>

      <p>Concentration: {concentration ? "yes" : "no"}</p>
      <p>Ritual: {ritual ? "yes" : "no"}</p>
      <div>
        <p>{spellType}</p>
      </div>
    </div>
  );
}
