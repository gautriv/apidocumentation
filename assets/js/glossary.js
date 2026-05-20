document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tip]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A' || el.tagName === 'BUTTON') return;
      document.querySelectorAll('[data-tip].tip-open').forEach(o => { 
        if (o !== el) o.classList.remove('tip-open'); 
      });
      el.classList.toggle('tip-open');
      e.stopPropagation();
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('[data-tip].tip-open').forEach(o => o.classList.remove('tip-open'));
  });
});
