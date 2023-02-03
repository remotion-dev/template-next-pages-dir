import { useCallback, useEffect, useState } from "react";
import { getProgress } from "../lambda/getProgress";
import { postMedia } from "../lambda/postMedia";
import { postStill } from "../lambda/postStill";

type State = {
  progress: number | undefined;
  status: "rendering" | "done" | "error";
  type: "still" | "media";
  url: string | undefined;
  price: number | null | undefined;
  renderId: string;
};

export const useLambda = (
  id: string,
  inputProps: unknown,
  refreshInterval = 1000
) => {
  const [state, setState] = useState<State>({
    progress: 0,
    status: "rendering",
    type: "still",
    url: "",
    price: 0,
    renderId: "",
  });

  const init = (type: "still" | "media") => {
    setState({
      price: undefined,
      progress: undefined,
      renderId: "",
      status: "rendering",
      type,
      url: undefined,
    });
  };
  const getUrl = (id: string) => `/api/lambda/view?id=${id}`;

  const renderStill = useCallback(async () => {
    if (status === "rendering") return alert("Already rendering");
    init("still");
    const result = await postStill(id, inputProps);
    if (!result) return setState((s) => ({ ...s, status: "error" }));
    setState({
      progress: 1,
      status: "done",
      type: "still",
      price: result.estimatedPrice.accruedSoFar,
      renderId: result.renderId,
      url: getUrl(result.renderId),
    });
  }, [id, inputProps]);

  const renderMedia = useCallback(async () => {
    if (status === "rendering") return alert("Already rendering");
    init("media");
    const result = await postMedia(id, inputProps);
    if (!result) return setState((s) => ({ ...s, status: "error" }));
    setState({
      price: null,
      progress: 0,
      status: "rendering",
      url: getUrl(result.renderId),
      renderId: result.renderId,
      type: "media",
    });
  }, [id, inputProps]);

  useEffect(() => {
    if (status === "rendering" && state.renderId && state.type === "media") {
      const interval = setInterval(async () => {
        try {
          const result = await getProgress(state.renderId);
          if (!result) return setState((s) => ({ ...s, status: "error" }));
          if (result.fatalErrorEncountered)
            setState((s) => ({ ...s, status: "error" }));
          setState((s) => ({
            ...s,
            price: result.costs.accruedSoFar,
          }));
          if (result.done) setState((s) => ({ ...s, status: "done" }));
          setState((s) => ({
            ...s,
            progress: s.status === "rendering" ? result.overallProgress : 1,
          }));
        } catch (e) {
          console.error(e);
          setState((s) => ({ ...s, status: "error" }));
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
    progress: state.progress,
    status,
    type: state.type,
    url: state.url,
    price: state.price,
    renderId: state.renderId,
  };
};
