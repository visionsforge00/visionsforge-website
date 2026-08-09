# VisionsForge Website — File Structure

Pehle sab kuch ek hi `index.html` file mein tha (HTML + CSS + JS mixed).
Ab code ko teen alag technologies ke hisab se split kar diya gaya hai,
taaki samajhna aur future mein edit karna aasaan ho.

## Folder Structure

```
site/
├── index.html              → Sirf HTML structure/content (page ka "skeleton")
├── robots.txt               → Google/search engines ko crawl permission deta hai
├── sitemap.xml               → Search engines ko site ke saare pages/sections batata hai
├── css/
│   └── style.css            → Saari styling (colors, layout, animations, responsive design)
└── js/
    ├── loader.js             → Page load hone par loading screen
    ├── navigation.js          → Nav bar scroll effect + hamburger (mobile) menu
    ├── background-canvas.js   → Background particle animation (dots/lines)
    ├── hero-canvas.js         → Hero section ka circuit-line animation
    ├── scroll-animations.js   → Scroll karne par elements fade-in hone wala effect + stats counters
    ├── world-clock.js         → India/US time zones wali live clock (hero section)
    ├── smooth-scroll.js       → Smooth scrolling (Lenis library) + scroll progress bar + back-to-top button
    ├── contact-form.js        → Contact form validation aur submit logic
    ├── magnetic-buttons.js    → Buttons ka "magnetic" hover effect
    └── chatbot.js              → Neeche wala AI-style chat widget
```

## Kaise Edit Karein

- **Colors/design change karna hai?** → `css/style.css` kholiye. Sabse upar
  `:root { --c1: ...; --c2: ...; }` mein brand colors set hain.
- **Kisi section ka text/content badalna hai?** → `index.html` mein wo section
  dhoondiye (jaise `<section id="services">`).
- **Kisi feature ka behavior badalna hai** (jaise hamburger menu, contact form,
  chatbot ke replies) → us feature ki apni `js/` file kholiye — file ka naam
  hi bata deta hai wo kya karti hai.

Har JS file independent hai — ek file mein change karne se doosri files par
asar nahi padta (jab tak dono same HTML element ko na chhuein).

## Deploy Kaise Karein

1. Poora `site/` folder apne hosting (jaise Hostinger, Netlify, Vercel, GitHub Pages)
   par upload kar dijiye, folder structure waisa hi rakhiye.
2. `robots.txt` aur `sitemap.xml` root URL par accessible hone chahiye:
   `visionsforge.in/robots.txt` aur `visionsforge.in/sitemap.xml`
3. Apna `logo.png` bhi isi root folder mein daal dijiye (jahan `index.html` hai).
4. Deploy hone ke baad, Google Search Console (search.google.com/search-console)
   mein jaakar sitemap submit kar dijiye — isse Google ko site jaldi mil jaati hai.

## Note

`index.html` mein saari links (`css/style.css`, `js/*.js`) **relative paths**
hain, isliye poora `site/` folder structure jaisa hai waisa hi rakhna zaroori
hai — agar files idhar-udhar move ki to links toot jaayenge.
