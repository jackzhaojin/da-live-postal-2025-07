export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  // Extract configuration from rows
  const config = {
    title: 'Quick Package Lookup',
    placeholder: 'Enter tracking number...',
    submitText: 'Track',
    submitLink: '#',
    actionLinks: [],
  };

  // Debug logging
  if (window.debugQuickPackageBlock) {
    // eslint-disable-next-line no-console
    console.log('Debugging quick-package-lookup block');
    // eslint-disable-next-line no-console
    console.log('Total rows:', rows.length);
  }

  rows.forEach((row, index) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim();
      const value = cells[1].textContent.trim();

      if (window.debugQuickPackageBlock) {
        // eslint-disable-next-line no-console
        console.log(`Row ${index}: "${key}" -> "${value}"`);
      }

      // Store configuration values
      if (key === 'title') {
        config.title = value;
      } else if (key === 'input-placeholder') {
        config.placeholder = value;
      } else if (key === 'submit-button-text') {
        config.submitText = value;
      } else if (key === 'submit-button-link') {
        config.submitLink = value;
      } else if (key === 'action-link') {
        config.actionLinks.push(value);
      }
    }
  });

  if (window.debugQuickPackageBlock) {
    // eslint-disable-next-line no-console
    console.log('Final config:', config);
  }

  // Create the lookup component structure
  const container = document.createElement('div');
  container.className = 'lookup-container';

  // Add title
  if (config.title) {
    const title = document.createElement('h2');
    title.className = 'lookup-title';
    title.textContent = config.title;
    container.appendChild(title);
  }

  // Create search form
  const form = document.createElement('form');
  form.className = 'lookup-form';

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'input-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'lookup-input';
  input.placeholder = config.placeholder || 'Enter tracking number...';
  input.setAttribute('aria-label', 'Package tracking number');

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'lookup-submit';
  submitButton.textContent = config.submitText || 'Track';

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(submitButton);
  form.appendChild(inputWrapper);

  // Add form event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const trackingNumber = input.value.trim();
    if (trackingNumber) {
      // In a real implementation, this would navigate to a tracking page
      const trackingUrl = config.submitLink || '#';
      if (trackingUrl !== '#') {
        window.location.href = `${trackingUrl}?tracking=${encodeURIComponent(trackingNumber)}`;
      } else {
        // eslint-disable-next-line no-alert
        alert(`Tracking: ${trackingNumber}`);
      }
    }
  });

  container.appendChild(form);

  // Create action links
  if (config.actionLinks && config.actionLinks.length > 0) {
    const actionsWrapper = document.createElement('div');
    actionsWrapper.className = 'lookup-actions';

    config.actionLinks.forEach((linkText) => {
      const actionItem = document.createElement('div');
      actionItem.className = 'action-item';

      const icon = document.createElement('span');
      icon.className = 'action-icon';
      icon.setAttribute('aria-hidden', 'true');

      // Add appropriate icons based on action text
      if (linkText.toLowerCase().includes('ship')) {
        icon.textContent = '📦';
      } else if (linkText.toLowerCase().includes('location')) {
        icon.textContent = '📍';
      } else if (linkText.toLowerCase().includes('pickup') || linkText.toLowerCase().includes('schedule')) {
        icon.textContent = '🕒';
      } else {
        icon.textContent = '🔗';
      }

      const link = document.createElement('a');
      link.href = '#';
      link.className = 'action-link';
      link.textContent = linkText;

      actionItem.appendChild(icon);
      actionItem.appendChild(link);
      actionsWrapper.appendChild(actionItem);
    });

    container.appendChild(actionsWrapper);
  }

  // Replace block content
  block.innerHTML = '';
  block.appendChild(container);
}
