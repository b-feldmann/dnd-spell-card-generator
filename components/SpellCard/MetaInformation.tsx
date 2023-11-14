import CastingTimeIcon from "../SVG/CastingTime";
import ComponentsIcon from "../SVG/Components";
import DurationIcon from "../SVG/Duration";
import RangeIcon from "../SVG/Range";

export default function MetaInformation({
  type,
  content,
}: {
  type: "duration" | "range" | "casting-time" | "components";
  content?: string | string[];
}) {
  return (
    <div className="flex -mt-0.5">
      <p className="pr-1 pt-[1.5px] m-0">
        { type === "duration" && <DurationIcon />}
        { type === "range" && <RangeIcon />}
        { type === "components" && <ComponentsIcon />}
        { type === "casting-time" && <CastingTimeIcon />}
      </p>
      <p className="m-0">{content}</p>
    </div>
  );
}
