document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  
  // Only initialize search if the search input exists
  if (searchInput) {
    initSearch();
  }
  
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
        
        // Set focus to the target element for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
        
        // Update URL hash without scrolling
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
  
  // Add active class to current nav item
  highlightCurrentNavItem();
  
  // Mobile menu toggle
  setupMobileNavigation();
  
  // Handle mobile TOC
  setupMobileTOC();
  
  // Track scroll position for progress indication
  if (document.querySelector('.doc-content')) {
    trackReadingProgress();
  }
  
  // Initialize keyboard shortcuts
  initKeyboardShortcuts();
  
  // Handle initial anchor links when page loads
  handleInitialAnchorLinks();
  
  // Add copy button to code blocks
  addCopyButtonsToCodeBlocks();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize copy to clipboard functionality for code blocks
  initCopyButtons();
  
  // Initialize smooth scrolling for anchor links
  initSmoothScroll();
  
  // Initialize language tabs
  if (document.querySelector('.language-tabs')) {
    initLanguageTabs();
  }
  
  // Initialize modals
  initModals();
});

// Handle initial anchor links
function handleInitialAnchorLinks() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Delay scrolling slightly to ensure page is fully loaded
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
}

// Initialize search functionality
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  const sidebarHeadings = document.querySelectorAll('.sidebar-nav h3');
  let searchTimeout;
  
  // Add clear button to search
  const searchContainer = searchInput.parentElement;
  const clearButton = document.createElement('button');
  clearButton.className = 'search-clear-button';
  clearButton.innerHTML = '&times;';
  clearButton.style.display = 'none';
  clearButton.setAttribute('aria-label', 'Clear search');
  searchContainer.appendChild(clearButton);
  
  // Style the clear button
  const style = document.createElement('style');
  style.textContent = `
    .search-clear-button {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #4b5563;
      font-size: 18px;
      cursor: pointer;
      display: none;
    }
    .search-container {
      position: relative;
    }
    .search-results-summary {
      font-size: 0.8rem;
      color: #4b5563;
      margin-bottom: 1rem;
    }
  `;
  document.head.appendChild(style);
  
  // Add search results summary
  const searchSummary = document.createElement('div');
  searchSummary.className = 'search-results-summary';
  searchSummary.style.display = 'none';
  searchContainer.insertAdjacentElement('afterend', searchSummary);
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Show/hide clear button
    clearButton.style.display = searchTerm ? 'block' : 'none';
    
    // Debounce search for better performance
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      let visibleItems = 0;
      let matchedCategories = new Set();
      
      // Hide/show navigation items based on search
      sidebarLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        const listItem = link.parentElement;
        
        if (text.includes(searchTerm) || searchTerm === '') {
          listItem.style.display = '';
          if (searchTerm !== '') {
            visibleItems++;
            // Find the heading for this link
            let heading = link;
            while (heading && heading.tagName !== 'H3') {
              heading = heading.parentElement.previousElementSibling;
              if (heading && heading.tagName === 'H3') {
                matchedCategories.add(heading);
              }
            }
            
            // Highlight the matching text
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const highlightedText = text.replace(regex, '<mark>$1</mark>');
            // Only update the innerHTML if we have a match to avoid unnecessary DOM manipulation
            if (text.includes(searchTerm)) {
              link.innerHTML = link.innerHTML.replace(link.textContent, link.textContent.replace(regex, '<mark>$1</mark>'));
            }
          } else {
            // Reset to original text if search is cleared
            link.innerHTML = link.textContent;
          }
        } else {
          listItem.style.display = 'none';
        }
      });
      
      // Show/hide section headings based on whether they have visible children
      sidebarHeadings.forEach(heading => {
        if (searchTerm === '') {
          heading.style.display = '';
        } else if (matchedCategories.has(heading)) {
          heading.style.display = '';
        } else {
          heading.style.display = 'none';
        }
      });
      
      // Update search summary
      if (searchTerm) {
        searchSummary.style.display = 'block';
        searchSummary.textContent = `Found ${visibleItems} result${visibleItems !== 1 ? 's' : ''} for "${searchTerm}"`;
      } else {
        searchSummary.style.display = 'none';
      }
    }, 200);
  });
  
  // Clear search when button is clicked
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
  });
  
  // Clear search with Escape key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
    }
  });
}

// Highlight current nav item based on URL
function highlightCurrentNavItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav .page-link, .sidebar-nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    if (linkPath === currentPath || (currentPath.includes(linkPath) && linkPath !== '/')) {
      link.parentElement.classList.add('active');
      
      // Expand parent sections in sidebar if needed
      const parentUl = link.closest('ul');
      if (parentUl) {
        const parentHeading = parentUl.previousElementSibling;
        if (parentHeading && parentHeading.tagName === 'H3') {
          parentHeading.classList.add('active');
        }
      }
    }
  });
}

// Setup mobile navigation
function setupMobileNavigation() {
  const navTrigger = document.querySelector('.nav-trigger');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (navTrigger && menuIcon) {
    // Add ARIA attributes for accessibility
    navTrigger.setAttribute('aria-expanded', 'false');
    menuIcon.setAttribute('aria-label', 'Toggle navigation menu');
    
    navTrigger.addEventListener('change', function() {
      this.setAttribute('aria-expanded', this.checked);
    });
  }
}

// Setup mobile TOC
function setupMobileTOC() {
  const tocMobile = document.querySelector('.toc-mobile');
  if (tocMobile) {
    const details = tocMobile.querySelector('details');
    if (details) {
      const summary = details.querySelector('summary');
      summary.setAttribute('aria-expanded', 'false');
      
      details.addEventListener('toggle', function() {
        summary.setAttribute('aria-expanded', this.open);
      });
    }
  }
}

// Track reading progress
function trackReadingProgress() {
  const docContent = document.querySelector('.doc-content');
  const headings = docContent.querySelectorAll('h2, h3');
  const tocItems = document.querySelectorAll('.toc-mobile a, .sidebar-nav a');
  
  if (headings.length === 0) return;
  
  // Create a map of heading IDs to TOC links
  const headingMap = new Map();
  tocItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.startsWith('#')) {
      const id = href.substring(1);
      headingMap.set(id, item);
    } else if (href && href.includes('#')) {
      const id = href.split('#')[1];
      headingMap.set(id, item);
    }
  });
  
  // Create an IntersectionObserver to track visible headings
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const correspondingLink = headingMap.get(id);
          
          if (correspondingLink) {
            // Remove active class from all TOC items
            tocItems.forEach(item => {
              item.classList.remove('visible');
            });
            
            // Add active class to current TOC item
            correspondingLink.classList.add('visible');
          }
        }
      });
    },
    { rootMargin: '-80px 0px -80% 0px' }
  );
  
  // Observe all headings
  headings.forEach(heading => {
    if (heading.id) {
      observer.observe(heading);
    }
  });
}

// Initialize keyboard shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Only handle keyboard shortcuts when not typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    
    // Cmd/Ctrl + K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    // ? to show keyboard shortcuts (could implement a modal here)
    if (e.key === '?' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      // Show keyboard shortcuts modal (implementation left as an enhancement)
      console.log('Keyboard shortcuts: Cmd/Ctrl+K to search, ? to show this help');
    }
  });
}

// Add copy buttons to code blocks
function addCopyButtonsToCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(codeBlock => {
    const container = codeBlock.parentElement;
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.textContent = 'Copy';
    
    copyButton.addEventListener('click', () => {
      const code = codeBlock.textContent;
      
      navigator.clipboard.writeText(code).then(
        () => {
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        },
        () => {
          copyButton.textContent = 'Failed to copy';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        }
      );
    });
    
    container.style.position = 'relative';
    container.insertBefore(copyButton, codeBlock);
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!menuToggle.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('show')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('show');
      }
    });
  }
}

// Copy to clipboard functionality for code blocks
function initCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(codeBlock) {
    if (!codeBlock.querySelector('.copy-button')) {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';
      button.addEventListener('click', function() {
        const code = codeBlock.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(function() {
            button.textContent = 'Copied!';
            setTimeout(function() {
              button.textContent = 'Copy';
            }, 2000);
          }).catch(function() {
            button.textContent = 'Failed';
            setTimeout(function() {
              button.textContent = 'Copy';
            }, 2000);
          });
        }
      });
      codeBlock.appendChild(button);
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Language tabs functionality
function initLanguageTabs() {
  const languageTabs = document.querySelectorAll('.language-tabs');
  
  languageTabs.forEach(tabContainer => {
    const tabBlocks = tabContainer.querySelectorAll('.tab-content');
    const languages = [];
    
    // Create tabs navigation
    const tabsNav = document.createElement('ul');
    tabsNav.className = 'tabs-nav';
    
    tabBlocks.forEach((block, index) => {
      const lang = block.getAttribute('data-language') || `Example ${index + 1}`;
      languages.push(lang);
      
      const tabItem = document.createElement('li');
      const tabButton = document.createElement('button');
      tabButton.textContent = lang;
      tabButton.className = 'tab-button';
      tabButton.setAttribute('data-language', lang);
      
      if (index === 0) {
        tabButton.classList.add('active');
        block.classList.add('active');
      }
      
      tabButton.addEventListener('click', function() {
        // Store selected language in localStorage
        localStorage.setItem('preferredLanguage', lang);
        
        // Deactivate all tabs
        tabContainer.querySelectorAll('.tab-button').forEach(btn => {
          btn.classList.remove('active');
        });
        tabContainer.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Activate selected tab
        this.classList.add('active');
        block.classList.add('active');
      });
      
      tabItem.appendChild(tabButton);
      tabsNav.appendChild(tabItem);
    });
    
    // Insert tabs navigation before content
    tabContainer.insertBefore(tabsNav, tabContainer.firstChild);
    
    // Set preferred language if stored
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage && languages.includes(preferredLanguage)) {
      const tabButton = tabContainer.querySelector(`.tab-button[data-language="${preferredLanguage}"]`);
      if (tabButton) {
        tabButton.click();
      }
    }
  });
}

// Modal functionality
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-target');
      const modal = document.querySelector(modalId);
      
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Close with ESC key
        document.addEventListener('keydown', function escKeyHandler(e) {
          if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escKeyHandler);
          }
        });
        
        // Setup close buttons - Fix for both data-dismiss and close-modal class
        const closeButtons = modal.querySelectorAll('[data-dismiss="modal"], .close-modal');
        closeButtons.forEach(button => {
          button.addEventListener('click', function() {
            closeModal(modal);
          });
        });
        
        // Close when clicking outside modal content
        modal.addEventListener('click', function(event) {
          if (event.target === modal) {
            closeModal(modal);
          }
        });
      }
    });
  });
  
  function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Toggle collapse elements
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for collapse buttons
  document.addEventListener('click', function(e) {
    const target = e.target;
    // Check if the clicked element or its parent has data-toggle="collapse"
    const collapseToggle = target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') === 'collapse' ? 
                          target : 
                          target.closest('[data-toggle="collapse"]');
    
    if (collapseToggle) {
      e.preventDefault();
      const targetId = collapseToggle.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close all other collapse sections in the same container
        const container = targetSection.closest('.appreciate2');
        if (container) {
          container.querySelectorAll('.collapse.show').forEach(openSection => {
            // Skip the one we're toggling
            if (openSection.id !== targetId.substring(1)) {
              openSection.classList.remove('show');
            }
          });
        }
        
        // Toggle the clicked section
        targetSection.classList.toggle('show');
      }
    }
  });
}); 