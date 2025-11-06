# Design Guidelines - Titanium Implantes Corporate Homepage

## Design Approach
**Reference-Based Implementation**: Follow the provided reference images precisely. This is a corporate medical/healthcare website requiring professional credibility and trust-building through clean, authoritative design.

## Core Design Principles
- **Professional Authority**: Medical industry standards demand trustworthy, stable visual design
- **Content Clarity**: Information hierarchy prioritizes legibility and comprehension
- **Generous Spacing**: Corporate aesthetic with ample whitespace between all sections

## Color Palette
- **Primary Blue**: #002776 (deep corporate blue for headers, CTAs, accents)
- **White**: #FFFFFF (primary background, clean sections)
- **Light Gray**: #F5F5F5 to #E8E8E8 (alternating section backgrounds, subtle contrast)
- **Text**: Dark gray (#333333) for body copy, ensuring readability

## Typography System
- **Primary Font**: Modern sans-serif (Montserrat, Inter, or similar via Google Fonts)
- **Hierarchy**:
  - Main Headlines: Bold, 2.5rem-3rem desktop / 1.75rem-2rem mobile
  - Section Titles: Semibold, 2rem desktop / 1.5rem mobile
  - Body Text: Regular, 1rem with 1.6 line-height for readability
  - Navigation: Medium weight, 0.95rem
  - Footer Text: Regular, 0.875rem

## Layout System
**Spacing Units**: Use Tailwind spacing of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 to py-24 desktop, py-12 mobile
- Container max-width: max-w-7xl with px-6 horizontal padding
- Component gaps: 8-12 units between cards/columns

## Component Specifications

### Header
- Fixed position at top, white background with subtle shadow
- Logo aligned left (max height 60-70px)
- Horizontal navigation menu aligned right
- Include social media icons (Facebook, Instagram, LinkedIn) in far right
- Mobile: Hamburger menu pattern, full-width overlay navigation

### Hero Carousel
- Full-width (100vw), height 500-600px desktop / 400px mobile
- Auto-rotating 3 slides with 5-second intervals
- Navigation dots centered bottom, arrows on sides
- Smooth fade transitions between slides
- Overlay gradient (subtle dark overlay 20-30% opacity) for text legibility if needed

### Welcome Section
- Centered text layout, max-width of 800px
- Heading + 2-3 paragraph introduction
- Background: light gray for subtle contrast from carousel

### Product Categories
- 3-column grid desktop (grid-cols-3), single column mobile
- Each card: icon/image top, title below, brief description
- Equal height cards with subtle border or light shadow
- Hover state: slight lift effect (translate-y)
- Icons: 60-80px size, primary blue color

### CTA Section
- Full-width background in primary blue
- Large centered button: "Conheça nossos produtos"
- Button: white background, blue text, generous padding (px-12 py-4)
- White headline text above button

### Institutional Section (Quem Somos)
- Two-column layout: image left (40%), text right (60%) on desktop
- Stack vertically on mobile (image top, text below)
- Image: aspect ratio 4:3 or 16:9
- Text: heading + 2-3 paragraphs + "Saiba mais" link

### Footer
- Three-column layout desktop: Logo/Description | Navigation Links | Contact Info
- Background: dark blue (#002776), white text
- Include: Company logos row (partner/certification badges)
- Bottom bar: Copyright, privacy links
- Mobile: Stack columns vertically

## Image Strategy
**Placeholders Required**:
- Logo (SVG or PNG with transparency, ~200x60px)
- 3 carousel/banner images (1920x600px, optimized JPEGs)
- 3 category icons/images (square format, 300x300px minimum)
- 1 institutional section image (800x600px landscape)
- Partner/certification logos for footer (various sizes, transparent backgrounds)

**Image Treatment**: Professional photography with blue color grading to match brand. Avoid stock photos that feel generic.

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2-column where applicable)
- Desktop: > 1024px (full multi-column layouts)

## Accessibility & Interactions
- High contrast ratios (WCAG AA minimum)
- All interactive elements: clear focus states with blue outline
- Buttons: subtle scale transform on hover (scale-105)
- Links: underline on hover, blue color
- Carousel: pause on hover, keyboard navigation support
- Alt text for all images, semantic HTML5 tags

## Animation Principles
- **Minimal & Purposeful**: Avoid distracting motion
- Carousel transitions: smooth 0.5s fade
- Hover effects: quick 0.2s ease transforms
- Page load: optional subtle fade-in for sections (0.3s stagger)

This design creates a trustworthy, professional corporate presence while maintaining excellent usability and modern web standards.