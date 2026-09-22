# SOS BEACON— Official Website & Showcase

> **Instant Personal Safety & Emergency Response Network**  
> One tap fires a piercing siren, broadcasts GPS coordinates to every guardian, and logs the incident — all from an Android phone that never phones home. 100% on-device, zero backend, $0 forever.

---

## 🚀 Live Launch & Deployment Options

This website is built with vanilla modern HTML5, CSS3, and JavaScript with **zero build steps required**. It is 100% ready to deploy to any static hosting provider.

### Option 1: Cloudflare Pages (Direct GitHub Integration)
1. Push this repository to your GitHub account (see step-by-step commands below).
2. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository.
4. Set the build settings:
   - **Framework preset**: `None`
   - **Build command**: *(leave empty)*
   - **Build output directory**: `/` (or leave empty/root)
5. Click **Save and Deploy**.
6. Cloudflare Pages automatically configures global CDN caching, SSL, and security headers from [`_headers`](./_headers).

### Option 2: GitHub Pages
1. Go to **Settings > Pages** in your GitHub repository.
2. Under **Build and deployment > Source**, select **Deploy from a branch** (`main` / `/ (root)`).
3. Click **Save**.

### Option 3: Vercel or Netlify
- **Vercel**: Run `npx vercel` or connect via the Vercel dashboard.
- **Netlify**: Connect your GitHub repo or drag-and-drop into [Netlify Drop](https://app.netlify.com/drop).

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

SOS BEACONis open-source software released under the [MIT License](https://opensource.org/licenses/MIT).
