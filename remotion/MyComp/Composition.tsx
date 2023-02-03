import { AbsoluteFill } from "remotion";
import { MyCompProps } from "../../types/MyComp";
import { NextLogo } from "./NextLogo";
import { RemotionLogo } from "./RemotionLogo";
import { Title } from "./Title";

export const MyComposition = ({
  title,
  subtitle,
  backgroundColor,
}: MyCompProps) => {
  return (
    <AbsoluteFill className="bg-white items-center justify-center">
      <div className="row flex items-center justify-conter">
        <NextLogo></NextLogo>
        <div style={{ width: 400 }}></div>
        <RemotionLogo></RemotionLogo>
      </div>
      <div className="m-10" />
      <Title title={title} />
    </AbsoluteFill>
  );
};
