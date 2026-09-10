# Content layout

This folder holds **authored source** for the site: MDX pages, gallery records, curation JSON, and the short README you are reading.

## Conventions

| Path | Purpose |
|------|---------|
| `blogposts/` | Blog posts (`*.mdx`). Front matter + body; listed and rendered via `lib/content` → `/blog`. |
| `projects/` | Project write-ups (`*.mdx`). Same pipeline → `/projects` and `/projects/[...slug]`. |
| `gallery/items/` | One YAML file per visualization for `/gallery`. Slug = filename. See `content/gallery/items/README.md`. |
| `config/` | Editorial site settings JSON (`popular-posts.json`, `home-mosaic.json`, **`gallery-settings.json`** categories + media base URL). Not MDX. |
| `content-schema.md` | Frontmatter / field shapes for MDX and gallery (JSDoc in code is also canonical). |

## Other roots (repo)

| Path | Purpose |
|------|---------|
| `public/` | Static assets (icons, images). URLs are `/…` from the site root. |
| `next.config.js`, `tailwind.config.js`, … | Tooling / framework config at the repo root (not editorial). |

Canonical projects live in `content/projects/`; gallery items in `content/gallery/items/`.

## Quarto-style analogy

- **Authoring** → `content/` (like `.qmd` / markdown projects).
- **Project-style config** → `content/config/` (lists and settings you keep out of prose).
- **Published static files** → `public/` only when something must be a plain HTTP file.

## Editing the gallery

1. Add or edit `content/gallery/items/your-slug.yaml` (see `content/gallery/items/README.md`).
2. Use categories from `content/config/gallery-settings.json` only.
3. Set `mediaBaseUrl` in `content/config/gallery-settings.json` (currently `https://witold1.github.io/witold1-blog-assets`) or override with `NEXT_PUBLIC_MEDIA_BASE_URL`. Use CDN-relative keys in YAML/MDX (e.g. `gallery/…/file.webp`).
4. Rebuild / redeploy.
