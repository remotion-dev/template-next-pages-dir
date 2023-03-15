import React from "react";
import { State } from "../hooks/useLambda";

export const RenderStatus: React.FC<{
  state: State;
}> = ({ state }) => {
  return (
    <div>
      {state.status === "rendering" ? <div>{state.progress}</div> : null}
    </div>
  );
};
