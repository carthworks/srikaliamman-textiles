# Sri Kaliamman Textiles - Modern Business Website

A stunning, modern single-page website for Sri Kaliamman Textiles, a traditional textile company from Karur. This website features a premium design inspired by Atlas.in with clean layouts, smooth animations, and mobile-first responsive design.

## 🌟 Features

### Design & User Experience
- ✨ **Premium Modern Design** - Clean, image-driven layout with vibrant gradients
- 🌙 **Dark Mode Toggle** - Seamless light/dark theme switching with localStorage persistence
- 📱 **Fully Responsive** - Mobile-first design that works perfectly on all devices
- 🎨 **Smooth Animations** - AOS (Animate On Scroll) library for elegant transitions
- 🎯 **SEO Optimized** - Proper meta tags, semantic HTML, and structured content

### Sections
1. **Top Product Slider** - Full-width carousel showcasing key products
2. **Hero Section** - Two-column layout with compelling CTAs
3. **About Us** - Trust-building content with feature cards
4. **Products Section** - Horizontal slider with 6 product categories
5. **Why Choose Us** - 4 key benefits with icon cards
6. **Enquiry Form** - Client-side validated contact form
7. **Contact Section** - Address, phone, email, and Google Maps integration
8. **WhatsApp Integration** - Floating button with pre-filled messages

### Technical Features
- 🚀 **Bootstrap 5** - Modern, responsive framework
- 🎭 **Custom CSS Variables** - Easy theme customization
- ⚡ **Vanilla JavaScript** - No heavy frameworks, fast loading
- 🔍 **Form Validation** - Client-side validation with user-friendly alerts
- 📊 **Analytics Ready** - Event tracking hooks for Google Analytics
- ♿ **Accessibility** - ARIA labels, keyboard navigation, semantic HTML

## 📁 Project Structure

```
website/
├── index.html          # Main HTML file (single-page application)
├── styles.css          # Complete CSS design system
├── script.js           # JavaScript functionality
├── images/             # Product and hero images
│   ├── towels.jpg
│   ├── bedsheets.jpg
│   ├── terry.jpg
│   ├── hero.jpg
│   ├── mats.jpg
│   ├── pillows.jpg
│   └── custom.jpg
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Direct File Opening
1. Simply open `index.html` in any modern web browser
2. No server required for basic functionality

### Option 2: Local Development Server (Recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 🎨 Customization Guide

### 1. Update Business Information

**Contact Details** (in `index.html`):
- Line 358-360: Update phone numbers
- Line 365: Update email address
- Line 350: Update physical address
- Update WhatsApp number in all `wa.me/` links (search for `919876543210`)

**Company Name & Branding**:
- Line 31: Navbar brand name
- Line 8: Page title and meta description

### 2. Customize Colors

Edit CSS variables in `styles.css` (lines 8-20):

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #f59e0b;    /* Accent color */
    --accent-color: #8b5cf6;       /* Highlight color */
}
```

### 3. Update Products

Edit product cards in `index.html` (lines 170-260):
- Change product names
- Update WhatsApp enquiry messages
- Modify product descriptions

### 4. Replace Images

Place your images in the `images/` folder:
- `towels.jpg` - Towels product image
- `bedsheets.jpg` - Bedsheets product image
- `terry.jpg` - Terry products image
- `hero.jpg` - Hero section image
- `mats.jpg` - Mats and napkins image
- `pillows.jpg` - Pillow covers image
- `custom.jpg` - Custom orders image

**Recommended Image Sizes:**
- Hero/Slider images: 1920x1080px
- Product cards: 800x600px
- Hero section image: 1200x800px

### 5. Google Maps Integration

Update the Google Maps embed (line 345 in `index.html`):
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe

## 📧 Form Integration

The enquiry form currently shows a thank-you message. To receive actual submissions:

### Option 1: FormSpree (Easiest)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: EmailJS
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Add this to `script.js`:
```javascript
emailjs.send("service_id", "template_id", formData)
    .then(() => console.log('Email sent!'));
```

### Option 3: Backend API
Update the form submission in `script.js` (line 200) to send data to your server:
```javascript
fetch('/api/submit-enquiry', {
    method: 'POST',
    body: JSON.stringify(formData)
});
```

## 🌐 Deployment Options

### 1. Netlify (Recommended - Free)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)

### 2. Vercel (Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### 3. GitHub Pages (Free)
1. Create a GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Select main branch
5. Your site will be live at `username.github.io/repo-name`

### 4. Traditional Web Hosting
1. Upload all files via FTP/cPanel File Manager
2. Ensure `index.html` is in the root directory
3. Set proper file permissions (644 for files, 755 for directories)

### 5. Shared Hosting (cPanel)
1. Login to cPanel
2. Open File Manager
3. Navigate to `public_html`
4. Upload all files
5. Your site is live!

## 📱 Mobile Optimization

The website is fully optimized for mobile devices:
- Responsive breakpoints at 991px, 767px, and 576px
- Touch-friendly buttons and navigation
- Optimized images for faster loading
- Mobile-first CSS approach

## 🔧 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Tips

1. **Optimize Images:**
   - Use WebP format for better compression
   - Compress images using [TinyPNG](https://tinypng.com/)
   - Recommended max file size: 200KB per image

2. **Enable Caching:**
   Add to `.htaccess` (Apache):
   ```apache
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType image/jpg "access plus 1 year"
       ExpiresByType image/jpeg "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
       ExpiresByType text/css "access plus 1 month"
       ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

3. **Minify Files:**
   - Use [CSS Minifier](https://cssminifier.com/)
   - Use [JS Minifier](https://javascript-minifier.com/)

## 📊 Analytics Integration

### Google Analytics
Add before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel
Add after opening `<body>` tag:
```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🎯 SEO Checklist

- [x] Descriptive title tag
- [x] Meta description
- [x] Semantic HTML5 elements
- [x] Heading hierarchy (H1, H2, H3)
- [x] Alt text for images (add manually)
- [x] Mobile-friendly design
- [x] Fast loading speed
- [ ] Submit sitemap to Google Search Console
- [ ] Add robots.txt
- [ ] Add favicon

### Add Favicon
Place `favicon.ico` in root and add to `<head>`:
```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

## 🔒 Security Best Practices

1. **HTTPS:** Always use SSL certificate (free with Let's Encrypt)
2. **Form Protection:** Add CAPTCHA for spam prevention
3. **Content Security Policy:** Add CSP headers
4. **Regular Updates:** Keep dependencies updated

## 📞 Support & Contact

For customization requests or technical support:
- **Email:** info@srikaliammantextiles.com
- **Phone:** +91 98765 43210
- **Location:** Rayanur, Karur – 639003

## 📄 License

This website template is created for Sri Kaliamman Textiles. Feel free to modify and customize for your business needs.

## 🙏 Credits

- **Design Inspiration:** Atlas.in
- **Framework:** Bootstrap 5
- **Fonts:** Google Fonts (Inter, Playfair Display)
- **Icons:** Font Awesome 6
- **Animations:** AOS (Animate On Scroll)

---

**Built with ❤️ for Sri Kaliamman Textiles**

*Last Updated: December 2024*
