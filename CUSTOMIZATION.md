# Customization Checklist
## Sri Kaliamman Textiles Website

Use this checklist to customize the website for your business.

---

## 🔧 Essential Customizations (Must Do Before Launch)

### 1. Contact Information

**File:** `index.html`

- [ ] **WhatsApp Number** (Multiple locations)
  - Search for: `919876543210`
  - Replace with: Your WhatsApp number (country code + number, no spaces)
  - Locations: Lines 24, 27, 124, 127, 184, 196, 208, 220, 232, 244, 324

- [ ] **Email Address**
  - Search for: `info@srikaliammantextiles.com`
  - Replace with: Your business email
  - Location: Line 365

- [ ] **Phone Numbers**
  - Search for: `+91 98765 43210` and `+91 98765 43211`
  - Replace with: Your actual phone numbers
  - Locations: Lines 358-360

- [ ] **Physical Address**
  - Current: "Rayanur, Karur – 639003"
  - Update if different
  - Location: Line 350

### 2. Company Branding

**File:** `index.html`

- [ ] **Company Name** (if different)
  - Search for: `Sri Kaliamman Textiles`
  - Replace with: Your company name
  - Multiple locations throughout the file

- [ ] **Page Title**
  - Line 8: Update meta title
  - Line 9: Update meta description

- [ ] **Brand Icon** (Optional)
  - Line 31: Change emoji `🧵` to your preferred icon

### 3. Google Maps

**File:** `index.html`

- [ ] **Update Map Location**
  - Go to: https://www.google.com/maps
  - Search your business location
  - Click "Share" → "Embed a map"
  - Copy iframe code
  - Replace iframe at Line 345

---

## 🎨 Design Customizations (Optional)

### 4. Colors & Branding

**File:** `styles.css`

- [ ] **Primary Color** (Main brand color)
  - Line 8: `--primary-color: #2563eb;`
  - Change to your brand color

- [ ] **Secondary Color** (Accent color)
  - Line 10: `--secondary-color: #f59e0b;`
  - Change to complement your brand

- [ ] **Accent Color** (Highlights)
  - Line 11: `--accent-color: #8b5cf6;`
  - Change for variety

**Color Picker Tool:** https://coolors.co/

### 5. Typography

**File:** `index.html`

- [ ] **Change Fonts** (Optional)
  - Line 16-17: Google Fonts link
  - Browse fonts: https://fonts.google.com/
  - Update font families in `styles.css` (lines 31-32)

---

## 📸 Content Customizations

### 6. Product Information

**File:** `index.html`

**Product Cards** (Lines 170-260)

For each product, update:
- [ ] Product name (h3 tag)
- [ ] Product description (p tag)
- [ ] WhatsApp enquiry message
- [ ] Product image (if you have custom images)

**Example:**
```html
<div class="product-info">
    <h3>Your Product Name</h3>
    <p>Your product description</p>
</div>
```

### 7. About Section

**File:** `index.html`

- [ ] **Main Headline** (Line 110)
  - Update if needed: "Trusted Textile Manufacturers from Karur"

- [ ] **Description** (Lines 111-114)
  - Customize to match your business story

- [ ] **About Content** (Lines 153-159)
  - Update years of experience
  - Modify business description

### 8. Hero Slider Text

**File:** `index.html`

- [ ] **Slide 1** (Lines 47-48)
  - Headline: "Quality Terry & Textile Products"
  - Subtext: "From the Heart of Karur"

- [ ] **Slide 2** (Lines 54-55)
  - Headline: "Premium Bedsheets & Linens"
  - Subtext: "Crafted with Excellence"

- [ ] **Slide 3** (Lines 61-62)
  - Headline: "Wholesale Textile Solutions"
  - Subtext: "Direct from Manufacturer"

---

## 🖼️ Image Customizations

### 9. Replace Product Images

**Directory:** `images/`

Current images:
- [ ] `towels.jpg` - Replace with your towels image
- [ ] `bedsheets.jpg` - Replace with your bedsheets image
- [ ] `terry.jpg` - Replace with your terry products image
- [ ] `hero.jpg` - Replace with your factory/business image
- [ ] `mats.jpg` - Replace with your mats/napkins image
- [ ] `pillows.jpg` - Replace with your pillow covers image
- [ ] `custom.jpg` - Replace with custom orders image

**Recommended Image Sizes:**
- Hero/Slider: 1920x1080px
- Products: 800x600px
- Compress using: https://tinypng.com/

### 10. Add Favicon

- [ ] Create favicon at: https://favicon.io/
- [ ] Save as `favicon.ico` in root folder
- [ ] Add to `index.html` in `<head>` section:
  ```html
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  ```

---

## 📧 Form & Integration Setup

### 11. Contact Form Integration

**File:** `index.html` or `script.js`

Choose one option:

**Option A: FormSpree (Easiest)**
- [ ] Sign up at: https://formspree.io/
- [ ] Get your form ID
- [ ] Update form tag (Line 293):
  ```html
  <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  ```

**Option B: EmailJS**
- [ ] Sign up at: https://www.emailjs.com/
- [ ] Create email template
- [ ] Add EmailJS script to index.html
- [ ] Update script.js with service ID

**Option C: Custom Backend**
- [ ] Create your API endpoint
- [ ] Update form submission in script.js (Line 200)

### 12. Analytics Integration

**File:** `index.html`

**Google Analytics:**
- [ ] Create GA4 property: https://analytics.google.com/
- [ ] Get Measurement ID
- [ ] Add before `</head>` tag:
  ```html
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
  ```

**Facebook Pixel (Optional):**
- [ ] Get Pixel ID from Facebook Business
- [ ] Add pixel code after `<body>` tag

---

## 🎯 Advanced Customizations (Optional)

### 13. Add More Products

**File:** `index.html`

- [ ] Copy a product card (Lines 175-190)
- [ ] Paste in product slider section
- [ ] Update product details
- [ ] Add corresponding image to `images/` folder

### 14. Modify "Why Choose Us" Section

**File:** `index.html` (Lines 280-310)

- [ ] Update benefit titles
- [ ] Change descriptions
- [ ] Modify icons (Font Awesome icons)

**Icon Reference:** https://fontawesome.com/icons

### 15. Add Social Media Links

**File:** `index.html`

Add to footer or header:
```html
<div class="social-links">
    <a href="https://facebook.com/yourpage"><i class="fab fa-facebook"></i></a>
    <a href="https://instagram.com/yourpage"><i class="fab fa-instagram"></i></a>
    <a href="https://linkedin.com/company/yourpage"><i class="fab fa-linkedin"></i></a>
</div>
```

Style in `styles.css`:
```css
.social-links a {
    margin: 0 10px;
    font-size: 1.5rem;
    color: var(--primary-color);
}
```

### 16. Enable Dark Mode by Default

**File:** `script.js`

- [ ] Change Line 98:
  ```javascript
  const currentTheme = localStorage.getItem('theme') || 'dark'; // Changed from 'light'
  ```

### 17. Customize Form Fields

**File:** `index.html` (Lines 293-340)

- [ ] Add/remove form fields as needed
- [ ] Update dropdown options (Line 318-326)
- [ ] Modify validation in `script.js` (Lines 190-220)

---

## ✅ Pre-Launch Testing

### 18. Test All Functionality

- [ ] Test on Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Test on Mobile (iPhone Safari, Android Chrome)
- [ ] Test on Tablet
- [ ] Click all navigation links
- [ ] Test product slider (left/right buttons)
- [ ] Submit contact form (test validation)
- [ ] Click WhatsApp buttons (verify number is correct)
- [ ] Test dark mode toggle
- [ ] Verify all images load
- [ ] Check Google Maps loads correctly
- [ ] Test smooth scrolling

### 19. Performance Check

- [ ] Test page speed: https://pagespeed.web.dev/
- [ ] Compress images if needed
- [ ] Target: 90+ performance score

### 20. SEO Check

- [ ] Verify meta title and description
- [ ] Check all images have alt text
- [ ] Ensure heading hierarchy (H1, H2, H3)
- [ ] Test mobile-friendliness: https://search.google.com/test/mobile-friendly

---

## 🚀 Ready to Deploy?

Once you've completed the essential customizations:

1. **Review:** Go through the checklist above
2. **Test:** Test all functionality thoroughly
3. **Deploy:** Follow instructions in `DEPLOYMENT.md`
4. **Monitor:** Check analytics after launch

---

## 📝 Notes

**Keep track of your customizations:**

Date: _______________

Customizations made:
- [ ] _______________________________
- [ ] _______________________________
- [ ] _______________________________
- [ ] _______________________________

Deployment platform: _______________

Live URL: _______________

---

## 🆘 Need Help?

**Documentation:**
- README.md - Full documentation
- DEPLOYMENT.md - Deployment guide

**Support:**
- Email: info@srikaliammantextiles.com
- Phone: +91 98765 43210

---

*Last Updated: December 2024*
