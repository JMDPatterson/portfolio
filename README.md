# Portfolio

Personal portfolio for James Patterson, built with Next.js and deployed to GitHub Pages at [jmdpatterson.com](https://jmdpatterson.com).

## Stack

- Next.js (static export), React, TypeScript
- Tailwind CSS, shadcn/ui (`button`, `card`, `badge`, `carousel`)
- semantic-release for versioning

## Development

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm lint
pnpm build
```

## Notes

- Project demos in `public/` are short, muted MP4s that only load and play when a card is active. Keep new media small (aim for a few MB per file).
- Type and lint errors fail the build.
