# SOS Beacon — Official Website & Showcase

> **Instant Personal Safety & Emergency Response Network**  
> One tap fires a piercing siren, broadcasts GPS coordinates to every guardian, and logs the incident — all from an Android phone that never phones home. 100% on-device, zero backend, $0 forever.

---

## 🚀 Live Launch & Deployment Options

This website is built with vanilla modern HTML5, CSS3, and JavaScript with **zero build steps required**. It is 100% ready to deploy to any static hosting provider.

### Option 1: GitHub Pages (Recommended for Open Source)
1. Push this folder to your GitHub repository (e.g., `trackizer/sos-beacon` or `sos-beacon-website`).
2. Go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Choose `main` branch and `/ (root)` folder, then click **Save**.
5. Your site is live in ~60 seconds!

### Option 2: Vercel
1. Install the Vercel CLI (`npm i -g vercel`) or connect your GitHub repository in the Vercel dashboard.
2. Run `vercel` in this folder.
3. Pre-configured headers and caching are already included in [`vercel.json`](./vercel.json).

### Option 3: Netlify
1. Connect your repository to Netlify or drag-and-drop this entire folder into the Netlify Drop dashboard.
2. Pre-configured security headers and caching are already included in [`netlify.toml`](./netlify.toml).

### Option 4: Cloudflare Pages
1. Connect your GitHub/GitLab repository.
2. Set Build command: *(leave empty)*, Output directory: `.` (root).

---

## 🛠 Local Development & Testing

To test the site locally:

```bash
# Using npm
npm start

# Or using Python
python -m http.server 3000

# Or using PHP
php -S localhost:3000
```

Open `http://localhost:3000` in your web browser.

---

## ⚙️ Customizing App Version & Download Links

Open [`assets/js/main.js`](./assets/js/main.js) and update the `CONFIG` block at the top:

```javascript
const CONFIG = {
  version: 'v1.2.0',
  releaseDate: 'September 2026',
  apkSize: '8.4 MB',
  apkFileName: 'SOS-Beacon-v1.2.0-release.apk',
  sha256: '9a7d8c4e5f6b1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
  githubUrl: 'https://github.com/trackizer/sos-beacon',
  downloadUrl: 'https://github.com/trackizer/sos-beacon/releases/latest/download/SOS-Beacon-release.apk'
};
```

All buttons, modal dialogs, checksum verification boxes, and download triggers will update automatically across the entire site.

---

## 📂 Project Architecture

```
website-sos becon/
├── index.html                  # Production website entrypoint (<25 KB, highly optimized)
├── manifest.json               # Progressive Web App manifest
├── robots.txt                  # Search engine crawl rules
├── sitemap.xml                 # Search engine indexation sitemap
├── package.json                # Local preview scripts
├── netlify.toml                # Netlify deployment configuration
├── vercel.json                 # Vercel deployment configuration
├── assets/
│   ├── css/
│   │   └── style.css           # Modular, tactical dark design system
│   ├── js/
│   │   ├── main.js             # Navigation, modal, simulator, and gallery logic
│   │   ├── siren-synth.js      # Native Web Audio API emergency siren synthesizer
│   │   └── helplines-data.js   # 30+ Country emergency helplines directory
│   └── images/
│       ├── screen-trigger.png  # The Beacon trigger screenshot
│       ├── screen-active.png   # Live dispatch broadcast screenshot
│       ├── screen-guardians.png# Guardians & Medical ID screenshot
│       ├── screen-helplines.png# Global helplines screenshot
│       ├── screen-settings.png # Emergency controls & oscillator screenshot
│       ├── screen-fakecall.png # Fake escape call screenshot
│       └── favicon.svg         # Tactical emergency shield favicon
├── sos-beacon-landing.html     # Original backup prototype (preserved)
└── README.md                   # Launch and documentation guide
```

---

## 🛡️ License

SOS Beacon is open-source software released under the [MIT License](https://opensource.org/licenses/MIT).
