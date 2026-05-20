document.addEventListener('DOMContentLoaded', () => {
  const adElements = document.querySelectorAll('.adsbygoogle');
  if (adElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px' });

  adElements.forEach(ad => observer.observe(ad));
});
