/**
 * Teaser Block JavaScript
 * Handles progressive enhancement and interactive behavior
 */

export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.querySelectorAll(':scope > div')];
  
  if (rows.length < 5) {
    console.warn('Teaser block requires exactly 5 rows: header, description, image, ctaLink, ctaText');
    return;
  }

  // Extract content from rows
  const [headerRow, descriptionRow, imageRow, ctaLinkRow, ctaTextRow] = rows;
  
  const header = headerRow?.textContent?.trim() || '';
  const description = descriptionRow?.textContent?.trim() || '';
  const imageElement = imageRow?.querySelector('img');
  const ctaLink = ctaLinkRow?.textContent?.trim() || '#';
  const ctaText = ctaTextRow?.textContent?.trim() || 'Learn More';

  // Clear the block content
  block.innerHTML = '';

  // Create teaser structure
  const teaserWrapper = document.createElement('a');
  teaserWrapper.className = 'teaser';
  teaserWrapper.href = ctaLink;
  
  // Add external link attributes if needed
  if (ctaLink.startsWith('http') && !ctaLink.includes(window.location.hostname)) {
    teaserWrapper.target = '_blank';
    teaserWrapper.rel = 'noopener noreferrer';
  }

  // Create image container
  const imageContainer = document.createElement('div');
  imageContainer.className = 'teaser__image';
  
  if (imageElement) {
    // Clone the image and ensure proper attributes
    const img = imageElement.cloneNode(true);
    img.loading = 'lazy';
    img.alt = img.alt || header; // Use header as fallback alt text
    
    // Add loading state
    img.addEventListener('load', () => {
      imageContainer.classList.remove('loading');
    });
    
    img.addEventListener('error', () => {
      imageContainer.classList.remove('loading');
      console.warn('Failed to load teaser image:', img.src);
    });
    
    imageContainer.classList.add('loading');
    imageContainer.appendChild(img);
  }

  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'teaser__content';

  // Create header element
  const headerElement = document.createElement('h3');
  headerElement.className = 'teaser__header';
  headerElement.textContent = header;

  // Create description element
  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'teaser__description';
  descriptionElement.textContent = description;

  // Create CTA button
  const ctaButton = document.createElement('span');
  ctaButton.className = 'teaser__cta';
  ctaButton.textContent = ctaText;
  ctaButton.setAttribute('role', 'button');

  // Assemble content
  contentContainer.appendChild(headerElement);
  contentContainer.appendChild(descriptionElement);
  contentContainer.appendChild(ctaButton);

  // Assemble teaser
  teaserWrapper.appendChild(imageContainer);
  teaserWrapper.appendChild(contentContainer);

  // Add to block
  block.appendChild(teaserWrapper);

  // Add click tracking
  teaserWrapper.addEventListener('click', (e) => {
    // Track click event for analytics
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'teaser',
        event_label: header,
        value: ctaLink
      });
    }
    
    // Custom event for other tracking systems
    window.dispatchEvent(new CustomEvent('teaser-click', {
      detail: {
        header,
        description,
        ctaLink,
        ctaText
      }
    }));
  });

  // Keyboard accessibility
  teaserWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      teaserWrapper.click();
    }
  });

  // Intersection Observer for entrance animations (optional)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('teaser--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    observer.observe(teaserWrapper);
  }

  // Add variant classes based on configuration
  const blockClasses = block.className.split(' ');
  const variants = blockClasses.filter(cls => cls.startsWith('teaser-'));
  
  variants.forEach(variant => {
    const variantName = variant.replace('teaser-', '');
    teaserWrapper.classList.add(`teaser--${variantName}`);
  });
}

/**
 * Utility function to validate teaser configuration
 */
export function validateTeaserConfig(config) {
  const required = ['header', 'description', 'image', 'ctaLink', 'ctaText'];
  const missing = required.filter(field => !config[field]);
  
  if (missing.length > 0) {
    console.warn(`Teaser missing required fields: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
}

/**
 * Utility function to create teaser programmatically
 */
export function createTeaser(config) {
  if (!validateTeaserConfig(config)) {
    return null;
  }

  const block = document.createElement('div');
  block.className = 'teaser-block';
  
  // Create rows for the decorate function
  const fields = ['header', 'description', 'image', 'ctaLink', 'ctaText'];
  fields.forEach(field => {
    const row = document.createElement('div');
    if (field === 'image' && config[field] instanceof HTMLElement) {
      row.appendChild(config[field]);
    } else {
      row.textContent = config[field];
    }
    block.appendChild(row);
  });

  decorate(block);
  return block;
}
