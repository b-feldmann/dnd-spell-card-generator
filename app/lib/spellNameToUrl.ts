export default function spellNameToUrl(name: string): string {
  return name.toLowerCase().split(/ |\//).join("-");
}
