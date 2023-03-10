import { useCallback, useEffect, useState } from "react";
import { getProgress } from "../lambda/getProgress";
import { postMedia } from "../lambda/postMedia";
import { MyCompProps } from "../types/constants";

export type State =
  | {
      status: "init";
    }
  | {
      status: "invoking";
    }
  | {
      renderId: string;
      progress: number;
      status: "rendering";
    }
  | {
      renderId: string | null;
      status: "error";
      error: Error;
    }
  | {
      renderId: string;
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

  const renderMedia = useCallback(async () => {
    setState({
      status: "invoking",
    });
    try {
      const result = await postMedia(id, inputProps);

      setState({
        status: "rendering",
        progress: 0,
        renderId: result.renderId,
      });
    } catch (err) {
      setState({
        status: "error",
        error: err as Error,
        renderId: null,
      });
    }
  }, [id, inputProps]);

  useEffect(() => {
    if (state.status === "rendering" && state.renderId) {
      const interval = setInterval(async () => {
        try {
          const result = await getProgress(state.renderId);
          if (result.fatalErrorEncountered) {
            setState({
              status: "error",
              renderId: state.renderId,
              error: new Error(result.errors[0].message as string),
            });
            return;
          }
          setState((s) => ({
            ...s,
            price: result.costs.accruedSoFar,
          }));
          if (result.done)
            setState({
              renderId: result.renderId,
              price: result.costs.accruedSoFar,
              status: "done",
              url: `/api/lambda/view?id=${id}`,
            });
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
    state,
  };
};
