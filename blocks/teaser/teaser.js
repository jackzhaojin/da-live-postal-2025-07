export default function decorate(block) {
  // Parse the EDS key-value structure
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};
  
  rows.forEach(row => {
    const cells = row.querySelectorAll(':scope > div');
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim();
      const value = cells[1];
      data[key] = value;
    }
  });

  // Extract values
  const header = data.header?.textContent?.trim() || '';
  const description = data.description?.textContent?.trim() || '';
  const imageElement = data.image?.querySelector('picture, img');
  const ctaLink = data.ctaLink?.textContent?.trim() || '#';
  const ctaText = data.ctaText?.textContent?.trim() || 'Learn More';

  // Clear block and rebuild structure
  block.innerHTML = '';
  block.className = 'teaser';

  // Create content section
  const content = document.createElement('div');
  content.className = 'teaser__content';

  // Header
  const headerEl = document.createElement('h2');
  headerEl.className = 'teaser__header';
  headerEl.textContent = header;

  // Description
  const descEl = document.createElement('p');
  descEl.className = 'teaser__description';
  descEl.textContent = description;

  // CTA
  const ctaEl = document.createElement('a');
  ctaEl.className = 'teaser__cta';
  ctaEl.textContent = ctaText;
  ctaEl.href = ctaLink;

  content.appendChild(headerEl);
  content.appendChild(descEl);
  content.appendChild(ctaEl);

  // Create image section
  const imageContainer = document.createElement('div');
  imageContainer.className = 'teaser__image';
  
  if (imageElement) {
    imageContainer.appendChild(imageElement.cloneNode(true));
  }

  // Assemble final structure
  block.appendChild(content);
  block.appendChild(imageContainer);
}