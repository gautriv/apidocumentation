document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;
  
  const article = document.querySelector('article.prose');
  if (!article) return;

  const updateProgress = () => {
    const rect = article.getBoundingClientRect();
    const articleHeight = rect.height;
    const windowHeight = window.innerHeight;
    
    const scrolled = -rect.top;
    const scrollableDistance = articleHeight - windowHeight;
    
    if (scrollableDistance <= 0) {
      progressBar.style.width = '100%';
      return;
    }
    
    let progress = (scrolled / scrollableDistance) * 100;
    progress = Math.max(0, Math.min(100, progress));
    
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
});
