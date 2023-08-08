# Remotion NextJS example

### [EXAMPLE](https://remotion-next-example.vercel.app/)

This is a Next.js project that is using `@remotion/player` and `@remotion/lambda`. Using TailwindCSS and TypeScript.

## Getting Started

Copy the `.env.example` file to `.env` and fill in the values.
Complete the [Lambda setup guide](https://www.remotion.dev/docs/lambda/setup) to get your AWS credentials.

Change the lambda site name in `package.json` `scripts.lambda:site` to your site name

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
