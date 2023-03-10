import { useCallback, useEffect, useState } from "react";
import { getProgress } from "../lambda/getProgress";
import { postMedia } from "../lambda/postMedia";
import { postStill } from "../lambda/postStill";
import { MyCompProps } from "../types/constants";

export type State =
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
  inputProps: MyCompProps,
  refreshInterval = 1000
) => {
  const [state, setState] = useState<State>({
    status: "init",
  });

  const init = () => {
    setState({
      status: "init",
    });
  };

  const getUrl = (id: string) => `/api/lambda/view?id=${id}`;

  const renderStill = useCallback(async () => {
    if (state.status === "rendering") {
      return alert("Already rendering");
    }
    init();

    try {
      const result = await postStill(id, inputProps);

      setState({
        status: "done",
        type: "still",
        price: result.estimatedPrice.accruedSoFar,
        renderId: result.renderId,
        url: getUrl(result.renderId),
      });
    } catch (err) {
      setState({
        status: "error",
        error: err as Error,
        renderId: null,
        type: "still",
      });
    }
  }, [id, inputProps, state.status]);

  const renderMedia = useCallback(async () => {
    if (state.status === "rendering") return alert("Already rendering");
    init();
    try {
      const result = await postMedia(id, inputProps);

      setState({
        status: "rendering",
        progress: 0,
        renderId: result.renderId,
        type: "media",
      });
    } catch (err) {
      setState({
        status: "error",
        error: err as Error,
        renderId: null,
        type: "media",
      });
    }
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
          if (result.fatalErrorEncountered) {
            setState((s) => ({
              status: "error",
              renderId: state.renderId,
              type: "media",
              error: new Error(result.errors[0].message as string),
            }));
            return;
          }
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
