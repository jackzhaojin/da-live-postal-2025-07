# Postal Marketing Website

A modern postal service website built with AEM Edge Delivery Services and da.live, featuring 17+ reusable blocks and designed for seamless content authoring.

## 🎯 Project Overview

This project demonstrates a complete postal marketing website implementation using:
- **AEM Edge Delivery Services** - Lightning-fast web delivery platform
- **da.live** - Live preview and content authoring platform
- **17+ Content Blocks** - Reusable components for rapid page building
- **Modern Architecture** - Performance-optimized and accessibility-focused

## Project Documentation

### Core Documentation
- **Product Requirements**: See `PRD.md` for complete product specifications and implementation strategy
- **Technical Specification**: See `TECHNICAL_SPEC.md` for development guidelines and architecture decisions
- **Project Analysis**: See `project-analysis.md` for comprehensive codebase analysis and architecture overview

### Quick Reference
For a detailed understanding of the project's architecture, technology stack, and code patterns, refer to the comprehensive [Project Analysis](./project-analysis.md) which provides:
- Complete technology stack overview
- Block architecture analysis (18+ components)
- JavaScript and CSS patterns
- Development workflow and quality standards
- Performance and accessibility guidelines

This project provides a foundation for starting an AEM Edge Delivery Services project. It includes many common blocks and features a project might need.

## ✨ Key Features

- **17+ Pre-built Blocks**: accordion, cards, carousel, columns, embed, footer, form, fragment, header, hero, modal, quote, search, table, tabs, teaser, video
- **Responsive Design**: Mobile-first approach with optimized performance
- **SEO Optimized**: Built-in performance and accessibility standards
- **Developer Friendly**: Comprehensive linting, testing, and development tools
- **Content Creator Friendly**: da.live integration for visual content editing

## 🛠️ Available Blocks

| Block | Description | Use Case |
|-------|-------------|----------|
| **accordion** | Collapsible content sections | FAQs, product details |
| **cards** | Content cards with images | Service showcases, testimonials |
| **carousel** | Image/content slider | Hero banners, galleries |
| **hero** | Landing page headers | Homepage headlines, CTAs |
| **form** | Contact and signup forms | Lead generation, inquiries |
| **teaser** | Preview content blocks | Article previews, promotions |
| **search** | Site search functionality | Content discovery |
| **table** | Data presentation | Pricing, comparisons |
| *+ 9 more blocks* | See `/blocks` directory | Various content needs |

## DA compatible

This specific repo has been _slightly_ modified to be compatible with DA's live preview.

## Getting started

### 1. Github
1. Use this template to make a new repo.
1. Install [AEM Code Sync](https://github.com/apps/aem-code-sync).

### 2. DA content
1. Browse to https://da.live/start.
2. Follow the steps.

### 3. Local development
1. Clone your new repo to your computer.
1. Install the AEM CLI using your terminal: `sudo npm install -g @adobe/aem-cli`
1. **Start local development server**: `aem up` (runs on port 3000 - no need for npm install first!)
1. Open the `{repo}` folder in your favorite code editor and build something.
1. **Recommended:** Install common npm packages like linting and testing: `npm i`.

## 🚀 Development Commands

**Quick Start**: To run the project locally on port 3000:
```bash
aem up
```

Once you have the project set up locally, use these npm scripts for development:

```bash
# Install dependencies
npm install

# Linting
npm run lint           # Run all linters
npm run lint:js        # JavaScript/ES6 linting
npm run lint:css       # CSS/Stylelint

# Build tasks
npm run build:json     # Build all JSON configurations
```

## 🏗️ Project Structure

```
├── blocks/           # 17+ reusable content blocks
├── styles/           # Global CSS and fonts
├── scripts/          # Core JavaScript functionality
├── docs/             # Comprehensive documentation
├── ue/               # Universal Editor configurations
├── tools/            # Development utilities
└── static/           # Static assets and prototypes
```

## 📚 Documentation

### Comprehensive Documentation Suite
The `/docs` directory contains comprehensive documentation for the da-live-postal-2025-07 project, including AI-generated analysis, architecture assessments, and implementation plans.

**📁 [Documentation Index](./docs/README.md)** - Central hub for all project documentation

### AI Analysis Documentation
**📁 [AI Analysis](./docs/ai-analysis/README.md)** - AI-generated analysis organized by date and topic

#### Latest Analysis Session
**📁 [2025-07-19 Homepage Architecture Analysis](./docs/ai-analysis/2025-07-19-homepage-analyze-architecture/)**

Comprehensive transformation planning session covering:
- **Architecture Analysis**: Technical deep dive into current EDS architecture and modernization requirements
- **Implementation Guide**: Step-by-step instructions for executing the postal-to-modern transformation
- **Site Transformation Plan**: Executive overview and strategic direction for complete site transformation
- **MCP Analysis Methodology**: AI analysis methodology transparency and tool documentation

**Transformation Scope**: Convert current postal theme to modern minimal design matching https://young-shadow-1623.21st.app/

### Documentation Features
- **Multi-perspective guidance**: Project managers, developers, stakeholders
- **Implementation-ready**: Actionable steps with technical specifications
- **Evidence-based analysis**: Screenshots, code samples, live site analysis
- **Methodology transparency**: Complete AI analysis process documentation

## AI References and Capabilities

- **AGENT.md**: Development guidelines for OpenAI's Codex integration and block development patterns
- **CLAUDE.md**: Configuration and instructions for Claude Code AI assistant
- **AI_CONTEXT.md**: Additional AI context and capability documentation

## 🤝 Contributing

This project follows standard AEM Edge Delivery Services patterns and includes:
- ESLint configuration for JavaScript
- Stylelint for CSS
- Husky for git hooks
- Comprehensive documentation in `/docs`

See `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` for detailed contribution guidelines.

## 📄 License

This project is licensed under the Apache License 2.0 - see the `LICENSE` file for details.

---

**Built with ❤️ using AEM Edge Delivery Services and da.live**
