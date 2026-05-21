# BEATART Seminar Site

React + TypeScript + Tailwind CSS one-page seminar landing page.

## Local Development

1. Install Node.js LTS.
2. Open this folder in VS Code:

```txt
beatart-seminar-site
```

3. Install dependencies:

```bash
npm run setup
```

4. Start the local dev server:

```bash
npm run dev
```

5. Open:

```txt
http://127.0.0.1:5180/
```

## Windows / macOS Startup Flow

This project can live in Google Drive, but each computer should rebuild its own
local dependencies. `node_modules/` contains OS-specific native packages used by
Vite, Rollup, and esbuild, so a copy synced from macOS can break on Windows, and
the reverse can also happen.

First time on a device, or after switching devices:

```bash
npm run setup
```

Start the development site:

```bash
npm run dev
```

Check the local environment if the site does not start:

```bash
npm run doctor
```

If the project was synced from another OS and the local dependencies look wrong:

```bash
npm run clean:local
npm run setup
npm run dev
```

`node_modules/`, `dist/`, `.vite/`, and Vite log files are generated locally.
They are not cross-device source files, and they can be recreated at any time.

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```txt
beatart-seminar-site/
  public/
    images/
      Preview_BEATART_seminar.png
      hero_section_desktop.mp4
      hero_section_mobile.mp4
      beatart-logo.svg
      beatart-wordmark.svg
      icon_*.svg
      speaker-*.png
      viveoriginals-logo.png
  src/
    components/
      AccessButton.tsx
      AgendaSection.tsx
      CtaSection.tsx
      EventNoticeSection.tsx
      Footer.tsx
      HeroSection.tsx
      InfoStrip.tsx
      SectionHeading.tsx
      SpeakersSection.tsx
    data/
      seminarContent.ts
    App.tsx
    index.css
    main.tsx
  index.html
  package.json
  tailwind.config.ts
  vite.config.ts
```

## Content And Assets

- Edit visible copy in `src/data/seminarContent.ts`.
- Keep image and video files in `public/images`.
- Use SVG assets when available. PNG is used only for speaker portraits and partner logo because those source files are PNG.
- Desktop hero video: `/images/hero_section_desktop.mp4`
- Mobile hero video: `/images/hero_section_mobile.mp4`
- Visual reference: `/images/Preview_BEATART_seminar.png`

## MacBook Transfer Notes

For a clean VS Code workflow on macOS, the important source folders/files are:

```txt
public/
src/
index.html
package.json
package-lock.json
postcss.config.js
tailwind.config.ts
tsconfig.json
tsconfig.node.json
vite.config.ts
README.md
.gitignore
```

`node_modules/`, `dist/`, and `*.log` files are generated locally and do not need to be versioned.
