/**
 * Block Metadata Utility
 *
 * Provides standardized metadata extraction for EDS blocks.
 * When the first paragraph in the first div contains "metadata",
 * the entire first div is treated as metadata and hidden from rendering.
 */

/**
 * Extracts metadata from a block and removes the metadata row
 * @param {Element} block - The block element to extract metadata from
 * @returns {Object} - Object containing metadata key-value pairs
 */
export function extractMetadata(block) {
  const firstRow = block.querySelector(':scope > div');
  const firstParagraph = firstRow?.querySelector('p');

  if (firstParagraph?.textContent.trim().toLowerCase() === 'metadata') {
    const metadata = {};
    const metadataParagraphs = [...firstRow.querySelectorAll('p')].slice(1);

    metadataParagraphs.forEach((p) => {
      const text = p.textContent.trim();
      const [key, value] = text.split(':').map((s) => s.trim());
      if (key && value) {
        // Convert common boolean strings
        if (value.toLowerCase() === 'true') metadata[key] = true;
        else if (value.toLowerCase() === 'false') metadata[key] = false;
        // Convert numeric strings
        else if (!Number.isNaN(Number(value)) && value !== '') metadata[key] = Number(value);
        else metadata[key] = value;
      }
    });

    // Remove metadata row from block to prevent rendering
    firstRow.remove();
    return metadata;
  }

  return {};
}

/**
 * Applies metadata as CSS classes to the block
 * @param {Element} block - The block element
 * @param {Object} metadata - Metadata object
 * @param {Object} options - Configuration options
 */
export function applyMetadataClasses(block, metadata, options = {}) {
  const { prefix = '', allowedKeys = [] } = options;

  Object.entries(metadata).forEach(([key, value]) => {
    // Skip if allowedKeys is specified and key is not in it
    if (allowedKeys.length > 0 && !allowedKeys.includes(key)) return;

    // Apply variation as direct class
    if (key === 'variation') {
      block.classList.add(value);
    } else if (typeof value === 'string') {
      // Apply other metadata as prefixed classes
      const className = prefix ? `${prefix}-${key}-${value}` : `${key}-${value}`;
      block.classList.add(className);
    } else if (typeof value === 'boolean' && value) {
      // Apply boolean metadata as flag classes
      const className = prefix ? `${prefix}-${key}` : key;
      block.classList.add(className);
    }
  });
}

/**
 * Gets the content rows after metadata extraction
 * @param {Element} block - The block element (after metadata extraction)
 * @returns {Array} - Array of remaining content rows
 */
export function getContentRows(block) {
  return [...block.querySelectorAll(':scope > div')];
}

/**
 * Complete metadata processing helper
 * Extracts metadata, applies classes, and returns content rows
 * @param {Element} block - The block element
 * @param {Object} options - Configuration options
 * @returns {Object} - { metadata, rows }
 */
export function processBlockMetadata(block, options = {}) {
  const metadata = extractMetadata(block);

  if (Object.keys(metadata).length > 0) {
    applyMetadataClasses(block, metadata, options);
  }

  const rows = getContentRows(block);

  return { metadata, rows };
}

/**
 * Common metadata keys and their expected types
 */
export const METADATA_TYPES = {
  variation: 'string',
  theme: 'string',
  columns: 'number',
  alignment: 'string',
  size: 'string',
  autoplay: 'boolean',
  header: 'boolean',
  border: 'boolean',
  shadow: 'boolean',
  rounded: 'boolean',
  full: 'boolean',
};

/**
 * Validates metadata against expected types
 * @param {Object} metadata - Metadata object to validate
 * @param {Object} expectedTypes - Expected types (defaults to METADATA_TYPES)
 * @returns {Array} - Array of validation errors
 */
export function validateMetadata(metadata, expectedTypes = METADATA_TYPES) {
  const errors = [];

  Object.entries(metadata).forEach(([key, value]) => {
    const expectedType = expectedTypes[key];
    // eslint-disable-next-line valid-typeof
    if (expectedType && typeof value !== expectedType) {
      errors.push(`Invalid type for ${key}: expected ${expectedType}, got ${typeof value}`);
    }
  });

  return errors;
}
