import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const Subtitle = ({ subtitle }: { subtitle: string }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="text-gray-600 text-3xl" style={{ opacity }}>
      {subtitle}
    </div>
  );
};
