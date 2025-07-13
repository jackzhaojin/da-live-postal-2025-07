# AI Context for Adobe EDS Project

## Codebase Overview
This is an Adobe Edge Delivery Services project for da.live focused on building custom blocks for content delivery.

## Project Structure
```
/
├── blocks/           # Custom EDS blocks
├── styles/           # Global styles and CSS variables
├── scripts/          # Shared JavaScript utilities
├── fstab.yaml       # EDS configuration
└── ...
```

## EDS Block Patterns

### Standard Block Structure
```
blocks/
├── blockname/
│   ├── blockname.css
│   ├── blockname.js
│   └── README.md (optional)
```

### CSS Patterns
- Use `:where(.blockname)` for low specificity
- CSS Grid/Flexbox for layouts
- Mobile-first media queries
- CSS custom properties for theming
- BEM-like naming conventions

### JavaScript Patterns
```javascript
export default function decorate(block) {
  // Decoration logic
  // Return void or modified block
}
```

### Common Block Categories
1. **Content Blocks**
   - Hero sections
   - Text with media
   - Card layouts
   - Quote blocks

2. **Navigation Blocks**
   - Header/navigation
   - Breadcrumbs
   - Footer
   - Table of contents

3. **Media Blocks**
   - Image galleries
   - Video players
   - Carousels
   - Media grids

4. **Interactive Blocks**
   - Forms
   - Tabs
   - Accordions
   - Modal dialogs

## EDS-Specific Conventions
- Blocks are automatically discovered and loaded
- CSS is loaded based on block name
- JavaScript decoration runs after DOM is ready
- Images are automatically optimized
- Links are processed for internal routing

## Performance Considerations
- Lazy load non-critical blocks
- Optimize images with EDS image service
- Minimize JavaScript bundle size
- Use CSS containment where appropriate
- Implement proper caching strategies

## Accessibility Guidelines
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Development Workflow
1. Create block folder structure
2. Implement HTML structure in document
3. Add CSS for styling and layout
4. Add JavaScript for interactivity
5. Test in da.live preview
6. Optimize for performance and accessibility

## Common CSS Utilities
- Container queries for responsive blocks
- CSS logical properties for i18n
- Custom properties for theming
- Utility classes for spacing/typography

## JavaScript Utilities
- DOM helper functions
- Event delegation patterns
- Intersection Observer for lazy loading
- Fetch utilities for data loading
- Error handling patterns

## Integration Points
- EDS automatic block detection
- da.live authoring environment
- Adobe Experience Manager integration
- CDN and edge delivery optimization