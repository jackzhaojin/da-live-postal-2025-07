# Adobe Edge Delivery Services (EDS) Technical Specification

## Overview
This document outlines the technical standards and best practices for developing Adobe Edge Delivery Services (EDS) applications, with a focus on block-based architecture and da.live standards compliance.

### Project Analysis Reference
For a comprehensive analysis of the current project architecture, technology stack, and existing block implementations, see the [Project Analysis](./project-analysis.md) document. It provides detailed insights into all 18+ blocks, JavaScript patterns, CSS architecture, and development workflows currently implemented in this codebase.

## Core Principles

### 1. Block-Based Architecture
- All functionality should be implemented as modular blocks
- Each block should be self-contained and reusable
- Blocks should follow the established naming conventions and structure

### 2. da.live Standards Compliance
- Follow da.live naming conventions for files and folders
- Maintain consistent code structure across all blocks
- Implement proper semantic HTML structure
- Ensure accessibility compliance (WCAG 2.1 AA)

## Block Development Guidelines

### Block Structure
```
/blocks/
├── block-name/
│   ├── block-name.js
│   ├── block-name.css
│   └── block-name.html (optional)
```

### Block Implementation Standards

#### JavaScript Requirements
- Use ES6+ syntax and modern JavaScript features
- Implement proper error handling and fallbacks
- Follow async/await patterns for asynchronous operations
- Export block functions using standard EDS patterns
- Include proper JSDoc comments for documentation

#### CSS Standards
- Use CSS custom properties (variables) for theming
- Implement responsive design with mobile-first approach
- Follow BEM methodology for class naming
- Ensure cross-browser compatibility
- Optimize for performance (avoid unnecessary reflows/repaints)

#### HTML Structure
- Use semantic HTML elements
- Implement proper ARIA attributes for accessibility
- Ensure proper heading hierarchy (h1-h6)
- Include appropriate meta tags and structured data

### Block Creation Process

#### For New Blocks
1. **Reference Existing Blocks**: Before creating new blocks, examine existing blocks in the `/blocks` folder for:
   - Code structure and patterns
   - Naming conventions
   - CSS organization
   - JavaScript implementation patterns
   - Documentation standards

2. **Block Template Structure**:
   ```javascript
   // block-name.js
   export default function decorate(block) {
     // Block logic here
     // Follow existing patterns from /blocks examples
   }
   ```

3. **CSS Organization**:
   ```css
   /* block-name.css */
   .block-name {
     /* Base styles */
   }
   
   .block-name__element {
     /* Element styles following BEM */
   }
   
   @media (min-width: 768px) {
     /* Responsive styles */
   }
   ```

#### For Header Modifications
- **Special Case**: Header modifications should be made directly to `header.html`
- Do not create separate blocks for header functionality
- Follow existing header structure and conventions
- Ensure modifications maintain responsive behavior
- Test across all breakpoints and devices

## Development Standards

### Code Quality
- Use ESLint and Prettier for code formatting
- Implement unit tests for complex functionality
- Follow single responsibility principle
- Use descriptive variable and function names
- Maintain consistent indentation (2 spaces)

### Performance Requirements
- Optimize images (WebP format when supported)
- Implement lazy loading for non-critical resources
- Minimize JavaScript bundle size
- Use CSS containment where appropriate
- Implement proper caching strategies

### Browser Support
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Implement progressive enhancement
- Provide fallbacks for older browsers where necessary
- Test on both desktop and mobile devices

## File Organization

### Required Files
- `fstab.yaml` - File system configuration
- `sidekick.config.js` - Sidekick configuration
- `styles/styles.css` - Global styles
- `scripts/scripts.js` - Global scripts
- `blocks/` - Block implementations

### Naming Conventions
- Use kebab-case for file and folder names
- Block names should be descriptive and concise
- CSS classes should follow BEM methodology
- JavaScript functions should use camelCase

## Documentation Requirements

### Block Documentation
Each block should include:
- Purpose and functionality description
- Usage examples and parameters
- Dependencies and requirements
- Browser compatibility notes
- Accessibility considerations

### Code Comments
- Use JSDoc format for JavaScript functions
- Include inline comments for complex logic
- Document any workarounds or browser-specific code
- Explain business logic and requirements

## Testing and Quality Assurance

### Required Testing
- Cross-browser compatibility testing
- Mobile responsiveness testing
- Accessibility compliance testing
- Performance testing (Core Web Vitals)
- Content authoring workflow testing

### Code Review Process
- All code changes require peer review
- Ensure compliance with this specification
- Verify accessibility standards are met
- Check performance impact
- Validate against existing block patterns

## Deployment Guidelines

### Pre-deployment Checklist
- [ ] Code follows da.live standards
- [ ] References existing block patterns appropriately
- [ ] Proper error handling implemented
- [ ] Accessibility requirements met
- [ ] Performance optimizations applied
- [ ] Cross-browser testing completed
- [ ] Documentation updated

### Post-deployment Verification
- Verify functionality in production environment
- Monitor Core Web Vitals metrics
- Check for console errors or warnings
- Validate content authoring workflow

## Common Patterns and Examples

### Block Decoration Pattern
```javascript
export default function decorate(block) {
  const rows = Array.from(block.children);
  
  rows.forEach((row, index) => {
    const cells = Array.from(row.children);
    // Process cells based on block requirements
  });
}
```

### Responsive Image Handling
```javascript
function createOptimizedImage(src, alt, width, height) {
  const picture = document.createElement('picture');
  // Implementation following existing patterns
  return picture;
}
```

## Resources and References

- Existing blocks in `/blocks` folder serve as primary reference
- Adobe EDS Developer Guide
- da.live documentation
- Web accessibility guidelines (WCAG 2.1)
- Performance best practices (Core Web Vitals)

## Conclusion

This specification ensures consistent, high-quality development across all Adobe EDS projects. Always reference existing blocks for implementation patterns and maintain adherence to da.live standards. When in doubt, consult the existing codebase and follow established patterns rather than creating new approaches.