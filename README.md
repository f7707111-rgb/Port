# kiki — Graphic Designer portfolio

Static site of kiki (Sergey, 18): Game Boy hero, what I do, Toolkit window, X banner and folders with chapter pages.
No build step — open `index.html` or deploy the folder to GitHub Pages as is.

## Structure

```
index.html                  home page
section.html                folder page (section.html?s=about|services|process|contact)
css/
  base.css                  global rules (hidden scrollbars)
  gameboy.css               Game Boy device
  site.css                  page sections, themes, X banner, footer
  components/software.css   "Toolkit" window
  components/folders.css    folders with hover lift
  pages/section.css         chapter page (sidebar + reading column)
js/
  data/translations.js      EN / RU strings (data-i18n keys)
  data/toolkit.js           apps in the Toolkit window
  data/sections.js          4 folders: about, services, process, contact (EN / RU)
  site/                     theme, language, Toolkit window, folders, scroll animations
  pages/section.js          renders one chapter on section.html
  gameboy/                  console engine + games loader
assets/
  fonts/                    AmeSans
  favicons/                 site icons
  icons/social/, icons/apps/
  images/sections/          pixel-art covers for the folders
  images/x-banner*.webp     pixel-art X banner
```

## Common edits

- Texts: `js/data/translations.js` (home) and `js/data/sections.js` (folder pages).
- Links (Telegram, YouTube, GitHub): search for the URL in `index.html`, `js/data/sections.js` and `section.html`.
- Add an app to Toolkit: copy a line in `js/data/toolkit.js`.
