import { useCallback, useEffect, useState } from "react";
import { getProgress } from "../lambda/getProgress";
import { postMedia } from "../lambda/postMedia";
import { postStill } from "../lambda/postStill";

type State =
  | {
      status: "init";
    }
  | {
      renderId: string | null;
      status: "error";
      type: "still" | "media";
      error: Error;
    }
  | {
      renderId: string;
      progress: number;
      status: "rendering";
      type: "still" | "media";
    }
  | {
      renderId: string;
      type: "still" | "media";
      url: string | undefined;
      price: number;
      status: "done";
    };

export const useLambda = (
  id: string,
  inputProps: unknown,
  refreshInterval = 1000
) => {
  const [state, setState] = useState<State>({
    status: "init",
  });

  const init = (type: "still" | "media") => {
    setState({
      status: "init",
    });
  };

  const getUrl = (id: string) => `/api/lambda/view?id=${id}`;

  const renderStill = useCallback(async () => {
    if (state.status === "rendering") {
      return alert("Already rendering");
    }
    init("still");
    const result = await postStill(id, inputProps);
    if (!result) {
      return setState((s) => ({
        status: "error",
        renderId: null,
        type: "still",
        // TODO: When catching
        error: new Error("Failed to render"),
      }));
    }

    setState({
      status: "done",
      type: "still",
      price: result.estimatedPrice.accruedSoFar,
      renderId: result.renderId,
      url: getUrl(result.renderId),
    });
  }, [id, inputProps, state.status]);

  const renderMedia = useCallback(async () => {
    if (state.status === "rendering") return alert("Already rendering");
    init("media");
    const result = await postMedia(id, inputProps);

    if (!result) {
      return setState((s) => {
        return {
          error: new Error("failed to render"),
          status: "error",
          renderId: null,
          type: "media",
        };
      });
    }
    setState({
      status: "rendering",
      progress: 0,
      renderId: result.renderId,
      type: "media",
    });
  }, [id, inputProps, state.status]);

  useEffect(() => {
    if (
      state.status === "rendering" &&
      state.renderId &&
      state.type === "media"
    ) {
      const interval = setInterval(async () => {
        try {
          const result = await getProgress(state.renderId);
          if (!result) {
            return setState((s) => ({
              status: "error",
              error: new Error("Failed to get progress"),
              renderId: state.renderId,
              type: "media",
            }));
          }
          if (result.fatalErrorEncountered)
            setState((s) => ({
              status: "error",
              renderId: state.renderId,
              type: "media",
              error: new Error(result.errors[0].message as string),
            }));
          setState((s) => ({
            ...s,
            price: result.costs.accruedSoFar,
          }));
          if (result.done)
            setState((s) => ({
              renderId: result.renderId,
              price: result.costs.accruedSoFar,
              status: "done",
              type: "media",
              url: getUrl(result.renderId),
            }));
          setState((s) => ({
            ...s,
            progress: s.status === "rendering" ? result.overallProgress : 1,
          }));
        } catch (e) {
          console.error(e);
          setState(() => {
            return {
              error: e as Error,
              renderId: state.renderId,
              type: "media",
              status: "error",
            };
          });
        }
      }, refreshInterval);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    renderMedia,
    renderStill,
    state,
  };
};
