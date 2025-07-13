# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is an **Adobe Edge Delivery Services (EDS)** project for da.live, implementing a postal marketing website using a block-based architecture. The system follows EDS conventions with vanilla JavaScript and progressive enhancement for optimal performance.

### Quick Reference
For comprehensive project analysis including all 18+ blocks, technology stack details, and architectural patterns, see the [Project Analysis](./project-analysis.md) document.

### Core Architecture Pattern
- **Block-based modularity**: Self-contained components in `/blocks/` directory
- **EDS decoration pattern**: Each block exports a `decorate(block)` function
- **da.live integration**: Content authored in da.live, delivered via EDS
- **Performance-first**: Lighthouse 95+ target, Core Web Vitals optimization

## Development Commands

```bash
# Setup
npm install
sudo npm install -g @adobe/aem-cli

# Development server
aem up

# Code quality
npm run lint              # All linting
npm run lint:js          # ESLint
npm run lint:css         # Stylelint

# Build configurations
npm run build:json       # Build component configs
npm run build:json:models
npm run build:json:definitions
npm run build:json:filters
```

## Block Development Standards

### File Structure
```
blocks/block-name/
├── block-name.js        # Decoration logic
├── block-name.css       # Block styles
└── README.md           # Documentation
```

### JavaScript Pattern
```javascript
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  // Transform EDS key-value structure
  // Add progressive enhancement
}
```

### CSS Conventions
- Use CSS custom properties from `:root` (colors, typography, spacing)
- Mobile-first responsive design with `@media (min-width: 768px)`
- BEM-like naming: `.block-name__element`
- CSS Grid/Flexbox for layouts

## Content Management

- **Content source**: `https://content.da.live/jackzhaojin/da-live-postal-2025-07/`
- **Preview environment**: da.live preview for real-time editing
- **Universal Editor**: Real-time block editing capabilities
- **Configuration**: fstab.yaml defines content mounting

## Code Quality Configuration

- **ESLint**: Airbnb base with EDS-specific rules
- **Stylelint**: Standard CSS linting
- **Husky**: Pre-commit hooks for quality checks
- **Import extensions**: Always use `.js` extensions in imports

## Key Directories

- `/blocks/`: EDS block components (core architecture)
- `/scripts/`: Global JavaScript utilities and helpers
- `/styles/`: Global CSS, design tokens, and typography
- `/tools/`: Development tools and configuration
- `/ue/`: Universal Editor integration
- `/static/`: Static assets and HTML prototypes

## Development Workflow

1. Reference existing blocks for established patterns
2. Create new blocks following the decoration pattern
3. Use design tokens and responsive patterns
4. Test in da.live preview environment
5. Ensure Lighthouse performance scores 95+
6. Validate accessibility compliance (WCAG 2.1 AA)