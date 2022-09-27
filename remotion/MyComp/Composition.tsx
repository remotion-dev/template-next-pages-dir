import { AbsoluteFill } from "remotion";
import { MyCompProps } from "../../types/MyComp";
import { Logo } from "./Logo";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";

export const MyComposition = ({ title, subtitle, backgroundColor }: MyCompProps) => {
  return (
    <AbsoluteFill className="bg-gray-100 items-center justify-center" style={{ backgroundColor }}>
      <div className="m-10" />
      <Logo />
      <div className="m-3" />
      <Title title={title} />
      <Subtitle subtitle={subtitle} />
    </AbsoluteFill>
  );
};
