import { Player } from "@remotion/player";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import { useLambda } from "../hooks/useLambda";
import { MyComposition } from "../remotion/MyComp/Composition";
import { defaultMyCompProps } from "../types/MyComp";

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
};

const textareaContainer: React.CSSProperties = {
  border: "1px solid #eaeaea",
  padding: 24,
  borderRadius: 6,
};

const textarea: React.CSSProperties = {
  border: "1px solid #eaeaea",
  resize: "none",
  lineHeight: 1.7,
  width: "100%",
  padding: "7px 10px",
  height: "100%",
  borderRadius: 6,
};

const button: React.CSSProperties = {
  border: "none",
  borderRadius: "0.5rem",
  backgroundColor: "black",
  color: "white",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  margin: "0.5rem",
};

const player: React.CSSProperties = {
  width: "100%",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  marginBottom: 40,
  marginTop: 60,
  borderRadius: 6,
  overflow: "hidden",
};

const lower: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyItems: "center",
};

const Home: NextPage = () => {
  const [text, setText] = useState(JSON.stringify(defaultMyCompProps, null, 2));

  const props = useMemo(() => JSON.parse(text), [text]);

  const { renderMedia, state } = useLambda("MyComp", props);

  return (
    <div>
      <Head>
        <title>Remotion Next App</title>
        <meta name="description" content="A Remotion Next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={container}>
        <div className="cinematics">
          <Player
            component={MyComposition}
            inputProps={props}
            durationInFrames={120}
            fps={30}
            compositionHeight={720}
            compositionWidth={1280}
            style={player}
            controls
            autoPlay
            loop
          />
        </div>
        <div style={grid}>
          <div style={textareaContainer}>
            <textarea
              name="props"
              style={textarea}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
            />
          </div>
          <div style={lower}>
            <button
              onClick={renderMedia}
              disabled={state.status === "rendering"}
              style={button}
            >
              Render
            </button>
            {state.status && (
              <div className="w-full items-center flex flex-col">
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
