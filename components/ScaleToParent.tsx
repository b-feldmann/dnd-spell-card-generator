"use client";

import { useRef } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import { CARD_HEIGHT, CARD_WIDTH } from './SpellCard/SpellCard';

export default function ScaleToParent({
  children
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null)

  const resizeFactor = (width: number) => width / CARD_WIDTH;

  return (
    <AutoSizer
      ref={ref}
      disableHeight
      className="min-h-0"
      style={{
        width: "auto",
        height: "auto",
      }}
      onResize={({ width }) => {
        if(ref?.current?.props?.style) {
          ref.current.props.style.width = `${width}px`
          ref.current.props.style.height = `${CARD_HEIGHT * resizeFactor(width)}px`
        }
      }}
    >
      {({ width }) => {
        console.log(width);

        return (
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
        );
      }}
    </AutoSizer>
  );
}
