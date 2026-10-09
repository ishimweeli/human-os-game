# Human OS — Self-discovery game

Mobile-friendly React/Vite experience for colleagues to explore eight themes inspired by Erik Erikson. 48 statements (six per theme), a private reflection profile, practical suggestions, and a QR code for a hosted URL.

## Run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. To create a production build:

```bash
npm run build
```

Deploy the `dist/` folder to Netlify, Vercel, Cloudflare Pages, or any static host. For Vercel/Netlify, you can also import this repository and use `npm run build` with output `dist`.

After deployment, open the public HTTPS website, select **Host / QR code**, and display the QR code to participants. No shared backend is needed. Responses remain in each participant's browser memory and are cleared on refresh. No answers are transmitted to the host or employer.

## Important

This is an **educational, unvalidated reflection activity**, not a psychological test, diagnostic instrument, or method for discovering someone's childhood. Erikson's developmental stages are a theoretical framework; adult patterns have many possible causes. The age ranges are approximate.

## Customization

- Questions, stage descriptions, and growth tips: `src/data.js`
- Theme/layout: `src/style.css`
- Game behavior and results: `src/main.jsx`
