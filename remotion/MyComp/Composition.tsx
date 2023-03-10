import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { CompositionProps } from "../../types/constants";
import { NextLogo } from "./NextLogo";
import { RemotionLogo } from "./RemotionLogo";
import { Title } from "./Title";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";

export const FONT_FAMILY = fontFamily;
loadFont();

const spacer: React.CSSProperties = {
  width: 400,
};

const spacer2: React.CSSProperties = {
  margin: "2.5rem",
};

export const MyComposition = ({ title }: z.infer<typeof CompositionProps>) => {
  return (
    <AbsoluteFill className="bg-white items-center justify-center">
      <div className="row flex items-center justify-conter">
        <NextLogo></NextLogo>
        <div style={spacer}></div>
        <RemotionLogo></RemotionLogo>
      </div>
      <div style={spacer2} />
      <Title title={title} />
    </AbsoluteFill>
  );
};
