// Main JavaScript for API Documentation Course

document.addEventListener('DOMContentLoaded', function() {
  // Question Box Functionality
  setupQuestionBoxes();
  
  // Mobile navigation toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navMenu && menuToggle && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Course Progress Tracking
  const trackCourseProgress = () => {
    // Course structure - each module has a number of chapters
    const courseStructure = {
      'introduction': { totalChapters: 4 },
      'rest-apis': { totalChapters: 2 },
      'anatomy': { totalChapters: 2 },
      'data-formats': { totalChapters: 4 },
      'api-documentation': { totalChapters: 7 },
      'developing-testing-rest-apis': { totalChapters: 3 },
      'documentation-testing': { totalChapters: 3 },
      'webhooks': { totalChapters: 4 },
      'api-documentation-tools': { totalChapters: 7 },
      'api-documentation-advanced': { totalChapters: 4 }
    };
    
    // Calculate total chapters across all modules
    const calculateTotalChapters = () => {
      let total = 0;
      for (const moduleId in courseStructure) {
        total += courseStructure[moduleId].totalChapters;
      }
      return total;
    };
    
    // Total modules and chapters
    const totalModules = Object.keys(courseStructure).length;
    const totalChapters = calculateTotalChapters();
    
    // Get progress data from localStorage
    const getProgressData = () => {
      try {
        const savedData = localStorage.getItem('courseProgress');
        return savedData ? JSON.parse(savedData) : {
          completedModules: [],
          completedChapters: {}
        };
      } catch (e) {
        console.error('Error retrieving course progress:', e);
        return {
          completedModules: [],
          completedChapters: {}
        };
      }
    };
    
    // Save progress data to localStorage
    const saveProgressData = (progressData) => {
      try {
        localStorage.setItem('courseProgress', JSON.stringify(progressData));
      } catch (e) {
        console.error('Error saving course progress:', e);
      }
    };
    
    // Mark current chapter as complete
    const markChapterComplete = (moduleId, chapterNum) => {
      const progressData = getProgressData();
      
      // Initialize the module's chapter array if it doesn't exist
      if (!progressData.completedChapters[moduleId]) {
        progressData.completedChapters[moduleId] = [];
      }
      
      // Add chapter to completed chapters if not already there
      if (!progressData.completedChapters[moduleId].includes(chapterNum)) {
        progressData.completedChapters[moduleId].push(chapterNum);
        
        // Check if all chapters in the module are complete
        if (progressData.completedChapters[moduleId].length === courseStructure[moduleId].totalChapters) {
          // Mark the entire module as complete if not already marked
          if (!progressData.completedModules.includes(moduleId)) {
            progressData.completedModules.push(moduleId);
          }
        }
        
        saveProgressData(progressData);
        updateProgressUI(progressData);
      }
    };
    
    // Calculate overall progress percentage
    const calculateProgress = (progressData) => {
      // Count total completed chapters
      let completedChaptersCount = 0;
      for (const moduleId in progressData.completedChapters) {
        completedChaptersCount += progressData.completedChapters[moduleId].length;
      }
      
      return Math.round((completedChaptersCount / totalChapters) * 100);
    };
    
    // Update progress bar and UI elements
    const updateProgressUI = (progressData) => {
      const progressPercentage = calculateProgress(progressData);
      
      // Update main progress bar
      const progressBar = document.querySelector('.progress-bar');
      const progressText = document.querySelector('.progress-percentage');
      
      if (progressBar && progressText) {
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}%`;
      }
      
      // Update module cards on the modules index page
      updateModuleCards(progressData);
      
      // Update chapter navigation if on a chapter page
      updateChapterNavigation(progressData);
    };
    
    // Update module cards with completion status
    const updateModuleCards = (progressData) => {
      const moduleCards = document.querySelectorAll('.module-card[data-module]');
      
      moduleCards.forEach(card => {
        const moduleId = card.getAttribute('data-module');
        const isModuleCompleted = progressData.completedModules.includes(moduleId);
        
        // Add completed class to the card if module is fully completed
        if (isModuleCompleted) {
          card.classList.add('completed');
          
          // Add completion badge
          if (!card.querySelector('.completion-badge')) {
            const badge = document.createElement('div');
            badge.className = 'completion-badge';
            badge.innerHTML = '<i class="fas fa-check"></i>';
            badge.setAttribute('title', 'Module Completed');
            card.appendChild(badge);
          }
        } 
        // If module is partially completed
        else if (progressData.completedChapters[moduleId] && 
                progressData.completedChapters[moduleId].length > 0) {
          card.classList.add('in-progress');
          
          // Add progress indicator
          if (!card.querySelector('.progress-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'progress-indicator';
            
            // Calculate module-specific progress
            const moduleProgress = Math.round(
              (progressData.completedChapters[moduleId].length / 
               courseStructure[moduleId].totalChapters) * 100
            );
            
            indicator.innerHTML = `<span>${moduleProgress}%</span>`;
            indicator.setAttribute('title', `${moduleProgress}% of module completed`);
            card.appendChild(indicator);
          } else {
            // Update existing progress indicator
            const indicator = card.querySelector('.progress-indicator');
            const moduleProgress = Math.round(
              (progressData.completedChapters[moduleId].length / 
               courseStructure[moduleId].totalChapters) * 100
            );
            indicator.innerHTML = `<span>${moduleProgress}%</span>`;
            indicator.setAttribute('title', `${moduleProgress}% of module completed`);
          }
        }
      });
    };
    
    // Update chapter navigation with completion status
    const updateChapterNavigation = (progressData) => {
      const chapterLinks = document.querySelectorAll('.chapter-nav-item');
      
      chapterLinks.forEach(link => {
        const moduleId = link.getAttribute('data-module');
        const chapterNum = parseInt(link.getAttribute('data-chapter'), 10);
        
        if (moduleId && chapterNum && progressData.completedChapters[moduleId]) {
          if (progressData.completedChapters[moduleId].includes(chapterNum)) {
            // Add completed class to the item itself, not just the link
            link.classList.add('completed');
            
            // Add completion icon if not already present
            if (!link.querySelector('.chapter-complete-icon')) {
              const icon = document.createElement('span');
              icon.className = 'chapter-complete-icon';
              icon.innerHTML = '<i class="fas fa-check-circle"></i>';
              
              // Append to the link element, not the list item
              const linkElement = link.querySelector('.chapter-nav-link');
              if (linkElement) {
                linkElement.appendChild(icon);
              }
            }
          }
        }
      });
    };
    
    // Check for chapter completion marker
    const chapterMarker = document.querySelector('.chapter-completion-marker');
    if (chapterMarker) {
      const moduleId = chapterMarker.getAttribute('data-module');
      const chapterNum = parseInt(chapterMarker.getAttribute('data-chapter'), 10);
      
      // Auto-mark chapter as visited
      if (moduleId && chapterNum) {
        // Use IntersectionObserver to detect when user has scrolled to bottom of chapter
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                markChapterComplete(moduleId, chapterNum);
              }, 5000); // Mark as complete after 5 seconds of viewing
              observer.disconnect(); // Stop observing once marked
            }
          });
        }, { threshold: 0.5 });
        
        // Observe the last section of the chapter content
        const chapterSections = document.querySelectorAll('.chapter-section');
        if (chapterSections.length > 0) {
          observer.observe(chapterSections[chapterSections.length - 1]);
        } else {
          // If no sections found, observe the marker itself
          observer.observe(chapterMarker);
        }
      }
    } 
    // For backwards compatibility - support module-level completion markers
    else {
      const moduleMarker = document.querySelector('.module-completion-marker');
      if (moduleMarker) {
        const moduleId = moduleMarker.getAttribute('data-module');
        
        if (moduleId) {
          // For module pages, mark all chapters as complete
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  // Mark all chapters in this module as complete
                  for (let i = 1; i <= courseStructure[moduleId].totalChapters; i++) {
                    markChapterComplete(moduleId, i);
                  }
                }, 5000);
                observer.disconnect();
              }
            });
          }, { threshold: 0.5 });
          
          const moduleSections = document.querySelectorAll('.module-section');
          if (moduleSections.length > 0) {
            observer.observe(moduleSections[moduleSections.length - 1]);
          } else {
            observer.observe(moduleMarker);
          }
        }
      }
    }
    
    // Initialize progress UI on page load
    const progressData = getProgressData();
    updateProgressUI(progressData);
  };
  
  // Initialize course progress tracking
  trackCourseProgress();
  
  // Initialize GSAP ScrollTrigger for animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements with data-scroll-animation attribute
    const scrollAnimElements = document.querySelectorAll('[data-scroll-animation]');
    
    scrollAnimElements.forEach(element => {
      const animationType = element.getAttribute('data-scroll-animation') || 'fade-up';
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom-=100',
        toggleClass: 'animate',
        once: true
      });
    });
    
    // Hero section parallax effect
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      gsap.to(heroImage, {
        y: 50,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }
  
  // Add active class to current page in navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // If the current path starts with the link's path, add active class
    if (currentPath === linkPath || 
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Simple slider for testimonials (for mobile view)
  const setupTestimonialsSlider = () => {
    const slider = document.querySelector('.testimonials-slider');
    const testimonials = slider ? slider.querySelectorAll('.testimonial') : [];
    
    if (slider && testimonials.length > 1 && window.innerWidth < 768) {
      let currentIndex = 0;
      const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
          testimonial.style.display = i === index ? 'block' : 'none';
        });
      };
      
      // Create navigation dots
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'slider-dots';
      
      testimonials.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `View testimonial ${i + 1}`);
        
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateSlider();
        });
        
        dotsContainer.appendChild(dot);
      });
      
      slider.appendChild(dotsContainer);
      
      const updateSlider = () => {
        showTestimonial(currentIndex);
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      };
      
      // Auto cycle through testimonials
      setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
      }, 5000);
      
      // Initial setup
      updateSlider();
    }
  };
  
  // Call slider setup
  setupTestimonialsSlider();
  
  // Handle resize events for responsive behavior
  window.addEventListener('resize', () => {
    // Re-setup testimonials slider on resize
    setupTestimonialsSlider();
  });

  // Modal handling
  const modal = document.getElementById('appreciateModal');
  const modalTrigger = document.querySelector('[data-toggle="modal"]');
  const closeModal = modal.querySelector('.close-modal');
  const paymentButtons = modal.querySelectorAll('[data-toggle="collapse"]');
  const collapseElements = modal.querySelectorAll('.collapse');
  
  // Open modal
  modalTrigger.addEventListener('click', function() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
  
  // Close modal
  function hideModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    // Hide all payment options when closing
    collapseElements.forEach(element => element.classList.remove('show'));
  }
  
  closeModal.addEventListener('click', hideModal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      hideModal();
    }
  });
  
  // Handle payment option toggles
  paymentButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.querySelector(targetId);
      
      // Hide all collapse elements
      collapseElements.forEach(element => {
        if (element !== targetElement) {
          element.classList.remove('show');
        }
      });
      
      // Toggle target element
      targetElement.classList.toggle('show');
    });
  });

  // Header scroll effect
  const header = document.querySelector('.site-header');
  const headerHeight = header.offsetHeight;
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow and change background opacity on scroll
    if (scrollTop > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Subtle hide/show on scroll down/up
    if (scrollTop > headerHeight) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Logo animation on hover
  const logoLink = document.querySelector('.logo-link');
  if (logoLink) {
    logoLink.addEventListener('mouseenter', function() {
      const logoIcon = this.querySelector('.logo-icon');
      if (logoIcon) {
        logoIcon.style.animation = 'none';
        setTimeout(function() {
          logoIcon.style.animation = 'pulse 3s infinite alternate';
        }, 10);
      }
    });
  }
});

// Function to setup question boxes
function setupQuestionBoxes() {
  const questionBoxes = document.querySelectorAll('.question-box');
  const questionToggles = document.querySelectorAll('.question-toggle');
  
  if (questionBoxes.length > 0) {
    console.log('Initializing', questionBoxes.length, 'question boxes');
    
    // Force reset any inline styles
    questionBoxes.forEach(box => {
      const content = box.querySelector('.question-box-content');
      if (content) {
        content.style.cssText = ''; // Clear any inline styles
        box.classList.remove('active');
      }
    });
    
    questionToggles.forEach(toggle => {
      // Remove existing event listeners to prevent duplicates
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
      
      newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const questionBox = this.closest('.question-box');
        if (!questionBox) return;
        
        questionBox.classList.toggle('active');
        console.log('Question box toggled:', questionBox.classList.contains('active'));
      });
    });
  }
}

// Also run on window load to catch any dynamically loaded content
window.addEventListener('load', setupQuestionBoxes);

// Re-run whenever the URL changes or content is dynamically loaded
window.addEventListener('hashchange', setupQuestionBoxes); 