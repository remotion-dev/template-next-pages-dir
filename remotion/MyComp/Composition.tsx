import { AbsoluteFill } from "remotion";
import { MyCompProps } from "../../types/MyComp";
import { Logo } from "./Logo";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";

export const MyComposition = ({ name, backgroundColor }: MyCompProps) => {
  return (
    <AbsoluteFill className="bg-gray-100 items-center justify-center" style={{ backgroundColor }}>
      <div className="m-10" />
      <Logo />
      {name}
      <div className="m-3" />
      <Title />
      <Subtitle />
    </AbsoluteFill>
  );
};
