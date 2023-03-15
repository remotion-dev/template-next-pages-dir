import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { CompositionProps } from "../../types/constants";
import { NextLogo } from "./NextLogo";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React from "react";
import { MultiRadialGradient } from "./RadialGradient";

export const FONT_FAMILY = fontFamily;
loadFont();

const outer: React.CSSProperties = {
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
};

const row: React.CSSProperties = {
  flexDirection: "row",
  display: "flex",
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill style={outer}>
        <div style={row}>
          <NextLogo></NextLogo>
        </div>
      </AbsoluteFill>
      <MultiRadialGradient></MultiRadialGradient>
    </AbsoluteFill>
  );
};
