"use client";

import AutoSizer from "react-virtualized-auto-sizer";

export default function ScaleToRender({
  children,
  divider,
}: {
  children: React.ReactNode;
  divider: number;
}) {
  return (
    <AutoSizer
      style={{
        width: `auto`,
        height: "auto",
      }}
    >
      {({ height, width }) => {
        console.log(width);

        const containerWidth = divider === 0 ? width : width / divider;
        const cardWith = 300;
        const cardHeight = (cardWith / 2) * 3;

        const resizeFactor = (width: number) => {
          return width / cardWith;
        };

        return (
          <div
            style={{
              transform: `scale(${resizeFactor(containerWidth)})`,
              transformOrigin: "top left",
              // width: `${(cardWith / containerWidth) * 100}%`,
              width: `${cardWith}px`,
              height: `${cardHeight}px`,
            }}
          >
            {children}
          </div>
        );
      }}
    </AutoSizer>
  );
}
