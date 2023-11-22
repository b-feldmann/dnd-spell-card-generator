import { Mirza } from "next/font/google";
import { Suspense } from "react";
import CastingTimeSvg from "../../../public/castingTime.svg";
import ComponentsSvg from "../../../public/components.svg";
import DamageSvg from "../../../public/damage.svg";
import DurationSvg from "../../../public/duration.svg";
import RangeSvg from "../../../public/range.svg";

// const CastingTimeSvg = React.lazy(
//   () => import("../../../public/castingTime.svg"),
// );

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
  content?: string | string[] | React.ReactNode;
  color?: string;
}) {
  return (
    <div className="-mt-0.5 flex">
      <p className="m-0 pr-1 pt-[1.5px]">
        <Suspense fallback={""}>
          {type === "duration" && <DurationSvg fill={color} />}
          {type === "range" && <RangeSvg fill={color} />}
          {type === "components" && <ComponentsSvg fill={color} />}
          {type === "casting-time" && <CastingTimeSvg fill={color} />}
          {type === "damage" && <DamageSvg fill={color} />}
        </Suspense>
      </p>
      <p className="m-0">
        <span className={mirzaLight.className}>{content}</span>
      </p>
    </div>
  );
}
