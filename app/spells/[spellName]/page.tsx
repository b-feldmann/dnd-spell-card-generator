import SpellCard from "@/components/SpellCard/SpellCard";

export default async function Page({
  params,
}: {
  params: { spellName: string };
}) {
  const { spellName } = params;

  return <SpellCard spellName={spellName} />;
}
