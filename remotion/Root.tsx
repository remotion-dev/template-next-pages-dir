import { Composition } from "remotion";
import { Main } from "./MyComp/Main";
import { COMP_NAME, defaultMyCompProps } from "../types/constants";
import { NextLogo } from "./MyComp/NextLogo";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id={"NextLogo"}
        component={NextLogo}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
        defaultProps={defaultMyCompProps}
      />
    </>
  );
};
