# Remotion NextJS example

### [EXAMPLE](https://remotion-next-example.vercel.app/)

This is a NextJs project that is using `@remotion/player` and `@remotion/lambda`. Using tailwindcss and typescript.

## Getting Started

Copy the `.env.example` file to `.env` and fill in the values, you can get these values by following the [lambda setup guide](https://www.remotion.dev/docs/lambda/setup)

Change the lambda site name in `package.json` `scripts.lambda:site` to your site name

## Scripts

`yarn dev` - Starts the NextJs dev server

`yarn build` - Builds the NextJs app

`yarn start` - Starts the NextJs app

`yarn preview` - Opens Remotion preview 

` yarn render <YOUR COMPOSITION>` - Renders a composition

`yarn lambda:site` - Deploys new site to AWS (you have to do that every time you change the Root file or composition)

`yarn lambda:function` - Deploys new lambda function to AWS (you will need to update your env file with new function name)

