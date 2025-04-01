// Store the sidebar scroll position
let sidebarScrollPosition = 0;

document.addEventListener('DOMContentLoaded', function() {
  // Toggle Table of Contents on mobile
  const tocToggle = document.querySelector('.toggle-toc');
  const sidebarNav = document.querySelector('.sidebar-nav');
  
  if (tocToggle && sidebarNav) {
    tocToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      sidebarNav.classList.toggle('show');
      
      // Change the icon and text based on state
      if (sidebarNav.classList.contains('show')) {
        tocToggle.innerHTML = '<i class="fas fa-times"></i> Close Table of Contents';
      } else {
        tocToggle.innerHTML = '<i class="fas fa-bars"></i> Show Table of Contents';
      }
    });
  }
  
  // Enhanced active sidebar item highlighting
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  const currentPath = window.location.pathname;
  
  // First pass - exact match
  let activeFound = false;
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || currentPath === href) {
      link.parentElement.classList.add('active');
      
      // Highlight the section heading
      const section = link.closest('ul').previousElementSibling;
      if (section && section.tagName === 'H3') {
        section.classList.add('active-section');
      }
      
      activeFound = true;
      
      // Expand parent section if applicable
      let parent = link.parentElement.parentElement;
      while (parent) {
        if (parent.classList.contains('sidebar-nav')) break;
        if (parent.classList.contains('collapse')) {
          parent.classList.add('show');
          const controlElement = document.querySelector(`[data-bs-target="#${parent.id}"]`);
          if (controlElement) {
            controlElement.setAttribute('aria-expanded', 'true');
            controlElement.classList.remove('collapsed');
          }
        }
        parent = parent.parentElement;
      }
    }
  });
  
  // If no exact match, try partial match for section
  if (!activeFound) {
    const pathSegments = currentPath.split('.');
    if (pathSegments.length > 0) {
      const currentFile = pathSegments[0];
      sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        const hrefSegments = href.split('.');
        if (hrefSegments.length > 0 && href.includes(currentFile)) {
          link.parentElement.classList.add('active');
          activeFound = true;
        }
      });
    }
  }
  
  // Add search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      if (searchTerm.length < 2) {
        // Reset visibility
        sidebarLinks.forEach(link => {
          link.parentElement.style.display = '';
          const section = link.closest('ul').previousElementSibling;
          if (section && section.tagName === 'H3') {
            section.style.display = '';
          }
        });
        return;
      }
      
      // Track which sections have visible items
      const sectionsWithVisibleItems = new Set();
      
      // Hide/show links based on search
      sidebarLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        const matchesSearch = linkText.includes(searchTerm);
        link.parentElement.style.display = matchesSearch ? '' : 'none';
        
        if (matchesSearch) {
          const section = link.closest('ul').previousElementSibling;
          if (section && section.tagName === 'H3') {
            sectionsWithVisibleItems.add(section);
          }
        }
      });
      
      // Show/hide section headings
      document.querySelectorAll('.sidebar-nav h3').forEach(heading => {
        heading.style.display = sectionsWithVisibleItems.has(heading) ? '' : 'none';
      });
    });
    
    // Clear search on escape key
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        e.target.value = '';
        // Trigger input event to reset visibility
        e.target.dispatchEvent(new Event('input'));
      }
    });
  }
  
  // First pass: find UI examples and prevent adding buttons to them
  document.querySelectorAll('pre code').forEach(codeBlock => {
    const text = codeBlock.textContent.trim();
    // Check if this is a small code block with 'Copy' text that likely represents a UI element
    if (text.length < 200 && text.includes('Copy') && codeBlock.textContent.split('\n').length <= 3) {
      const pre = codeBlock.parentElement;
      pre.classList.add('ui-example');
      // Create a flag to prevent adding buttons later
      pre.dataset.isUiExample = 'true';
    }
  });

  // Second pass: add copy buttons to non-UI code blocks
  document.querySelectorAll('pre').forEach((pre, index) => {
    // Skip if already marked as UI example
    if (pre.dataset.isUiExample === 'true') {
      return;
    }
    
    // Skip if we already have a copy button
    if (pre.querySelector('.copy-button')) {
      return;
    }

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    pre.appendChild(copyButton);
    
    const codeBlock = pre.querySelector('code');
    if (codeBlock) {
      copyButton.addEventListener('click', function() {
        const code = codeBlock.textContent;
        navigator.clipboard.writeText(code).then(() => {
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy:', err);
          copyButton.textContent = 'Error!';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        });
      });
    }
  });
  
  // Third pass: cleanup - find and remove any duplicate buttons
  setTimeout(() => {
    // This runs after the page is fully loaded
    document.querySelectorAll('pre').forEach(pre => {
      const buttons = pre.querySelectorAll('.copy-button, button');
      // If we have more than one button or the content contains "Copy" text
      if (buttons.length > 1 || (pre.textContent.includes('Copy') && buttons.length > 0)) {
        // Keep only one button (the last one)
        buttons.forEach((button, index) => {
          if (index < buttons.length - 1) {
            button.remove();
          }
        });
      }
    });
  }, 500);
  
  // On-page navigation - smooth scroll to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL hash without scrolling
        history.pushState(null, null, href);
      }
    });
  });
  
  // Add table of contents from headings if needed
  const addTableOfContents = () => {
    const tocContainer = document.querySelector('.page-toc');
    if (!tocContainer) return;
    
    const headings = document.querySelectorAll('.doc-content h2, .doc-content h3');
    if (headings.length < 3) {
      tocContainer.style.display = 'none';
      return;
    }
    
    const toc = document.createElement('ul');
    toc.className = 'page-toc-list';
    
    headings.forEach((heading, index) => {
      // Add IDs to headings if they don't have one
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = heading.textContent;
      link.setAttribute('href', `#${heading.id}`);
      
      // Add class based on heading level for indentation
      if (heading.tagName === 'H3') {
        listItem.classList.add('toc-subitem');
      }
      
      listItem.appendChild(link);
      toc.appendChild(listItem);
    });
    
    tocContainer.appendChild(toc);
  };
  
  addTableOfContents();
  
  // Add observer for headings to update active TOC item
  const observeHeadings = () => {
    const headings = document.querySelectorAll('.doc-content h2, .doc-content h3');
    if (headings.length === 0) return;
    
    // Set up intersection observer
    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Find corresponding TOC item
          const tocLinks = document.querySelectorAll('.page-toc-list a');
          tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    // Observe all headings
    headings.forEach(heading => {
      observer.observe(heading);
    });
  };
  
  observeHeadings();

  const sidebar = document.querySelector('.sidebar-container');
  
  // Save scroll position when user scrolls the sidebar
  if (sidebar) {
    sidebar.addEventListener('scroll', function() {
      sidebarScrollPosition = sidebar.scrollTop;
    });
  }
  
  // Capture clicks on sidebar navigation links
  const tocSidebarLinks = document.querySelectorAll('.sidebar-nav a');
  tocSidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Store the current scroll position
      localStorage.setItem('sidebarScrollPosition', sidebarScrollPosition);
    });
  });
  
  // Restore scroll position after page load
  if (sidebar) {
    const savedPosition = localStorage.getItem('sidebarScrollPosition');
    if (savedPosition) {
      sidebar.scrollTop = parseInt(savedPosition);
    }
    
    // Ensure the active link is visible in the TOC
    const activeLink = sidebar.querySelector('.active a, a.active');
    if (activeLink) {
      // Only scroll if the active link is outside the viewport
      const linkRect = activeLink.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      
      if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
        // Scroll the active link into view with some margin
        activeLink.scrollIntoView({ block: 'center' });
        // Save the new position
        sidebarScrollPosition = sidebar.scrollTop;
        localStorage.setItem('sidebarScrollPosition', sidebarScrollPosition);
      }
    }
  }
}); 