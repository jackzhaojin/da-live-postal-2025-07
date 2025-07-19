export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      row.className = 'cta-row';
      cells.forEach((cell, index) => {
        if (index === 0) cell.className = 'cta-content';
        else cell.className = 'cta-actions';
      });
    }
  });

  // Style buttons in CTA
  block.querySelectorAll('a').forEach((link) => {
    const up = link.parentElement;
    const twoup = link.parentElement.parentElement;
    if (!up.querySelector('img')) {
      if (up !== twoup) {
        link.className = 'button secondary';
      } else {
        link.className = 'button primary';
      }
    }
  });
}