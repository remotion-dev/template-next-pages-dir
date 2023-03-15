import { Triangle } from "@remotion/shapes";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const RemotionAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const toCircle = spring({
    fps,
    frame: frame - 50,
    config: { damping: 200 },
  });

  const edgeRoundness = interpolate(toCircle, [0, 1], [0.71, Math.sqrt(2) - 1]);
  const color = interpolateColors(toCircle, [0, 1], ["#0b84f3", "#000"]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {new Array(3).fill(true).map((a, i) => {
        const spr = spring({
          fps,
          frame: frame - i * 2,
          config: {},
        });
        return (
          <AbsoluteFill
            key={i}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Triangle
              length={300 + i * interpolate(toCircle, [0, 1], [100, 0])}
              edgeRoundness={edgeRoundness}
              direction="right"
              fill={color}
              style={{
                opacity: i == 0 ? 1 : 0.3,
                marginLeft: interpolate(toCircle, [0, 1], [85 + i * 25, 0]),
                scale: 2 - spr + "",
              }}
            ></Triangle>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
