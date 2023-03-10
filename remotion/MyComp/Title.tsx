import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import React, { useMemo } from "react";
import { fontFamily } from "@remotion/google-fonts/Inter";

const alwaysStyle: React.CSSProperties = {
  fontSize: 48,
  fontWeight: "bold",
};

export const Title = ({ title }: { title: string }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const style: React.CSSProperties = useMemo(() => {
    return { ...alwaysStyle, opacity, fontFamily };
  }, [opacity]);

  return <div style={style}>{title}</div>;
};
