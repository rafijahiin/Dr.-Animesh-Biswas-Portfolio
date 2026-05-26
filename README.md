# Dr. Animesh Biswas — Portfolio

Cinematic single-page portfolio site for Dr. Animesh Biswas, PhD (UNFPA Bangladesh).
A documentary in chapters, with a non-technical CMS for blog posts and image uploads.

## Stack

- **[Astro](https://astro.build/)** — static site generator
- **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** — admin panel at `/admin` (modern Decap CMS fork)
- **[Netlify](https://www.netlify.com/)** — hosting + Identity (email/password login) + Git Gateway
- **GSAP + ScrollTrigger** — scroll-driven scene animations (unchanged from original)
- **Vanilla WebGL + canvas** — hero, particles, custom cursor (unchanged from original)

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # → dist/
npm run preview      # serve the built site
```

## Project layout

```
.
├── public/
│   ├── admin/                  Sveltia CMS entry + config.yml
│   ├── assets/                 Original CSS, JS, fonts, images
│   └── uploads/                CMS-uploaded images go here
├── src/
│   ├── content/
│   │   ├── posts/              Blog markdown (Field Notes)
│   │   ├── gallery/            Photo entries (JSON)
│   │   └── publications/       Featured publications (JSON)
│   ├── data/
│   │   ├── stats.json          Editable numbers (Chapter 03)
│   │   ├── site.json           Contact info, social links
│   │   └── videos.json         YouTube channel settings
│   ├── layouts/Base.astro
│   ├── lib/youtube.ts          RSS feed fetcher (build-time)
│   ├── pages/
│   │   ├── index.astro         The 8-chapter documentary
│   │   └── field-notes/        Blog index + post pages
│   └── content/config.ts       Astro content-collection schemas
├── astro.config.mjs
├── netlify.toml
├── HOW-TO-PUBLISH.md           Non-technical guide for Dr. Biswas
└── package.json
```

## First-time deployment (one-time setup)

### 1. Push this branch to GitHub

```bash
git add -A
git commit -m "feat: Astro + Sveltia CMS rebuild, preserves documentary design"
git push -u origin cms-rebuild
```

Merge to `main` once happy.

### 2. Connect to Netlify

1. Sign up at [netlify.com](https://www.netlify.com) (free).
2. **Add new site → Import an existing project → GitHub**.
3. Pick this repo.
4. Build command: `npm run build` · Publish directory: `dist` (already in `netlify.toml`).
5. Deploy.

### 3. Enable Netlify Identity (so Dr. Biswas can log in)

In the Netlify dashboard:

1. **Site configuration → Identity → Enable Identity**.
2. **Registration preferences → Invite only**.
3. **External providers** — leave off (email/password is enough).
4. **Services → Git Gateway → Enable Git Gateway**.

### 4. Invite Dr. Biswas

1. **Identity → Invite users → enter his email**.
2. He receives a confirmation email → sets a password → can now log in at `/admin/`.

### 5. (Optional) Custom domain

When ready: **Site configuration → Domain management → Add custom domain → animeshbiswas.com**. Netlify handles SSL automatically.

## How content publishing works (architecturally)

1. Dr. Biswas logs in at `/admin/`.
2. He writes a post / uploads an image → Sveltia CMS commits the markdown/JSON file (and image) to the repo via Git Gateway.
3. Netlify detects the new commit → rebuilds the site → publishes within ~1–2 minutes.

No databases, no servers to maintain. Everything is in git, fully version-controlled and recoverable.

## For Dr. Biswas

See [HOW-TO-PUBLISH.md](./HOW-TO-PUBLISH.md) — a non-technical walkthrough.
