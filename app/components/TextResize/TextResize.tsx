"use client";

import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

const THRESHOLD = 0.01;

interface TextResizeProps {
  children: React.ReactNode;
  defaultFontSize?: number;
  minFontSize?: number;
  maxFontSize?: number;
  className?: string;
}

const TextResize = ({
  children,
  defaultFontSize = 16,
  minFontSize = 0,
  maxFontSize,
  className,
}: TextResizeProps) => {
  const childRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const clamp = (current: number, min?: number, max?: number) => {
    if (min && max) {
      return Math.max(min, Math.min(max, defaultFontSize));
    } else if (min) {
      return Math.max(min, defaultFontSize);
    } else if (max) {
      return Math.min(max, defaultFontSize);
    }
    return defaultFontSize;
  };

  const [active, setActive] = useState(false);
  const [fontSize, setFontSize] = useState(
    clamp(defaultFontSize, minFontSize, maxFontSize),
  );
  const [currentMax, setCurrentMax] = useState(maxFontSize);
  const [lastStep, setLastStep] = useState(fontSize);

  useEffect(() => {
    if (parentRef.current && childRef.current) {
      if (parentRef.current.clientHeight < childRef.current.clientHeight) {
        setCurrentMax(fontSize);
        setFontSize(Math.max(minFontSize, 0));
        setLastStep(Math.max(minFontSize, 0));
        setActive(true);
      } else if (
        parentRef.current.clientHeight > childRef.current.clientHeight
      ) {
        setCurrentMax(maxFontSize);
        setActive(true);
      }
    }
  }, [children, minFontSize, maxFontSize]);

  useEffect(() => {
    if (!active) return;

    const tooSmall: boolean =
      parentRef.current && childRef.current
        ? parentRef.current.clientHeight >= childRef.current.clientHeight
        : false;

    if (parentRef.current && childRef.current) {
      if (!tooSmall) {
        const newMax = fontSize;
        if (lastStep + THRESHOLD >= newMax) {
          setActive(false);
          setFontSize(lastStep);
          return;
        }

        setFontSize(lastStep + (newMax - lastStep) / 2);
        setCurrentMax(newMax);
      } else {
        if (!currentMax) {
          const tmp = fontSize;
          if (fontSize === lastStep) {
            setFontSize(fontSize + 1);
          } else {
            setFontSize(fontSize + (fontSize - lastStep) * 2);
          }
          setLastStep(tmp);
        } else {
          if (fontSize + THRESHOLD >= currentMax) {
            setActive(false);
            return;
          }
          setLastStep(fontSize);
          setFontSize(fontSize + (currentMax - fontSize) / 2);
        }
      }
    }
  }, [fontSize, active, minFontSize, maxFontSize, currentMax, lastStep]);

  const divClassConfig = {};
  // @ts-ignore
  divClassConfig[styles.textResize] = true;
  // @ts-ignore
  divClassConfig[className] = true;
  const divClass = classNames(divClassConfig);

  return (
    <div ref={parentRef} className={divClass}>
      <div
        className={styles.innerWrapper}
        style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize + 2}px` }}
        ref={childRef}
      >
        {children}
      </div>
    </div>
  );
};

export default TextResize;
