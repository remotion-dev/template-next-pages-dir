import Link from "next/link";
import React from "react";
import { State } from "../helpers/use-rendering";
import { Button } from "./Button/Button";
import { Spacing } from "./Spacing";

const light: React.CSSProperties = {
  opacity: 0.6,
};

const Megabytes: React.FC<{
  sizeInBytes: number;
}> = ({ sizeInBytes }) => {
  const megabytes = Intl.NumberFormat("en", {
    notation: "compact",
    style: "unit",
    unit: "byte",
    unitDisplay: "narrow",
  }).format(sizeInBytes);
  return <span style={light}>{megabytes}</span>;
};

export const DownloadButton: React.FC<{
  state: State;
}> = ({ state }) => {
  if (state.status === "rendering") {
    return <Button disabled>Download video</Button>;
  }

  if (state.status !== "done") {
    throw new Error("Download button should not be rendered when not done");
  }

  return (
    <Link href={state.url}>
      <Button>
        Download video
        <Spacing></Spacing>
        <Megabytes sizeInBytes={state.size}></Megabytes>
      </Button>
    </Link>
  );
};
