# Buying Hosting + Domain
### Simple step-by-step for Dr. Animesh Biswas's website

---

## What you need to buy

To make your website live on the internet permanently, you need **two things**:

| Thing | What it is | Yearly cost |
|---|---|---|
| **Hosting** | The server space where your website files live | ~BDT 2,500 – 4,000 |
| **Domain name** | Your website address (e.g. `animeshbiswas.com`) | ~BDT 1,200 – 1,500 |
| | **Total per year** | **~BDT 3,700 – 5,500** |

You pay yearly. You can cancel any time.

---

## Step 1: Buy the domain name

> A domain name is your address on the internet. You want **animeshbiswas.com** so people can type that into their browser and find you.

### Where to buy

I recommend **Namecheap** (international, reliable, English support):

1. Open https://www.namecheap.com in your browser.
2. In the big search box at the top, type: **animeshbiswas.com**
3. Click **Search**.
4. If it says "available" with a green tick → you can buy it.
   - If it says "taken" → try `dr-animesh-biswas.com` or `animeshbiswas.net`.
5. Click **Add to Cart**.
6. On the next screen:
   - ✅ **Whois Guard / Domain Privacy** — already FREE, leave it on (hides your address from the public).
   - ❌ Skip everything else (SSL, web hosting, email — you don't need those, they cost extra).
7. Click **Confirm Order**.
8. **Create an account** (only takes 2 minutes):
   - Email + password
   - Your name
   - Bangladesh address
9. **Payment**: pays with Visa/Mastercard/bKash via their international gateway. Cost: ~$12 USD (≈ BDT 1,400) for one year.
10. After payment, you OWN the domain for 1 year. Renew yearly.

### Alternative — buy from a Bangladeshi registrar

If you prefer paying in BDT directly:
- **ExonHost**: https://exonhost.com/domain-name-registration/ (~BDT 1,200/year)
- **Hostmight**: https://hostmight.com (~BDT 1,200/year)

Same process: search, add to cart, pay.

---

## Step 2: Buy hosting

> Hosting is the actual server where your website files live. Think of it as renting a house for your website.

### Recommended: ExonHost (Bangladesh-based, BDT payment)

1. Open https://exonhost.com/web-hosting/
2. They have several plans. Pick **"Starter"** or **"Personal"** plan.
   - Around **BDT 2,500 - 3,500 per year**.
   - Includes: enough storage, free SSL (the small lock icon), email hosting.
3. Click **Order Now**.
4. They'll ask: "Do you have a domain or do you want to buy one?"
   - You already bought one in Step 1 → choose **"I will use my existing domain"**.
   - Type your domain (e.g., `animeshbiswas.com`).
5. Continue to next step.
6. **Create account / log in** (similar to Namecheap).
7. **Payment**:
   - Pay via bKash, Visa, Mastercard, or bank transfer (whichever you prefer).
   - Cost: ~BDT 2,500-4,000 for one year.
8. After payment, ExonHost emails you:
   - **cPanel login** (a control panel for your hosting)
   - **Nameservers** — important! Look like `ns1.exonhost.com` and `ns2.exonhost.com`

### Alternatives

- **Hostmight**: similar pricing, similar process
- **Hostinger** (international, often discounted): ~$36/year ≈ BDT 4,000

---

## Step 3: Connect domain to hosting

This is technical but takes only 5 minutes.

1. Log into **Namecheap** (or wherever you bought the domain).
2. Click **Domain List** → find `animeshbiswas.com` → **Manage**.
3. Find the section **Nameservers**.
4. Change from "Namecheap Basic DNS" to **"Custom DNS"**.
5. Enter the two nameservers ExonHost (or your hosting provider) sent you:
   - `ns1.exonhost.com`
   - `ns2.exonhost.com`
6. Click **Save** (or the small green tick).
7. Wait **15 minutes to 4 hours** for the change to spread across the internet.

After this, when someone types `animeshbiswas.com`, they reach your hosting account.

---

## Step 4: Install WordPress on the hosting

ExonHost (and most Bangladeshi hosts) include a **1-click WordPress installer** called **Softaculous**.

1. Log into your hosting's **cPanel** (the link ExonHost sent you).
2. Look for the **Softaculous** icon or **WordPress** icon (usually has a blue and white "W").
3. Click **Install Now**.
4. Fill in the form:
   - **Domain**: select `animeshbiswas.com`
   - **Directory**: leave **blank** (so WordPress installs at the root)
   - **Site name**: Dr. Animesh Biswas
   - **Site description**: Public Health Scientist | Maternal Health Specialist | Storyteller
   - **Admin username**: pick something simple but not "admin" (use "animesh" or similar)
   - **Admin password**: pick a strong password — save it somewhere safe!
   - **Admin email**: your email address
5. Click **Install**.
6. Wait ~30 seconds. WordPress is now ready.
7. Visit `https://animeshbiswas.com/wp-admin/` and log in with the credentials you just made.

You'll see a blank WordPress site. This is where Rafi (or you with the migration plugin) will bring over the design we built.

---

## Step 5: Migrate the design from the test site

The test site (`https://dranimeshbiswas.s6-tastewp.com/`) has the complete design and content. We move it over using the **Backup Migration** plugin (already installed on the test site).

### Send this to Rafi to do for you:

1. He logs into the test site admin.
2. Goes to **Backup Migration** in the left menu → **Create Backup**.
3. After ~2 minutes, a backup file (about 30 MB) is created.
4. He downloads it to his computer.
5. He logs into your new live site admin (`animeshbiswas.com/wp-admin/`).
6. Installs the **Backup Migration** plugin.
7. Clicks **Restore Backup** → uploads the file.
8. After ~5 minutes the entire site is restored on your new domain.

Now `animeshbiswas.com` looks exactly like the test site we built.

### Last steps after migration

- **Change all old links**: in the new site, go to **Tools → Better Search Replace** (install plugin if needed). Replace `dranimeshbiswas.s6-tastewp.com` with `animeshbiswas.com`.
- **Reset SSL**: in cPanel, run **AutoSSL** so the small lock icon shows.

---

## Renewal — what happens after 1 year

- **Both hosting and domain are yearly subscriptions.**
- You'll get a renewal email ~1 month before they expire.
- Just click the renewal link and pay again to keep the site running.
- If you forget, the site goes offline. But you have 30 days "grace period" to renew.
- Set a reminder on your calendar: **renew website hosting + domain — June 2027**.

---

## Cost summary

| Year | Domain | Hosting | Total |
|---|---|---|---|
| 1st year (now) | BDT 1,400 | BDT 3,000 | **BDT 4,400** |
| Every year after | BDT 1,400 | BDT 3,000 | **BDT 4,400** |

That's about **BDT 12/day** to keep your website live forever.

---

## What if you can't / don't want to handle this

Tell Rafi. He can:
- Set up an account in **his name** and just charge you back.
- Or, run through each step with you on the phone / Zoom.

The whole process takes about **30 minutes**.

---

## Help

For any technical step: **Rafi Jahin** — `[contact]`
For ExonHost issues: their support chat at https://exonhost.com (24/7)
For Namecheap issues: https://www.namecheap.com/support/

---

*Last updated: 2026-05-27*
