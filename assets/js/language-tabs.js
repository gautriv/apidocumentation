document.addEventListener('DOMContentLoaded', () => {
  initLanguageTabs();
  initCodeBlocks();
  console.log('Language tabs and code blocks initialized');
});

/**
 * Initialize language tabs functionality
 */
function initLanguageTabs() {
  // Find all language tab containers
  const languageTabContainers = document.querySelectorAll('.language-tabs');
  
  // Add global styles if they don't exist
  addLanguageTabsStyles();
  
  console.log(`Found ${languageTabContainers.length} language tab containers`);
  
  // Process each container
  languageTabContainers.forEach((container, containerIndex) => {
    const tabs = container.querySelectorAll('.language-tab');
    if (tabs.length === 0) return;
    
    console.log(`Container #${containerIndex} has ${tabs.length} tabs`);
    
    // Create navigation
    const tabsNav = document.createElement('div');
    tabsNav.className = 'language-tabs-navigation';
    tabsNav.setAttribute('role', 'tablist');
    
    // Create buttons for each tab
    tabs.forEach((tab, index) => {
      const language = tab.getAttribute('data-language');
      const button = document.createElement('button');
      const tabId = `tab-${containerIndex}-${index}`;
      const panelId = `panel-${containerIndex}-${index}`;
      
      // Set tab attributes for accessibility
      button.textContent = getLanguageDisplayName(language);
      button.setAttribute('data-language', language);
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', 'false');
      button.setAttribute('id', tabId);
      button.setAttribute('aria-controls', panelId);
      
      button.addEventListener('click', () => selectLanguageTab(container, language));
      button.addEventListener('keydown', (e) => {
        // Handle keyboard navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const buttons = Array.from(tabsNav.querySelectorAll('button'));
          const currentIndex = buttons.indexOf(e.target);
          const direction = e.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
          buttons[nextIndex].focus();
          buttons[nextIndex].click();
        }
      });
      
      tabsNav.appendChild(button);
      
      // Set panel attributes for accessibility
      tab.setAttribute('role', 'tabpanel');
      tab.setAttribute('id', panelId);
      tab.setAttribute('aria-labelledby', tabId);
      tab.setAttribute('tabindex', '0');
      
      console.log(`Added tab button for ${language}`);
    });
    
    // Insert navigation before the tabs
    container.insertBefore(tabsNav, container.firstChild);
    
    // Set active tab - either from localStorage or first tab
    const storedLanguage = localStorage.getItem('preferredLanguage');
    let activeTab = tabs[0].getAttribute('data-language');
    
    if (storedLanguage) {
      // Check if this container has the stored language
      const hasStoredLanguage = Array.from(tabs).some(tab => 
        tab.getAttribute('data-language') === storedLanguage
      );
      
      if (hasStoredLanguage) {
        activeTab = storedLanguage;
      }
    }
    
    // Activate the tab
    selectLanguageTab(container, activeTab);
  });
}

/**
 * Select a language tab within a container
 */
function selectLanguageTab(container, language) {
  // Save preference
  localStorage.setItem('preferredLanguage', language);
  
  // Update tabs
  container.querySelectorAll('.language-tab').forEach(tab => {
    if (tab.getAttribute('data-language') === language) {
      tab.classList.add('active');
      tab.removeAttribute('hidden');
      tab.setAttribute('tabindex', '0');
    } else {
      tab.classList.remove('active');
      tab.setAttribute('hidden', 'true');
      tab.setAttribute('tabindex', '-1');
    }
  });
  
  // Update buttons
  container.querySelectorAll('.language-tabs-navigation button').forEach(button => {
    if (button.getAttribute('data-language') === language) {
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
    } else {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
    }
  });
  
  console.log(`Selected language: ${language}`);
}

/**
 * Initialize all code blocks with copy buttons
 */
function initCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach((codeBlock) => {
    // Create wrapper if not in a language tab (those already have a wrapper)
    const isInTab = codeBlock.closest('.language-tab');
    if (!isInTab) {
      // Add a copy button
      const pre = codeBlock.parentNode;
      if (!pre.querySelector('.copy-code-button')) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-button';
        copyButton.textContent = 'Copy';
        copyButton.title = 'Copy code to clipboard';
        
        copyButton.addEventListener('click', () => {
          const code = codeBlock.textContent;
          copyToClipboard(code, copyButton);
        });
        
        pre.appendChild(copyButton);
      }
    }
  });
  
  // Also add copy buttons to the code blocks inside language tabs
  document.querySelectorAll('.language-tab pre').forEach(pre => {
    if (!pre.querySelector('.copy-code-button')) {
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.textContent = 'Copy';
      copyButton.title = 'Copy code to clipboard';
      
      copyButton.addEventListener('click', () => {
        const code = pre.querySelector('code') ? pre.querySelector('code').textContent : pre.textContent;
        copyToClipboard(code, copyButton);
      });
      
      pre.appendChild(copyButton);
    }
  });
}

/**
 * Copy text to clipboard and show feedback
 */
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(
    () => {
      // Success
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    },
    () => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      try {
        document.execCommand('copy');
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        button.textContent = 'Failed to copy';
        
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
      
      document.body.removeChild(textarea);
    }
  );
}

/**
 * Get display name for a language code
 */
function getLanguageDisplayName(code) {
  const displayNames = {
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'python': 'Python',
    'py': 'Python',
    'bash': 'Bash',
    'shell': 'Shell',
    'curl': 'cURL',
    'ruby': 'Ruby',
    'go': 'Go',
    'java': 'Java',
    'php': 'PHP',
    'csharp': 'C#',
    'cs': 'C#',
    'swift': 'Swift',
    'kotlin': 'Kotlin',
    'json': 'JSON',
    'xml': 'XML',
    'html': 'HTML',
    'css': 'CSS',
    'yaml': 'YAML',
    'typescript': 'TypeScript',
    'ts': 'TypeScript'
  };
  
  return displayNames[code.toLowerCase()] || code.charAt(0).toUpperCase() + code.slice(1);
}

/**
 * Add global styles for language tabs
 */
function addLanguageTabsStyles() {
  // Check if styles already exist
  if (document.getElementById('language-tabs-styles')) return;
  
  // Create style element
  const style = document.createElement('style');
  style.id = 'language-tabs-styles';
  
  // Note: We're adding basic styles here as a fallback in case the CSS file fails to load
  // The main styles should be in the CSS file
  style.textContent = `
    /* Basic fallback styles for language tabs */
    .language-tabs-navigation {
      display: flex;
      margin-bottom: 1rem;
      overflow-x: auto;
      scrollbar-width: thin;
      -ms-overflow-style: none;
    }
    .language-tabs-navigation::-webkit-scrollbar {
      height: 4px;
    }
    .language-tabs-navigation::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.2);
      border-radius: 4px;
    }
    .language-tabs-navigation button {
      background: none;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
    }
    .language-tabs-navigation button.active {
      border-bottom-color: #2563eb;
      font-weight: 500;
    }
    .language-tab {
      display: none;
    }
    .language-tab.active {
      display: block;
    }
    .copy-code-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.25rem 0.5rem;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .copy-code-button:hover {
      background: #f1f5f9;
    }
    .copy-code-button.copied {
      background: #10b981;
      color: white;
      border-color: #10b981;
    }
    pre {
      position: relative;
    }
  `;
  
  document.head.appendChild(style);
} 