import { Mirza } from "next/font/google";
import CastingTimeIcon from "../SVG/CastingTime";
import ComponentsIcon from "../SVG/Components";
import DamageIcon from "../SVG/Damage";
import DurationIcon from "../SVG/Duration";
import RangeIcon from "../SVG/Range";

const mirzaLight = Mirza({
  subsets: ["latin"],
  weight: "400",
});

export default function MetaInformation({
  type,
  content,
  color,
}: {
  type: "duration" | "range" | "casting-time" | "components" | "damage";
  content?: string | string[];
  color?: string;
}) {
  return (
    <div className="-mt-0.5 flex">
      <p className="m-0 pr-1 pt-[1.5px]">
        {type === "duration" && <DurationIcon style={{ fill: color }} />}
        {type === "range" && <RangeIcon style={{ fill: color }} />}
        {type === "components" && <ComponentsIcon style={{ fill: color }} />}
        {type === "casting-time" && <CastingTimeIcon style={{ fill: color }} />}
        {type === "damage" && <DamageIcon style={{ fill: color }} />}
      </p>
      <p className="m-0">
        <span className={mirzaLight.className}>{content}</span>
      </p>
    </div>
  );
}
