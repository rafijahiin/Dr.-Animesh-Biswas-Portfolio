# WordPress Migration — Setup Guide

This guide takes you from zero to a fully working WordPress preview of Dr. Animesh's portfolio in ~30 minutes, on **free** hosting (TasteWP). Once confirmed, we move to paid hosting.

---

## Files in this folder

| File | Purpose |
|---|---|
| `animesh-content.wxr` | All current content (7 pages + 6 posts + categories) as WordPress import |
| `custom-style.css` | Theme styling — dark teal + cyan, paste into Customize → Additional CSS |
| `media-archive.zip` | Uploaded images, ready for Media Library bulk import |
| `media-mapping.md` | What caption + category each image should get |
| `SETUP-GUIDE.md` | This file |

---

## Stage A — Create the free WordPress sandbox (~3 minutes)

1. Go to **https://tastewp.com**
2. Click **"Sign up"** (top right) — free, no credit card. Use any email.
3. After signup, click **"Create site"**.
4. Configuration:
   - WordPress version: **Latest** (6.6+)
   - PHP version: **8.2**
   - **Pre-install plugins** — search and tick:
     - `Blocksy Companion` (theme add-on)
     - `Polylang` (Bengali/English support)
     - `Yoast SEO` (SEO basics)
     - `Modula` (filterable gallery)
     - `Smash Balloon — YouTube Feed` (auto-embed AniTap channel)
     - `Smush` (image compression)
   - **Pre-install theme**: `Blocksy`
5. Click **Create site**. Wait ~30 seconds.
6. TasteWP gives you a URL like `https://abc123.instawp.xyz/wp-admin/`. **Bookmark it.** Login auto-populates.

> Site lifetime: 7 days while logged in. If we get close to expiry, just click "Extend" in your TasteWP dashboard.

---

## Stage B — Configure the theme (~5 minutes)

In the WP admin:

1. **Appearance → Themes** → confirm **Blocksy** is active. If not, activate it.
2. **Appearance → Customize**:
   - **Site Identity**: Site Title = "Dr. Animesh Biswas". Tagline = "Global Health · UNFPA Bangladesh". Upload site icon (favicon) if you have one.
   - **General → Color Palette**: ignore for now, our CSS overrides this.
   - **General → Typography**: Body = Inter, Headings = Montserrat. Or leave default — CSS overrides this.
   - **Additional CSS**: open `custom-style.css` from this folder, copy ALL of it, paste here. Click **Publish**.
3. **Appearance → Customize → Header Builder**:
   - Add the **Menu** in the center.
   - Add **Social Icons** on the right.
   - Save.
4. **Appearance → Customize → Footer Builder**:
   - Add **Copyright** ("© 2026 Dr. Animesh Biswas") and **Social Icons**.

---

## Stage C — Import all content (~2 minutes)

1. **Tools → Import** in WP admin.
2. Find **WordPress** in the list → click **Install Now** → then **Run Importer**.
3. **Choose file** → select `animesh-content.wxr` from this folder.
4. Click **Upload file and import**.
5. On the next screen:
   - Assign all posts to author = **animesh** (or your admin user).
   - **Tick** "Download and import file attachments" (it'll fail to download since images are local — that's fine, we upload separately).
6. Click **Submit**.

Now check: **Pages** sidebar → you should see **7 pages**: About Me, Experience, Research, Travel Blog, Photography, My Story, Achievements.
**Posts** sidebar → **6 posts** (4 in Travel Blog, 1 in Stories, 1 in Poems categories).

---

## Stage D — Upload media (~3 minutes)

1. Extract `media-archive.zip` somewhere on your computer.
2. **Media → Add New** in WP admin.
3. Drag all extracted images into the upload area.
4. For each, click the image after upload and set:
   - **Caption** + **Alternative Text** per `media-mapping.md`
   - **Categories**: tick Public Health, Nature & Flowers, or Macro as appropriate.
5. Open **About Me** page → set **Featured Image** = Dr. Animesh's portrait.
6. Open **Travel Blog → Her Health, Her Right...** → set its featured image if you have a relevant photo.

---

## Stage E — Build the navigation menu (~3 minutes)

1. **Appearance → Menus**.
2. Click **Create a new menu** → name it "Main Menu".
3. Tick all 7 pages in the left "Pages" panel → click **Add to Menu**.
4. Drag to reorder: About Me · Experience · Research · Travel Blog · Photography · My Story · Achievements.
5. Tick **Display location → Primary Menu** → Save.

---

## Stage F — Connect section (social icons) (~2 minutes)

1. **Appearance → Customize → Header Builder → Socials** (or **Widgets → Footer**).
2. Click "+ Add Social Item" for each:

| Platform | URL | Icon |
|---|---|---|
| LinkedIn | `https://bd.linkedin.com/in/animeshb` | linkedin |
| ResearchGate | `https://www.researchgate.net/scientific-contributions/Animesh-Biswas-2229204850` | (use custom — Blocksy lets you upload SVG) |
| ORCID | `https://orcid.org/YOUR-ID` (Dr. Animesh to provide his ORCID ID) | (custom SVG) |
| YouTube | `https://www.youtube.com/@AniTapDoctorCouple` | youtube |
| Facebook | (Dr. Animesh's public page URL) | facebook |
| Email | `mailto:animeshbiswas@gmail.com` | envelope |

Save.

---

## Stage G — Configure the YouTube section (~2 minutes)

1. **Smash Balloon → YouTube Feed → Add Feed**.
2. Channel handle: `@AniTapDoctorCouple` or channel ID `UCoOqZpYGh3jwuJD-qVlkYaQ`.
3. Layout: **Grid**, 6 videos.
4. Copy the shortcode (looks like `[custom-facebook-feed feed=1]`).
5. **Pages → Travel Blog → Edit** → find the line where the YouTube feed should go → paste the shortcode.
6. Update.

---

## Stage H — Bengali language for stories (~2 minutes)

1. **Settings → Languages** (Polylang).
2. Add: **English** (primary) and **বাংলা (Bengali)**.
3. Open the post **মা** in Posts → set language = বাংলা. Save.
4. Open **First Night in Cox's Bazar** → set language = English. Save.

---

## Stage I — Photography page (Modula gallery) (~3 minutes)

1. **Modula → Add New Gallery** → name it "Public Health".
2. Add images from the Media Library that have the "Public Health" category.
3. Layout: **Custom Grid** or **Masonry**. Lightbox: ON.
4. Save → copy the shortcode (e.g. `[modula id="1"]`).
5. **Pages → Photography → Edit** → paste shortcode under the "Public Health" heading.
6. Repeat for Nature & Flowers and Macro categories.

---

## Stage J — Final review checklist

- [ ] All 7 pages render correctly
- [ ] Menu shows in the header
- [ ] About Me page has portrait + bio
- [ ] Research page lists publications
- [ ] Travel Blog page has the YouTube grid
- [ ] Photography page shows gallery
- [ ] Bengali post "মা" displays Bengali font correctly
- [ ] Social icons in footer link out
- [ ] Mobile view works (resize browser to check)

---

## What to send Rafi when ready

- TasteWP site URL (e.g. `https://abc123.instawp.xyz/`)
- Admin login (temporary — Dr. Animesh can revoke later)
- Tell me if anything looks off, I'll fix via the admin

---

## When ready for production (after Dr. Animesh approves)

1. Buy **ExonHost Starter** or **Hostmight Personal** (~BDT 2,500–4,000/yr).
2. Buy `animeshbiswas.com` from Cloudflare or Namecheap (~$12/yr).
3. In TasteWP: use the **Backup Migration** plugin (pre-installed) → export full site as zip.
4. In new host: install WordPress → install Backup Migration → import the zip.
5. Point `animeshbiswas.com` DNS to new host.
6. Set up redirect from `dranimeshportfolio.netlify.app` → new site so existing links don't break.

---

## Help

If a step fails or something looks wrong, send Rafi:
- A screenshot
- Which step you're on
- The error message if any
