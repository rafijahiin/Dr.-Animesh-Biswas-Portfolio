# Pending fix — About Me page Practice Area cards

## Issue (you flagged this)

On the About Me page, the "Where I Focus My Work" Practice Area section has 4 cards arranged in a **2×2 grid**. At narrow viewport widths each card becomes too narrow, so the text wraps into ugly thin columns:

```
Maternal &
Perinatal Health

Evidence-based
strategies to reduce
maternal mortality at
community and facility
level — field-tested
across Bangladesh and
cited in global
guidance.

→ Community
  case-
  management
  protocols
```

## The fix

Replace the 2×2 grid with **4 wide cards stacked vertically** (one per row). Same pattern as the Work page role cards — icon inline next to title, then description, then a clean bullet list. Way more readable.

## How to apply (5 min, browser required)

### Option A — I do it tomorrow when you reopen Chrome

When Chrome is open with the Claude extension active and you're logged into the WP admin, just send "apply the about-page fix" and I'll run it.

### Option B — Apply yourself now via WPCode

1. Open `https://dranimeshbiswas.s6-tastewp.com/wp-admin/`.
2. Go to **Code Snippets → + Add Snippet → Add Your Custom Code (New Snippet)**.
3. **Code Type:** PHP Snippet.
4. Paste the code from `apply-fix-about.php` (in this folder).
5. Save and Activate.
6. Visit `/about-me/` — the cards will be redesigned.
7. Once you confirm it looks good, **deactivate the snippet** (it only needs to run once).

OR

### Option C — Apply via the Pages editor manually

1. **Pages → About Me → Edit**.
2. Find the "Where I Focus My Work" section (4 cards in a 2×2 grid).
3. Click each card → drag it out of its column → make all 4 cards top-level Group blocks (no columns wrapping them).
4. **Update**.

---

## Until then

The cards are functional but ugly on narrower viewports. On wide desktop (>1300px) they look OK. No action needed for tonight — it's a polish issue, not a broken page.

---

*Reference: see `apply-fix-about.html` in this folder for the exact HTML markup to paste into the About Me page if you want to fix it via the block editor directly.*
