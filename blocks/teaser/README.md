# Teaser Block

A flexible, engaging preview component for promoting postal services, news, and marketing content.

## Overview

The Teaser Block is designed to create compelling content previews that drive user engagement and conversions. It features a clean, modern design with responsive layouts and accessibility compliance.

## Authorable Fields

The teaser block uses exactly 5 rows in da.live authoring:

1. **Header** (Row 1): Main headline text
2. **Description** (Row 2): Supporting description text  
3. **Image** (Row 3): Hero image (img element)
4. **CTA Link** (Row 4): Destination URL
5. **CTA Text** (Row 5): Button text

## Sample Content Structure

```
| Field | Sample Value |
|-------|--------------|
| header | "Teaser Header" |
| description | "Teaser Description" |
| image | [Rocket dial performance image] |
| ctaLink | "https://www.google.com" |
| ctaText | "Go here to google" |
```

## Visual Output

The teaser renders as a card-style component with:
- Image on the left (50% width)
- Content on the right (50% width) containing:
  - Header (h3 element)
  - Description (paragraph)
  - CTA button

### Responsive Behavior
- **Desktop**: Side-by-side layout
- **Mobile**: Stacked layout with image on top

## CSS Classes

### Base Classes
- `.teaser` - Main container
- `.teaser__image` - Image container
- `.teaser__content` - Content container
- `.teaser__header` - Header text
- `.teaser__description` - Description text
- `.teaser__cta` - Call-to-action button

### Modifier Classes
- `.teaser--image-right` - Image on right side
- `.teaser--stacked` - Vertical stacked layout
- `.teaser--visible` - Animation state class

## JavaScript Features

### Progressive Enhancement
- Semantic HTML structure
- Lazy loading images
- Loading states
- Error handling

### Accessibility
- Keyboard navigation support
- ARIA attributes
- Screen reader compatibility
- Focus management

### Analytics
- Click tracking with gtag
- Custom events for tracking systems
- Performance monitoring

## Usage in da.live

1. Add a new "teaser" block in da.live
2. Fill in the 5 required rows:
   - Row 1: Header text
   - Row 2: Description text
   - Row 3: Upload/select image
   - Row 4: Enter destination URL
   - Row 5: Enter button text
3. Publish and the teaser will render automatically

## Variants

Add CSS classes to the block in da.live to enable variants:

- `teaser-image-right` - Moves image to right side
- `teaser-stacked` - Creates vertical layout

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ with polyfills
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading images
- Minimal JavaScript footprint (<5KB)
- CSS-only animations
- Optimized rendering

## Accessibility Compliance

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode support
- Reduced motion support
