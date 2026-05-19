document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code').forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (pre.querySelector('.copy-btn')) return;
    
    pre.style.position = 'relative';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn absolute top-2 right-2 bg-ink text-cream text-xs px-2 py-1 rounded opacity-0 transition-opacity hover:bg-copper';
    copyBtn.textContent = 'Copy';
    
    pre.appendChild(copyBtn);
    pre.addEventListener('mouseenter', () => copyBtn.style.opacity = '1');
    pre.addEventListener('mouseleave', () => copyBtn.style.opacity = '0');
    
    copyBtn.addEventListener('click', async () => {
      await navigator.clipboard.writeText(codeBlock.innerText);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 2000);
    });
  });
});
