import Link from "next/link";
import React from "react";
import { Button } from "./Button/Button";
import { Spacing } from "./Spacing";

const light: React.CSSProperties = {
  opacity: 0.6,
};

export const DownloadButton: React.FC<{
  url: string;
  sizeInBytes: number;
}> = ({ url, sizeInBytes }) => {
  const megabytes = Intl.NumberFormat("en", {
    notation: "compact",
    style: "unit",
    unit: "byte",
    unitDisplay: "narrow",
  }).format(sizeInBytes);

  return (
    <Link href={url}>
      <Button>
        Download video
        <Spacing></Spacing> <span style={light}>{megabytes}</span>
      </Button>
    </Link>
  );
};
