# BTL — Backyard Tennis League

A production-ready static website for Season 1 of BTL — Backyard Tennis League. The site displays current standings, ranking cards, player records, and a case-insensitive player search with personal stat cards.

## Tech stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Static data only
- Netlify-ready build settings

No backend, database, login, paid APIs, environment variables, analytics, authentication, or server functions are required.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your terminal.

## Build for production

```bash
npm run build
```

The production output is generated in `dist/`.

## Update scores

Player records are stored in [`src/data/standings.ts`](src/data/standings.ts).

Edit the `players` array to update wins and losses:

```ts
export const players = [
  { name: 'Roi', wins: 4, losses: 1 },
  { name: 'Gideon', wins: 1, losses: 1 },
];
```

The site automatically recalculates:

- Games played
- Win percentage
- Rankings
- Player status labels
- Highlight cards

If you update records, also update the `lastUpdated` value in the same file.

## Ranking rules

- Only players with at least 1 game are ranked.
- Ranked players are sorted by win percentage descending.
- Tie-breaker 1: more wins.
- Tie-breaker 2: fewer losses.
- Players with 0 games appear as `Unranked` at the bottom.

## Deploy to Netlify through GitHub

1. Push this repository to GitHub.
2. In Netlify, choose **Add new site** → **Import an existing project**.
3. Connect the GitHub repository.
4. Netlify will read `netlify.toml` and use:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy the site.

Because the project is fully static, Netlify's free static hosting flow is enough.
