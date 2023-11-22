"use client";

import { useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { CARD_HEIGHT, CARD_WIDTH } from "./SpellCard/SpellRender";

export default function ScaleToParent({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);

  const resizeFactor = (width: number) => width / CARD_WIDTH;

  return (
    <AutoSizer
      ref={ref}
      style={{
        width: "auto",
        height: "auto",
      }}
      defaultWidth={2}
      defaultHeight={3}
      // onResize={({ width }) => {
      //   // @ts-ignore
      //   if (ref?.current?.props?.style) {
      //     // @ts-ignore
      //     ref.current.props.style.width = `${width}px`;
      //     // @ts-ignore
      //     ref.current.props.style.height = `${
      //       CARD_HEIGHT * resizeFactor(width)
      //     }px`;
      //   }
      // }}
    >
      {({ width }) => {
        return (
          <div
            style={{
              width: `${width}px`,
              height: `${CARD_HEIGHT * resizeFactor(width)}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${resizeFactor(width)})`,
                transformOrigin: "top left",
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
              }}
            >
              {children}
            </div>
          </div>
        );
      }}
    </AutoSizer>
  );
}
