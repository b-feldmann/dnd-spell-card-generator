import { CSSProperties } from "react";

export default function CardDivider({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      id="eNwWmrdiAyM1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 100"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      className={className}
      style={style}
    >
      <line
        x1="-290.329539"
        y1="0"
        x2="290.329539"
        y2="0"
        transform="translate(320.215698 0)"
        fill="none"
        stroke="#3f5787"
        stroke-width="3"
      />
      <line
        x1="-290.329539"
        y1="0"
        x2="290.329539"
        y2="0"
        transform="translate(320.215698 10)"
        fill="none"
        stroke="#3f5787"
        stroke-width="3"
      />
      <ellipse
        rx="64"
        ry="36"
        transform="matrix(.104488 0 0 0.179752 320 160.910725)"
        fill="#d2dbed"
        stroke-width="0"
      />
      <ellipse
        rx="64"
        ry="36"
        transform="matrix(.055827 0 0 0.106607 305.733683 160.910725)"
        fill="#d2dbed"
        stroke-width="0"
      />
      <ellipse
        rx="64"
        ry="36"
        transform="matrix(.055827 0 0 0.106607 334.350784 160.910725)"
        fill="#d2dbed"
        stroke-width="0"
      />
    </svg>
  );
}
