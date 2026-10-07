# Divyansh — Portfolio

Personal portfolio built with **React + Vite**, **Three.js** (`@react-three/fiber` / `drei`), **Framer Motion** and **Tailwind CSS v4**.
Design inspired by [shaqdeff/Portfolio-Template](https://github.com/shaqdeff/Portfolio-Template) (MIT).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Updating content

All text lives in **`src/data/portfolio.js`** (name, bio, services, stats, skills, experience, projects, links).
Search for `TODO(Divyansh)` to find what still needs your input.

Images are picked up automatically, so just drop files into these folders (no code changes):

| Put files here | Used for |
|---|---|
| `src/assets/profile.webp` (or `.png` / `.jpg`) | About-section photo |
| `src/assets/screens/*.png` | Screens cycling on the 3D hero phone (sorted by filename: `01.png`, `02.png`, …) |
| `src/assets/logos/<id>.png` | Experience logos. `<id>` = the experience `id` (`techindika`, `revoltronx`, `insri`) |
| `src/assets/projects/<project-id>/*.png` | Project screenshots (sorted by filename). Add `icon.png` for the app icon |
| `public/resume/Divyansh_Resume.pdf` | "Download résumé" buttons |

Until real images are added, the site shows designed placeholders. Draft projects show a "Draft content" badge in dev mode only.

The root `/assets` folder holds your raw originals (photos, logos, resume). It's git-ignored; the web-ready copies live in `src/assets/` and `public/`. `public/og-image.png` is the 1200×630 link-preview image.

## Contact form (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. **Email Services → Add Service → Gmail**, then copy the **Service ID**.
3. **Email Templates → Create** (the default "Contact Us" template works). The site sends `{{name}}`, `{{email}}`, `{{title}}`, `{{time}}` and `{{message}}`. Set *Reply To* to `{{email}}`, then copy the **Template ID** from the template's *Settings* tab.
4. **Account → Public Key**, then copy it.
5. Copy `.env.example` to `.env` and fill in the three values. On Vercel, add the same variables under *Project → Settings → Environment Variables*.

Without keys, the form falls back to opening the visitor's email app.

## Deploy (free) on Vercel

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com), click **Add New → Project**, import the repo, and keep the defaults (Vite is auto-detected).
3. Add the EmailJS env vars, then deploy. Every `git push` redeploys automatically.

After the first deploy, add `og:image` / `og:url` meta tags in `index.html` with your live URL.
