import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { CompositionProps } from "../../types/constants";
import { NextLogo } from "./NextLogo";
import { RemotionLogo } from "./RemotionLogo";
import { Title } from "./Title";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React from "react";

export const FONT_FAMILY = fontFamily;
loadFont();

const spacer: React.CSSProperties = {
  width: 400,
};

const spacer2: React.CSSProperties = {
  margin: "2.5rem",
};

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
    <AbsoluteFill style={outer}>
      <div style={row}>
        <NextLogo></NextLogo>
        <div style={spacer}></div>
        <RemotionLogo></RemotionLogo>
      </div>
      <div style={spacer2} />
      <Title title={title} />
    </AbsoluteFill>
  );
};
