# Remotion NextJS example

<img src="https://github.com/remotion-dev/template-next/assets/1629785/c9c2e5ca-2637-4ec8-8e40-a8feb5740d88" />

This is a Next.js project that is using `@remotion/player` and `@remotion/lambda`. Using TailwindCSS and TypeScript.

## Getting Started

Copy the `.env.example` file to `.env` and fill in the values.
Complete the [Lambda setup guide](https://www.remotion.dev/docs/lambda/setup) to get your AWS credentials.

Edit the `config.mjs` file to your desired Lambda settings.

Run `node deploy.mjs` to deploy your Lambda function and Remotion Bundle.

## Commands

Start the Next.js dev server:

```
npm run dev
```

Open the Remotion Studio:

```
npm run studio
```

The following script will set up your Remotion Bundle and Lambda function on AWS:

```
node deploy.mjs
```

You should run this script after:

1. you changed the video template
2. you changed `config.mjs`
3. you upgraded Remotion to a newer version
