<img src="https://github.com/remotion-dev/template-next/assets/1629785/9092db5f-7c0c-4d38-97c4-5f5a61f5cc098" />

This is a Next.js project for building programmatic video apps, with `@remotion/player` and `@remotion/lambda` built in.

<img src="https://github.com/remotion-dev/template-next/assets/1629785/c9c2e5ca-2637-4ec8-8e40-a8feb5740d88" />

## Getting Started

1. [Use this template](https://github.com/new?template_name=template-next&template_owner=remotion-dev) or type into your terminal:
   ```
   npx create-video --next
   ```
1. Copy the `.env.example` file to `.env` and fill in the values.
   Complete the [Lambda setup guide](https://www.remotion.dev/docs/lambda/setup) to get your AWS credentials.

1. Edit the `config.mjs` file to your desired Lambda settings.

1. Run `node deploy.mjs` to deploy your Lambda function and Remotion Bundle.

## Commands

Start the Next.js dev server:

```
npm run dev
```

Open the Remotion Studio:

```
npm run remotion
```

The following script will set up your Remotion Bundle and Lambda function on AWS:

```
node deploy.mjs
```

You should run this script after:

1. you changed the video template
2. you changed `config.mjs`
3. you upgraded Remotion to a newer version

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://remotion.dev/discord).

## Issues

Found an issue with Remotion? [File an issue here](https://remotion.dev/issue).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
