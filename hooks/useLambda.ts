import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import { getProgress, renderVideo } from "../lambda/api";
import { CompositionProps } from "../types/constants";

export type State =
  | {
      status: "init";
    }
  | {
      status: "invoking";
    }
  | {
      renderId: string;
      bucketName: string;
      progress: number;
      status: "rendering";
    }
  | {
      renderId: string | null;
      status: "error";
      error: Error;
    }
  | {
      url: string;
      size: number;
      status: "done";
    };

export const useLambda = (
  id: string,
  inputProps: z.infer<typeof CompositionProps>,
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
      const result = await renderVideo({ id, inputProps });

      setState({
        status: "rendering",
        progress: 0,
        renderId: result.renderId,
        bucketName: result.bucketName,
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
    if (state.status !== "rendering") {
      return;
    }
    const interval = setInterval(async () => {
      try {
        const result = await getProgress({
          id: state.renderId,
          bucketName: state.bucketName,
        });
        if (result.type === "error") {
          setState({
            status: "error",
            renderId: state.renderId,
            error: new Error(result.message),
          });
          return;
        }
        if (result.type === "done") {
          setState({
            size: result.size,
            url: result.url,
            status: "done",
          });
          return;
        }
        if (result.type === "progress") {
          setState({
            status: "rendering",
            bucketName: state.bucketName,
            progress: result.progress,
            renderId: state.renderId,
          });
        }
      } catch (e) {
        setState(() => {
          return {
            error: e as Error,
            renderId: state.renderId,
            status: "error",
          };
        });
      }
    }, refreshInterval);

    // TODO: If it takes long, then wait
    return () => {
      clearInterval(interval);
    };
  }, [refreshInterval, state]);

  return {
    renderMedia,
    state,
  };
};
