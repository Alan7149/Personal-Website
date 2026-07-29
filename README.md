# Alan Babu — Portfolio

A bold, animation-heavy personal portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Deploys to **Vercel** with zero config.

## Sections
- **Hero** — animated intro, rotating roles, stats, social links
- **About** — bio + grouped skills
- **Projects** — cards for JARVIS, ZeoVPN, Khoya (with video/image, highlights, tech, links)
- **Experience** — vertical timeline
- **Websites** — sites you've launched
- **Contact** — working form backed by a Vercel serverless API route

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where to edit your content

All content lives in plain TypeScript files — no CMS needed:

| What | File |
| --- | --- |
| Name, bio, socials, skills, stats | `src/data/profile.ts` |
| Projects (add video/image/links) | `src/data/projects.ts` |
| Work experience + websites list | `src/data/experience.ts` |

**Add project media:** drop images in `public/projects/…` and set `image: "/projects/x.png"`, or set `video` to an `.mp4` URL or a YouTube **embed** URL (`https://www.youtube.com/embed/VIDEO_ID`).

## Contact form

The form posts to `src/app/api/contact/route.ts`, which validates and logs by default. To receive real emails, install [Resend](https://resend.com), add `RESEND_API_KEY` + `CONTACT_TO_EMAIL` to your env, and uncomment the Resend block in that file.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects **Next.js** — click **Deploy**. No env vars needed unless you enable email.

```bash
# or via CLI:
npm i -g vercel
vercel
```

## Build

```bash
npm run build && npm start
```
