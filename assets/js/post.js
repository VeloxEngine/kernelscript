/**
 * KERNELSCRIPT // Post Reader Logic
 * Reading Progress, Code Snippet Copying & TOC Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Reading Progress Bar
  const progressBar = document.getElementById('reading-progress');
  
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  // Code Copy Buttons
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeWrapper = btn.closest('.code-wrapper');
      const codeEl = codeWrapper ? codeWrapper.querySelector('pre code') : null;
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.innerText).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'COPIED!';
          btn.style.color = 'var(--accent-emerald)';
          btn.style.borderColor = 'var(--accent-emerald)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        });
      }
    });
  });

  // Mobile navigation drawer toggle for post pages
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const drawerClose = document.getElementById('drawer-close');

  function openMobileNav() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (drawerClose) drawerClose.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);
});
