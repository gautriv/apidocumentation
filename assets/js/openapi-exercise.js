// OpenAPI Exercise Page Enhancements

document.addEventListener('DOMContentLoaded', function() {
  // Toggle solution content
  const solutionToggle = document.getElementById('solutionToggle');
  const solutionContent = document.getElementById('solutionContent');
  
  if (solutionToggle && solutionContent) {
    solutionToggle.addEventListener('click', function() {
      solutionContent.classList.toggle('visible');
      
      if (solutionContent.classList.contains('visible')) {
        solutionToggle.textContent = 'Hide Solution';
      } else {
        solutionToggle.innerHTML = '<i class="fas fa-lightbulb"></i> View Example Solution';
      }
    });
  }
  
  // Add copy buttons to code blocks ONLY if they don't already have one
  document.querySelectorAll('pre').forEach(function(codeBlock) {
    // Check if this code block already has a copy button (either as a sibling or as a child of a parent with class 'code-header')
    const parentElement = codeBlock.parentNode;
    const hasCopyButton = 
      (parentElement.querySelector('.copy-btn') !== null) || 
      (parentElement.classList.contains('code-header')) ||
      (codeBlock.querySelector('.copy-btn') !== null);
    
    // Only add a copy button if one doesn't exist already
    if (!hasCopyButton) {
      // Create the copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      
      // Add a div wrapper for positioning
      const wrapper = document.createElement('div');
      wrapper.className = 'code-header';
      
      // Replace the pre with the wrapper and move pre inside it
      codeBlock.parentNode.insertBefore(wrapper, codeBlock);
      wrapper.appendChild(codeBlock);
      wrapper.appendChild(copyBtn);
      
      // Add click event
      copyBtn.addEventListener('click', function() {
        const code = codeBlock.textContent;
        navigator.clipboard.writeText(code);
        
        // Visual feedback
        copyBtn.textContent = 'Copied!';
        setTimeout(function() {
          copyBtn.textContent = 'Copy';
        }, 2000);
      });
    }
  });
  
  // Add syntax highlighting for YAML
  document.querySelectorAll('pre code').forEach(function(codeElement) {
    if (codeElement.textContent.includes('openapi:')) {
      // Simple YAML syntax highlighting
      highlightYaml(codeElement);
    }
  });
  
  // Function to add basic YAML syntax highlighting
  function highlightYaml(codeElement) {
    let content = codeElement.innerHTML;
    
    // Highlight keys (words followed by a colon)
    content = content.replace(/([a-zA-Z0-9_-]+):/g, '<span class="key">$1:</span>');
    
    // Highlight strings (content in quotes)
    content = content.replace(/"([^"]*)"/g, '"<span class="string">$1</span>"');
    content = content.replace(/'([^']*)'/g, '\'<span class="string">$1</span>\'');
    
    // Highlight booleans
    content = content.replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>');
    
    // Highlight numbers
    content = content.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>');
    
    // Highlight comments
    content = content.replace(/(#.*)$/mg, '<span class="comment">$1</span>');
    
    codeElement.innerHTML = content;
  }
}); 