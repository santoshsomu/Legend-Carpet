# Legend Carpet Services Website

A modern, responsive website for Legend Carpet Services - Melbourne's premier carpet cleaning and repair experts.

## 🌟 Features

### Design & UX
- **Modern Minimalistic Design** - Clean, professional layout with excellent visual hierarchy
- **Fully Responsive** - Optimized for all devices (desktop, tablet, mobile)
- **Accessibility Compliant** - WCAG 2.1 AA standards with keyboard navigation and screen reader support
- **Performance Optimized** - Fast loading with lazy loading and optimized assets

### Interactive Elements
- **Before/After Slider** - Interactive image comparison slider
- **Portfolio Gallery** - Interactive before/after gallery with lightbox modal
- **Service Pages** - Dedicated pages for each service with detailed information
- **Enhanced Buttons** - Modern gradient buttons with hover animations and shine effects
- **Mobile Menu** - Animated hamburger menu for mobile devices
- **Smooth Scrolling** - Enhanced navigation experience
- **Form Validation** - Real-time form validation with user feedback
- **File Upload Preview** - Visual feedback for uploaded images
- **Notification System** - Toast notifications for user actions

### Content Sections
- **Hero Section** - Compelling headline with call-to-action form
- **Trust Badges** - Social proof and credibility indicators
- **Services Grid** - Comprehensive service offerings with detailed descriptions
- **Why Choose Us** - Benefits and differentiators with before/after showcase
- **Testimonials** - Customer reviews with star ratings
- **Service Areas** - Geographic coverage with interactive map
- **Contact Section** - Multiple contact methods with detailed form
- **Portfolio Page** - Before/after gallery with interactive sliders and lightbox modal

## 🚀 Quick Start

1. **Download Files**
   - `index.html` - Main website structure
   - `portfolio.html` - Portfolio page with before/after gallery
   - `carpet-repair.html` - Carpet repair service page
   - `carpet-stretching.html` - Carpet stretching service page
   - `water-damage-restoration.html` - Water damage restoration service page
   - `carpet-cleaning.html` - Carpet cleaning service page
   - `carpet-installation.html` - Carpet installation service page
   - `upholstery-cleaning.html` - Upholstery cleaning service page
   - `style.css` - Complete styling and responsive design
   - `script.js` - Interactive functionality and animations
   - Image files (legend.png, before.jpeg, after.jpeg)
   - Portfolio images (portfolio/ folder with 10 before/after pairs)

2. **Upload to Web Server**
   - Upload all files to your web hosting directory
   - Ensure all files are in the same directory
   - Verify image paths are correct

3. **Customize Content**
   - Update contact information in the HTML
   - Replace placeholder images with your own
   - Modify service descriptions and pricing
   - Update Google Maps embed URL

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Laptop**: 1024px - 1199px
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎨 Design System

### Color Palette
- **Primary**: #1a365d (Deep Blue)
- **Secondary**: #2d5a87 (Medium Blue)
- **Accent**: #e53e3e (Red)
- **Text Dark**: #2d3748
- **Text Light**: #718096
- **Background Light**: #f7fafc

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body Text**: Inter (Google Fonts)
- **Icons**: Font Awesome 6.4.0

### Spacing System
- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)
- **2XL**: 4rem (64px)

## 🔧 Customization Guide

### Updating Contact Information
```html
<!-- Update phone number -->
<a href="tel:0416388777">0416 388 777</a>

<!-- Update email -->
<a href="mailto:info@legendcarpet.com.au">info@legendcarpet.com.au</a>

<!-- Update service areas -->
<div class="area-tags">
    <span>Your Suburb</span>
    <span>Another Suburb</span>
</div>
```

### Modifying Services
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <h3>Your Service Name</h3>
    <p>Service description...</p>
    <ul class="service-features">
        <li>Feature 1</li>
        <li>Feature 2</li>
    </ul>
    <a href="#contact" class="service-cta">Get Quote</a>
</div>
```

### Updating Google Maps
Replace the iframe src in the service areas section:
```html
<iframe 
    src="YOUR_GOOGLE_MAPS_EMBED_URL"
    width="100%" 
    height="400" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

## 📊 SEO Features

- **Meta Tags** - Complete SEO meta tags including Open Graph
- **Structured Data** - Schema markup for local business
- **Semantic HTML** - Proper heading hierarchy and semantic elements
- **Fast Loading** - Optimized images and minimal HTTP requests
- **Mobile First** - Google's preferred mobile-first indexing

## 🔒 Security Features

- **Form Validation** - Client-side and server-side validation
- **XSS Protection** - Input sanitization and output encoding
- **HTTPS Ready** - Secure connections for all external resources
- **Content Security Policy** - CSP headers for additional security

## 📈 Performance Optimizations

- **Lazy Loading** - Images load only when needed
- **Debounced Events** - Optimized scroll and resize handlers
- **Minified Assets** - Compressed CSS and JavaScript
- **Caching Headers** - Browser caching for static assets
- **Image Optimization** - WebP format support and responsive images

## 🎯 Analytics Integration

The website is ready for Google Analytics integration. Add your tracking code in the `<head>` section:

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

## 📞 Contact Form Integration

The contact forms are ready for backend integration. Current features:

- **Form Validation** - Real-time validation with visual feedback
- **File Upload** - Multiple image upload with preview
- **Success Messages** - User-friendly confirmation notifications
- **Spam Protection** - reCAPTCHA ready integration

## 🛠️ Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: 14+
- **Chrome Mobile**: 90+

## 📝 License

This website template is provided for Legend Carpet Services. All rights reserved.

## 🤝 Support

For technical support or customization requests, contact your web developer.

---

**Legend Carpet Services** - Professional carpet cleaning and repair services across Melbourne. Get your free quote today! 