# Naouali & Co, Website

A modern, multi-page website for Naouali & Co (Construction & Remodeling),
modeled on the layout, sections and feel of texasgreatestremodelers.com but
rebuilt in your own taupe + charcoal brand.

## 📁 What's here

```
naoualico/
├── index.html        ← Homepage (hero carousel, services, financing, process, testimonials, FAQ, contact)
├── about.html        ← Our story, values, why we're different
├── services.html     ← All 6 services in detail
├── financing.html    ← $0 down / 0% interest plans + financing FAQ
├── portfolio.html    ← Filterable project gallery + lightbox
├── contact.html      ← Free-quote form + contact info + map
├── styles.css        ← The whole design system (colors, layout, animations)
├── script.js         ← Carousel, scroll animations, accordion, gallery filter, form
├── static/
│   ├── logo.png      ← Your logo (currently the "no tagline, cropped" version)
│   └── images/       ← Your project photos
└── README.md         ← this file
```

## ▶️ See it on your computer

Double-click **`index.html`**, it opens in your browser. Click around the nav
to move between pages.

## 🎨 The design

- **Fonts:** Poppins (headings) + Inter (body), same Inter base the reference site uses.
- **Brand colors** live at the top of `styles.css` in the `:root { ... }` block
  (`--taupe`, `--charcoal`, `--sand`, etc.). Change them once and it updates everywhere.
- **Logo size:** controlled by `.brand-logo { height: 90px }` in `styles.css`.
- **Animations:** sections fade up on scroll; the hero rotates through 6 photos.

## ✅ Update before going live

Open the files in any text editor and replace these placeholders (they appear on
every page's contact section + footer):

1. **Phone**, search for `(346) 529-0909` and `tel:+13465290909`, put your real number
   (digits only in the `tel:` link, e.g. `tel:+15551234567`).
2. **Email**, currently `naoualico@gmail.com`. Change if you want a business email.
3. **Service area / address**, search for `9801 Westheimer Rd, Houston, TX 77042`.
4. **Map**, in `contact.html`, change `q=9801+Westheimer+Rd,+Houston,+TX+77042` in the Google Maps `iframe`
   to your real address to move the pin.
5. **Stats**, the "15+ years", "500+ projects" numbers in the trust bar.
6. **Social links**, the Instagram/Facebook links in the footer (`href="#"`).

> ⚠️ **About the marketing claims.** This site uses "$0 Down", "0% interest for 24
> months", "terms up to 180 months", "One Lifetime Warranty" and "pay when satisfied"
> (copied from the reference site at your request). Make sure these accurately reflect
> what your business actually offers before publishing, they're advertising claims.
> The customer testimonials are realistic **samples**, replace them with your real
> reviews when you have them.

## ✉️ Make the quote form email you (5 min, free)

The form is on the homepage and the Contact page. Connect it to free service
**Formspree** so submissions land in your inbox:

1. Go to **https://formspree.io** and sign up (free).
2. **+ New Form**, set the delivery email. Formspree gives you a URL like
   `https://formspree.io/f/abcdwxyz`.
3. In **both** `index.html` and `contact.html`, find:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   and replace `YOUR_FORM_ID` with your real ID.
4. Submit once to confirm the email Formspree sends you. Done.

> Free plan = 50 submissions/month.

## 🌐 Put it online (free)

**Netlify Drop:** go to **https://app.netlify.com/drop** and drag the whole
`naoualico` folder onto the page. It's live instantly at a free `*.netlify.app`
address. (Vercel, GitHub Pages, Cloudflare Pages all work the same way.)
Connect your own domain later in the host's settings.

## 🛠 Want changes?

- **Text** → edit the relevant `.html` file
- **Colors / logo size / spacing** → `styles.css` (`:root` block at the top)
- **Add photos** → drop them in `static/images/...` and copy a
  `<figure class="gallery-item">` line in `portfolio.html`

Just ask and I can make any of these for you.
