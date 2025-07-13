export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  if (rows.length < 5) {
    console.warn('Teaser block requires exactly 5 rows');
    return;
  }

  // Parse the 5 fields from rows
  const data = {};
  rows.forEach((row) => {
    const cells = row.querySelectorAll(':scope > div');
    if (cells.length >= 2) {
      const rawKey = cells[0].textContent.trim().toLowerCase();
      const valueDiv = cells[1];

      const fieldMap = {
        header: 'header',
        description: 'description',
        image: 'image',
        ctalink: 'ctaLink',
        'cta link': 'ctaLink',
        ctatext: 'ctaText',
        'cta text': 'ctaText',
      };

      const key = fieldMap[rawKey];

      if (!key) return;

      if (key === 'image') {
        data[key] = valueDiv;
      } else {
        data[key] = valueDiv.textContent.trim();
      }
    }
  });

  const header = data.header || '';
  const description = data.description || '';
  const imageData = data.image;
  const ctaLink = data.ctaLink || '#';
  const ctaText = data.ctaText || 'Learn More';

  // Clear block
  block.innerHTML = '';

  // Create structure
  const teaser = document.createElement('div');
  teaser.className = 'teaser';

  // Content section
  const content = document.createElement('div');
  content.className = 'teaser__content';

  const headerEl = document.createElement('h3');
  headerEl.className = 'teaser__header';
  headerEl.textContent = header;

  const descEl = document.createElement('p');
  descEl.className = 'teaser__description';
  descEl.textContent = description;

  const ctaEl = document.createElement('a');
  ctaEl.className = 'teaser__cta';
  ctaEl.textContent = ctaText;
  ctaEl.href = ctaLink;

  content.appendChild(headerEl);
  content.appendChild(descEl);
  content.appendChild(ctaEl);

  // Image section
  const imageContainer = document.createElement('div');
  imageContainer.className = 'teaser__image';

  if (imageData) {
    const img = imageData.querySelector('img');
    if (img) {
      const newImg = img.cloneNode(true);
      newImg.alt = newImg.alt || header;
      imageContainer.appendChild(newImg);
    }
  }

  // Assemble
  teaser.appendChild(content);
  teaser.appendChild(imageContainer);
  block.appendChild(teaser);
}
