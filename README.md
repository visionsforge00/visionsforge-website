# VisionsForge Website — File Structure

Previously everything lived in a single `index.html` file (HTML + CSS + JS
all mixed together). The code has now been split by technology into
separate, focused files so it's easier to understand and edit in the future.

## Folder Structure

```
site/
├── index.html              → HTML structure/content only (the page "skeleton")
├── robots.txt               → Tells search engines they're allowed to crawl the site
├── sitemap.xml               → Lists all pages/sections for search engines
├── blog/
│   ├── index.html            → Blog listing page (all articles show up here)
│   └── ai-automation-guide-for-small-business.html → First sample article
├── css/
│   ├── style.css             → All main site styling (colors, layout, animations, responsive design)
│   └── blog.css               → Blog listing/article-specific styling
└── js/
    ├── loader.js             → Loading screen shown while the page first loads
    ├── navigation.js          → Nav bar scroll effect + hamburger (mobile) menu
    ├── background-canvas.js   → Background particle animation (dots/lines)
    ├── hero-canvas.js         → Circuit-line animation in the hero section
    ├── scroll-animations.js   → Fade-in-on-scroll effect + stats counters
    ├── world-clock.js         → Live India/US time clock (hero section)
    ├── smooth-scroll.js       → Smooth scrolling (Lenis library) + scroll progress bar + back-to-top button
    ├── contact-form.js        → Contact form validation + submits leads to Google Sheets
    ├── magnetic-buttons.js    → "Magnetic" hover effect on buttons
    └── chatbot.js              → The AI-style chat widget at the bottom of the page
```

## "Book a Call" Buttons

The nav bar button and the Contact section both link to your live Google
Calendar Appointment Schedule:
`https://calendar.app.google/Fp5gyUbnzxqs9Qz2A`

If you ever want to change or replace this link, open `index.html`,
search for `calendar.app.google/Fp5gyUbnzxqs9Qz2A`, and replace both
occurrences (nav bar button + Contact section) with the new link.

## Adding a New Blog Post (Easy Way — No Code Editing)

Use `blog-generator.html` (included in this download, outside the `site/`
folder). Open it in any browser — it works offline, no internet needed.

1. Fill in the title, description, category, and content (simple rules: a
   line starting with `##` becomes a heading, lines starting with `-` become
   a bullet list, a blank line starts a new paragraph).
2. Click **Generate**. You'll get:
   - A ready `.html` file to download
   - A snippet to paste into `blog/index.html`
   - A snippet to paste into `sitemap.xml`
3. Upload the downloaded file into `site/blog/`.
4. Open `site/blog/index.html`, find the line
   `<!-- NEW POSTS: PASTE ABOVE THIS LINE -->`, and paste the card snippet
   right above it.
5. Open `site/sitemap.xml`, find the same marker comment, and paste the
   sitemap snippet above it.
6. Redeploy the `site/` folder.

No other file needs to be touched.

## Adding a New Blog Post (Manual Way)

1. Duplicate `blog/ai-automation-guide-for-small-business.html` and rename it
   (use short, keyword-relevant filenames, e.g. `crm-vs-spreadsheet.html`).
2. Update the `<title>`, `<meta name="description">`, canonical URL, Open
   Graph tags, and the JSON-LD `Article` block at the top with the new
   post's details.
3. Replace the content inside `<div class="article-body">` with the new
   article (use `<h2>`/`<h3>` for section headings, `<p>` for paragraphs).
4. Add a matching card in `blog/index.html` inside `.blog-grid`, above the
   `<!-- NEW POSTS: PASTE ABOVE THIS LINE -->` marker.
5. Add the new page's URL to `sitemap.xml`, above the same marker comment.

## How to Edit

- **Want to change colors/design?** → Edit `css/style.css` (the readable
  source file) — **not** `css/style.min.css`. After editing, regenerate the
  minified version (ask me to do this, or run it through any CSS minifier)
  since the live pages actually load `style.min.css` for faster performance.
- **Want to change a section's text/content?** → Find that section in
  `index.html` (e.g. `<section id="services">`).
- **Want to change a feature's behavior** (hamburger menu, contact form,
  chatbot replies, etc.) → open its dedicated file inside `js/` — the file
  name tells you exactly what it does.

Each JS file is independent — editing one won't affect the others (unless
both touch the same HTML element).

## Contact Form → Google Sheets

The contact form (`js/contact-form.js`) sends every submission to a Google
Apps Script Web App, which writes it as a new row in a Google Sheet. The
`SCRIPT_URL` constant near the top of that file holds the deployment URL.

If you ever need to point it to a different sheet:
1. Deploy a new Apps Script Web App (Deploy → New deployment → Web app,
   execute as "Me", access "Anyone").
2. Copy the new `.../exec` URL.
3. Replace the `SCRIPT_URL` value in `js/contact-form.js`.

## How to Deploy

1. Upload the entire `site/` folder to your hosting (Vercel, Netlify,
   Hostinger, GitHub Pages, etc.), keeping the folder structure intact.
2. Make sure `robots.txt` and `sitemap.xml` are reachable at the root URL:
   `visionsforge.in/robots.txt` and `visionsforge.in/sitemap.xml`.
3. Put your `logo.png` in the same root folder as `index.html`.
4. After deploying, submit the sitemap in Google Search Console
   (search.google.com/search-console) so Google finds the site faster.

## Note

Every link inside `index.html` (`css/style.css`, `js/*.js`) uses a
**relative path**, so the `site/` folder structure must stay exactly as-is —
moving files around will break those links.
