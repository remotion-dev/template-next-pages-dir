import { Player } from "@remotion/player";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import { RenderStatus } from "../components/RenderStatus";
import { Input } from "../components/Input";
import { useLambda } from "../hooks/useLambda";
import { MyComposition } from "../remotion/MyComp/Composition";
import {
  CompositionProps,
  COMP_NAME,
  defaultMyCompProps,
} from "../types/constants";
import { InputContainer } from "../components/Container";
import { Button } from "../components/Button/Button";
import { Spacing } from "../components/Spacing";
import { z } from "zod";
import { ErrorComp } from "../components/Error";
import { AlignEnd } from "../components/AlignEnd";
import { DownloadButton } from "../components/DownloadButton";

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
};

const player: React.CSSProperties = {
  width: "100%",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  marginBottom: 40,
  marginTop: 60,
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
};

const Home: NextPage = () => {
  const [text, setText] = useState<string>(defaultMyCompProps.title);

  const props: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  const { renderMedia, state } = useLambda(COMP_NAME, props);

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
          <InputContainer>
            {state.status === "invoking" ? (
              <AlignEnd>
                <Button loading onClick={renderMedia} disabled>
                  Rendering video
                </Button>
              </AlignEnd>
            ) : state.status === "init" ? (
              <>
                <Input setText={setText} text={text}></Input>
                <Spacing></Spacing>
                <AlignEnd>
                  <Button onClick={renderMedia}>Render video</Button>
                </AlignEnd>
              </>
            ) : state.status === "rendering" ? (
              <RenderStatus state={state} />
            ) : state.status === "error" ? (
              <ErrorComp message={state.error.message}></ErrorComp>
            ) : state.status === "done" ? (
              <div>
                <DownloadButton
                  sizeInBytes={state.size}
                  url={state.url}
                ></DownloadButton>
              </div>
            ) : null}
          </InputContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
