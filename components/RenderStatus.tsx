import React from "react";
import { State } from "../hooks/useLambda";

export const RenderStatus: React.FC<{
  state: State;
}> = ({ state }) => {
  return (
    <div>
      {state.status === "rendering" ? (
        <div>
          <div style={{ width: `${(state.progress ?? 0) * 100}%` }}></div>
        </div>
      ) : null}
      {state.status === "done" ? <p>Price: {state.price}</p> : null}
      {state.status === "done" && (
        <div>
          <a href={state.url} target="_blank" rel="noreferrer">
            Open
          </a>
          <a
            href={state.url}
            target="_blank"
            rel="noreferrer"
            download={state.renderId}
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};
