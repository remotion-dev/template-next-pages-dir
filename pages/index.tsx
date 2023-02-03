import { Player } from "@remotion/player";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { useLambda } from "../hooks/useLambda";
import { MyComposition } from "../remotion/MyComp/Composition";
import { defaultMyCompProps } from "../types/MyComp";

const Home: NextPage = () => {
  const [text, setText] = useState(JSON.stringify(defaultMyCompProps, null, 2));

  const props = useMemo(() => JSON.parse(text), [text]);

  const { renderMedia, state } = useLambda("MyComp", props);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-md m-auto mb-20">
        <Player
          component={MyComposition}
          inputProps={props}
          durationInFrames={120}
          fps={30}
          compositionHeight={1080}
          compositionWidth={1920}
          style={{
            width: "100%",
            borderRadius: 6,
            boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
            marginBottom: 40,
            marginTop: 60,
          }}
          controls
          autoPlay
          loop
        />
        <div className="grid grid-cols-2">
          <div
            style={{
              border: "1px solid #eaeaea",
              padding: 24,
              borderRadius: 6,
            }}
          >
            <textarea
              name="props"
              style={{
                border: "1px solid #eaeaea",
                resize: "none",
                lineHeight: 1.7,
                width: "100%",
                padding: "7px 10px",
                height: "100%",
                borderRadius: 6,
              }}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
            />
          </div>
          <div className=" flex flex-col items-center">
            <button
              onClick={renderMedia}
              disabled={state.status === "rendering"}
              className="rounded-lg bg-black text-white  px-4 py-2 m-2 disabled:bg-gray-400"
            >
              Render
            </button>
            {state.status && (
              <div className="w-full items-center flex flex-col">
                <p
                  className={`uppercase text-xl font-bold  ${
                    state.status === "done"
                      ? "text-green-500"
                      : state.status === "error"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {state.status}
                </p>
                {state.status === "rendering" ? (
                  <div className="h-8 w-full bg-gray-500 rounded-full overflow-hidden relative">
                    <div
                      className="h-full left-0 top-0 bg-green-400"
                      style={{ width: `${(state.progress ?? 0) * 100}%` }}
                    ></div>
                  </div>
                ) : null}
                {state.status === "done" ? <p>Price: {state.price}</p> : null}
                {state.status === "done" && (
                  <div className="text-green-500 space-x-4 uppercase">
                    <a
                      href={state.url}
                      target="_blank"
                      rel="noreferrer"
                      className=""
                    >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
