import { processBlockMetadata } from '../../scripts/block-metadata.js';

/**
 * Creates the checker-grid SVG background
 * @returns {string} SVG string for the checker-grid pattern
 */
function createCheckerGridSVG() {
  // Generate a unique ID for the pattern to avoid conflicts
  const patternId = `checker-grid-${Math.random().toString(36).substr(2, 9)}`;

  return `
    <svg aria-hidden="true" class="hero-checker-grid" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="${patternId}" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1">
          <path d="M.5 40V.5H40" fill="none" stroke-dasharray="0"></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#${patternId})"></rect>
      <svg x="-1" y="-1" class="overflow-visible">
        <rect width="39" height="39" x="521" y="81" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="241" y="81" fill="currentColor" stroke-width="0" opacity="0.04952393217536155"></rect>
        <rect width="39" height="39" x="281" y="361" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="121" y="441" fill="currentColor" stroke-width="0" opacity="0.0639330353558762"></rect>
        <rect width="39" height="39" x="81" y="281" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="441" y="321" fill="currentColor" stroke-width="0" opacity="0.012236939001013525"></rect>
        <rect width="39" height="39" x="321" y="201" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="281" y="121" fill="currentColor" stroke-width="0" opacity="0.07104229037940968"></rect>
        <rect width="39" height="39" x="41" y="201" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="441" y="41" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="481" y="401" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="321" y="281" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="441" y="241" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="281" y="401" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="281" y="321" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="401" y="401" fill="currentColor" stroke-width="0" opacity="0.05675647488969844"></rect>
        <rect width="39" height="39" x="201" y="161" fill="currentColor" stroke-width="0" opacity="0.006123644133913331"></rect>
        <rect width="39" height="39" x="41" y="321" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="281" y="361" fill="currentColor" stroke-width="0" opacity="0.03762760901881848"></rect>
        <rect width="39" height="39" x="281" y="81" fill="currentColor" stroke-width="0" opacity="0.09162463641550858"></rect>
        <rect width="39" height="39" x="81" y="361" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="121" y="241" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="121" y="161" fill="currentColor" stroke-width="0" opacity="0.09038889720395674"></rect>
        <rect width="39" height="39" x="201" y="201" fill="currentColor" stroke-width="0" opacity="0.002585107574122958"></rect>
        <rect width="39" height="39" x="281" y="201" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="361" y="401" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="281" y="41" fill="currentColor" stroke-width="0" opacity="0"></rect>
        <rect width="39" height="39" x="401" y="241" fill="currentColor" stroke-width="0" opacity="0.008808566475636326"></rect>
        <rect width="39" height="39" x="41" y="361" fill="currentColor" stroke-width="0" opacity="0.030104990271502177"></rect>
        <rect width="39" height="39" x="441" y="161" fill="currentColor" stroke-width="0" opacity="0"></rect>
      </svg>
    </svg>
  `.trim();
}

/**
 * Processes hero content and creates button containers
 * @param {Element} block - The hero block element
 * @param {Array} rows - Content rows after metadata extraction
 */
function processHeroContent(block, rows) {
  if (rows.length === 0) return;

  const contentRow = rows[0];
  const contentDiv = contentRow.querySelector('div');

  if (!contentDiv) return;

  // Handle blockquote positioning - move it to the top if it exists
  const blockquote = contentDiv.querySelector('blockquote');
  if (blockquote) {
    // Move blockquote to the beginning of the content
    contentDiv.insertBefore(blockquote, contentDiv.firstChild);
  }

  // Find all link elements and create button container
  const links = [...contentDiv.querySelectorAll('a')];

  if (links.length > 0) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    links.forEach((link, index) => {
      link.className = `button ${index === 0 ? 'primary' : 'secondary'}`;

      // Move link out of its paragraph and into button container
      const paragraph = link.closest('p');
      if (paragraph) {
        buttonContainer.appendChild(link);
        // Remove empty paragraph if it only contained the link
        if (paragraph.textContent.trim() === '' || paragraph.innerHTML.trim() === '') {
          paragraph.remove();
        }
      }
    });

    // Append button container to content
    contentDiv.appendChild(buttonContainer);
  }
}

/**
 * Applies the checker-grid variation
 * @param {Element} block - The hero block element
 */
function applyCheckerGridVariation(block) {
  // Create and insert the SVG background
  const svgElement = document.createElement('div');
  svgElement.innerHTML = createCheckerGridSVG();
  svgElement.style.position = 'absolute';
  svgElement.style.inset = '0';
  svgElement.style.pointerEvents = 'none';
  svgElement.style.zIndex = '0';

  // Insert as first child so it appears behind content
  block.insertBefore(svgElement, block.firstChild);

  // Ensure content is positioned above the background
  const contentRows = block.querySelectorAll(':scope > div:not(:first-child)');
  contentRows.forEach((row) => {
    row.style.position = 'relative';
    row.style.zIndex = '1';
  });
}

/**
 * Decorates the hero block
 * @param {Element} block - The hero block element
 */
export default function decorate(block) {
  // Process metadata and get content rows
  const { metadata, rows } = processBlockMetadata(block, {
    allowedKeys: ['variation', 'theme', 'alignment'],
  });

  // Process hero content (buttons, etc.)
  processHeroContent(block, rows);

  // Apply variation-specific styling
  if (metadata.variation === 'checker-grid') {
    applyCheckerGridVariation(block);
  }

  // Log metadata for debugging (remove in production)
  if (Object.keys(metadata).length > 0) {
    // eslint-disable-next-line no-console
    console.log('Hero metadata:', metadata);
  }
}
