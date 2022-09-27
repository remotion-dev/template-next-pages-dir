import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import React from "react";

export const Title = ({ title }: { title: string }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ opacity }} className="text-gray-700 text-5xl font-bold leading-relaxed">
      {title}
    </div>
  );
};
