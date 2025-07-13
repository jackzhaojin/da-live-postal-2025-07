# Adobe EDS Blocks Agent

## Product Specification
Refer to `PRD.md` for the complete product requirements document outlining the postal marketing website specifications, features, and implementation strategy.

## Technical Specification
Refer to `TECHNICAL_SPEC.md` for detailed development guidelines, architecture decisions, and implementation specifications.

## Project Overview
This is an Adobe Edge Delivery Services (EDS) project focused on building custom blocks for da.live. The project follows EDS conventions and patterns for creating performant, semantic HTML blocks.

## Block Architecture
Blocks are built following Adobe EDS patterns:
- Each block has its own folder in `/blocks/`
- CSS and JS files share the same name as the block
- Semantic HTML structure with proper CSS classes
- Progressive enhancement with JavaScript

## Block Development Patterns

### CSS Conventions
- Use CSS Grid and Flexbox for layouts
- Follow BEM-like naming: `.blockname__element`
- Mobile-first responsive design
- CSS custom properties for theming
- Avoid inline styles

### JavaScript Patterns
- Export a default function that receives the block element
- Use semantic DOM queries (avoid generic selectors)
- Handle progressive enhancement gracefully
- Prefer vanilla JavaScript over frameworks
- Use `fetch()` for data loading

### HTML Structure
- Semantic HTML elements (`<section>`, `<article>`, `<header>`, etc.)
- Proper heading hierarchy
- Accessible markup with ARIA labels
- Clean, minimal markup structure

## EDS-Specific Guidelines

### Block Registration
```javascript
export default function decorate(block) {
  // Block decoration logic here
}
```

### CSS Loading
- CSS is automatically loaded based on block name
- Use `:where()` selector for low specificity
- Follow the cascade, avoid `!important`

### Performance Considerations
- Lazy load images using EDS patterns
- Minimize DOM manipulation
- Use CSS transforms for animations
- Optimize for Core Web Vitals

## Common Block Types
- **Content Blocks**: Text, images, cards
- **Navigation Blocks**: Headers, breadcrumbs, menus
- **Media Blocks**: Carousels, galleries, videos
- **Form Blocks**: Contact forms, search
- **Data Blocks**: Tables, charts, feeds

## Quality Standards
- Lighthouse score 95+ for performance
- WCAG 2.1 AA compliance
- Cross-browser compatibility
- Mobile-first responsive design
- Semantic HTML structure

## Testing Approach
- Test in da.live preview environment
- Validate HTML semantics
- Check responsive behavior
- Test keyboard navigation
- Verify screen reader compatibility            