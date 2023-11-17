import { SpellCastingClass } from "@/types/classes";

const classToColor = (dndClass: SpellCastingClass) => {
    switch (dndClass) {
      case "bard":
        return "#AB6DAC";
      case "cleric":
        return "#91A1B2";
      case "druid":
        return "#7A853B";
      case "paladin":
        return "#B59E54";
      case "ranger":
        return "#507F60";
      case "sorcerer":
        return "#992E2E";
      case "warlock":
        return "#7B469B";
      case "wizard":
        return "#2A50A1";
    }
    return "black";
  };

  export default classToColor