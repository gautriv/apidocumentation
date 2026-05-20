document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('ai-bubble');
  const panel = document.getElementById('ai-chat-panel');
  if (!toggleBtn || !panel) return;
  
  window.toggleChat = () => {
    panel.classList.toggle('show');
  };
  
  const form = panel.querySelector('form');
  const input = form.querySelector('input');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    
    // In a real implementation, this would call the Cloudflare Worker URL
    alert('Mockup — would call Cloudflare Worker + Claude Haiku for: ' + query);
    input.value = '';
  });
});
