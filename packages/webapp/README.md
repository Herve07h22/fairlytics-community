# Fairlytics web application

This is a [Next.js](https://nextjs.org/) project. It contains :
- the private dashboard `/<private key>` to get the analytics of a set of websites.
- some documentation mdx pages `/doc`.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running without the stack

When `ELASTIC_USERNAME` or `ELASTIC_PASSWORD` is missing from the environment, `adapters/index.ts`
wires in-memory adapters instead of the production ones : no Elasticsearch, no SQLite, no Mailgun.
The webapp then serves a demo dataset, so working on the dashboard only takes a `yarn dev`.

- The demo dashboard lives at [http://localhost:3000/demo](http://localhost:3000/demo).
  It holds two hosts : one with traffic, and one below the visibility threshold, listed as a hidden site.
- Its figures are derived from the selected period and are stable across reloads, so the period
  selector and the weekly/monthly aggregations can be exercised.
- Registering from `/api/register` prints the generated key on the server console instead of
  sending an email : its dashboard is then reachable at `/<private key>` until the server restarts.

Set both Elasticsearch variables to get the production adapters back.

