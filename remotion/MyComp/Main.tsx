import { z } from "zod";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CompositionProps } from "../../types/constants";
import { NextLogo } from "./NextLogo";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React from "react";
import { MultiRadialGradient } from "./RadialGradient";

export const FONT_FAMILY = fontFamily;
loadFont();

const logoContainer: React.CSSProperties = {
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: 60,
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={logoContainer}>
        <NextLogo outProgress={logoOut}></NextLogo>
      </AbsoluteFill>
      <MultiRadialGradient outProgress={logoOut}></MultiRadialGradient>
    </AbsoluteFill>
  );
};
