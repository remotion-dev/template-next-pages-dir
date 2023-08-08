import React from "react";
import { AbsoluteFill } from "remotion";

export const RadialGradient: React.FC<{
  threshold: number;
}> = ({ threshold }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(circle at center, transparent ${
          threshold * 100
        }%, #eee ${threshold * 100}%, transparent ${(threshold + 0.2) * 100}%)`,
      }}
    ></AbsoluteFill>
  );
};

export const MultiRadialGradient: React.FC<{
  outProgress: number;
}> = ({ outProgress }) => {
  const distance = 1 / (1 - outProgress);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${distance})`,
      }}
    >
      <RadialGradient threshold={0.1}></RadialGradient>
      <RadialGradient threshold={0.3}></RadialGradient>
      <RadialGradient threshold={0.5}></RadialGradient>
      <RadialGradient threshold={0.7}></RadialGradient>
      <RadialGradient threshold={0.9}></RadialGradient>
    </AbsoluteFill>
  );
};
