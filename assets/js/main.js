/**
 * KERNELSCRIPT // Main Client Logic
 * Search, Category Filtering, URL Param Handling, Dynamic Count, Mobile Drawer & Interactive Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchInput = document.getElementById('search-input');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const postCards = document.querySelectorAll('.post-card');
  const countDisplay = document.getElementById('articles-count');
  const emptyState = document.getElementById('empty-state');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const drawerClose = document.getElementById('drawer-close');
  const dispatchForm = document.getElementById('dispatch-form');
  const dispatchEmail = document.getElementById('dispatch-email');
  const dispatchFeedback = document.getElementById('dispatch-feedback');
  const navFilterLinks = document.querySelectorAll('[data-nav]');

  let currentCategory = 'all';
  let searchQuery = '';

  // Function to filter articles
  function filterArticles() {
    let visibleCount = 0;

    postCards.forEach(card => {
      const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
      const excerpt = (card.querySelector('.card-excerpt')?.textContent || '').toLowerCase();
      const tag = (card.querySelector('.card-tag')?.textContent || '').toLowerCase();
      const cardCategory = card.getAttribute('data-category');

      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesSearch = (title.includes(searchQuery) || excerpt.includes(searchQuery) || tag.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update count display
    if (countDisplay) {
      countDisplay.textContent = visibleCount;
    }

    // Toggle empty state
    if (emptyState) {
      emptyState.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }

  // Set category by key
  function selectCategory(categoryKey) {
    currentCategory = categoryKey || 'all';
    categoryTabs.forEach(tab => {
      if (tab.getAttribute('data-category') === currentCategory) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    filterArticles();
  }

  // Check URL params on initial page load (e.g. index.html?filter=automation)
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');
  if (filterParam) {
    selectCategory(filterParam);
  }

  // Handle header links with data-nav
  navFilterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetNav = link.getAttribute('data-nav');
      if (targetNav) {
        selectCategory(targetNav);
      }
    });
  });

  // Search input event with real-time feedback
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterArticles();
    });

    // Keyboard shortcut: Pressing '/' focuses search input
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchQuery = '';
        filterArticles();
        searchInput.blur();
      }
    });
  }

  // Category tab click event
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-category');
      selectCategory(cat);
    });
  });

  // Mobile navigation drawer toggle
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

  // Dispatch / Subscription Form
  if (dispatchForm && dispatchEmail && dispatchFeedback) {
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = dispatchEmail.value.trim();

      if (!email || !email.includes('@')) {
        dispatchFeedback.textContent = 'ERROR: Please provide a valid terminal address.';
        dispatchFeedback.className = 'form-feedback';
        dispatchFeedback.style.color = '#ef4444';
        dispatchFeedback.style.display = 'block';
        return;
      }

      // Simulate handshake
      dispatchFeedback.textContent = 'INITIATING HANDSHAKE...';
      dispatchFeedback.style.color = '#38bdf8';
      dispatchFeedback.style.display = 'block';

      setTimeout(() => {
        dispatchFeedback.textContent = `[OK] Subscribed: ${email}. SysOp dispatches verified.`;
        dispatchFeedback.className = 'form-feedback success';
        dispatchEmail.value = '';
      }, 700);
    });
  }
});
