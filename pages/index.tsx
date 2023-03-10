import { Player } from "@remotion/player";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import { RenderStatus } from "../components/RenderStatus";
import { Textarea } from "../components/Input";
import { useLambda } from "../hooks/useLambda";
import { MyComposition } from "../remotion/MyComp/Composition";
import { defaultMyCompProps, MyCompProps } from "../types/MyComp";

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
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
  const [text, setText] = useState<string>(defaultMyCompProps.title);

  const props: MyCompProps = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

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
        <div>
          <Textarea setText={setText} text={text}></Textarea>
          <div style={lower}>
            <button
              onClick={renderMedia}
              disabled={state.status === "rendering"}
              style={button}
            >
              Render
            </button>
            <RenderStatus state={state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
