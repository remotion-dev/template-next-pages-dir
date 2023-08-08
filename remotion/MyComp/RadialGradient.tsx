import React from "react";
import { AbsoluteFill } from "remotion";

const RadialGradient: React.FC<{
  threshold: number;
}> = ({ threshold }) => {
  const backgroundImage = `radial-gradient(circle at center, transparent ${
    threshold * 100
  }%, #eee ${threshold * 100}%, transparent ${(threshold + 0.2) * 100}%)`;

  return (
    <AbsoluteFill
      style={{
        backgroundImage,
      }}
    />
  );
};

export const MultiRadialGradient: React.FC<{
  outProgress: number;
}> = ({ outProgress }) => {
  const scale = 1 / (1 - outProgress);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
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
