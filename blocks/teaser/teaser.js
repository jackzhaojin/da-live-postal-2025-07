/**
 * Teaser Block JavaScript
 * Handles progressive enhancement and interactive behavior
 */

export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.querySelectorAll(':scope > div')];
  
  if (rows.length < 5) {
    console.warn('Teaser block requires exactly 5 rows with key-value pairs');
    return;
  }

  // Parse key-value pairs from rows
  const data = {};
  rows.forEach(row => {
    const cells = row.querySelectorAll(':scope > div');
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim();
      const valueDiv = cells[1];
      
      if (key === 'image') {
        // For image, store the entire div containing picture/img elements
        data[key] = valueDiv;
      } else {
        // For text fields, get the text content
        data[key] = valueDiv.textContent.trim();
      }
    }
  });

  // Extract values with fallbacks
  const header = data.header || '';
  const description = data.description || '';
  const imageData = data.image;
  const ctaLink = data.ctaLink || '#';
  const ctaText = data.ctaText || 'Learn More';

  // Find the image element (could be img or within picture)
  let imageElement = null;
  if (imageData) {
    imageElement = imageData.querySelector('img') || imageData.querySelector('picture img');
  }

  // Clear the block content
  block.innerHTML = '';

  // Create teaser container (not a link wrapper)
  const teaserContainer = document.createElement('div');
  teaserContainer.className = 'teaser';

  // Create image container
  const imageContainer = document.createElement('div');
  imageContainer.className = 'teaser__image';
  
  if (imageData) {
    // Check if we have a picture element or just an img
    const pictureElement = imageData.querySelector('picture');
    
    if (pictureElement) {
      // Clone the entire picture element with all sources
      const clonedPicture = pictureElement.cloneNode(true);
      const img = clonedPicture.querySelector('img');
      if (img) {
        img.loading = 'lazy';
        img.alt = img.alt || header; // Use header as fallback alt text
      }
      imageContainer.appendChild(clonedPicture);
    } else if (imageElement) {
      // Clone just the image element
      const img = imageElement.cloneNode(true);
      img.loading = 'lazy';
      img.alt = img.alt || header; // Use header as fallback alt text
      imageContainer.appendChild(img);
    }
    
    // Add loading state handling
    const imgToWatch = imageContainer.querySelector('img');
    if (imgToWatch) {
      imageContainer.classList.add('loading');
      
      imgToWatch.addEventListener('load', () => {
        imageContainer.classList.remove('loading');
      });
      
      imgToWatch.addEventListener('error', () => {
        imageContainer.classList.remove('loading');
        console.warn('Failed to load teaser image:', imgToWatch.src);
      });
    }
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

  // Create CTA button as actual link
  const ctaButton = document.createElement('a');
  ctaButton.className = 'teaser__cta';
  ctaButton.textContent = ctaText;
  ctaButton.href = ctaLink;
  
  // Add external link attributes if needed
  if (ctaLink.startsWith('http') && !ctaLink.includes(window.location.hostname)) {
    ctaButton.target = '_blank';
    ctaButton.rel = 'noopener noreferrer';
  }

  // Assemble content
  contentContainer.appendChild(headerElement);
  contentContainer.appendChild(descriptionElement);
  contentContainer.appendChild(ctaButton);

  // Assemble teaser
  teaserContainer.appendChild(imageContainer);
  teaserContainer.appendChild(contentContainer);

  // Add to block
  block.appendChild(teaserContainer);

  // Add click tracking
  ctaButton.addEventListener('click', (e) => {
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

    observer.observe(teaserContainer);
  }

  // Add variant classes based on configuration
  const blockClasses = block.className.split(' ');
  const variants = blockClasses.filter(cls => cls.startsWith('teaser-'));
  
  variants.forEach(variant => {
    const variantName = variant.replace('teaser-', '');
    teaserContainer.classList.add(`teaser--${variantName}`);
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
