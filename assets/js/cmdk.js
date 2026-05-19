function openCmdK() {
  document.getElementById('cmdk').classList.add('show');
  setTimeout(() => document.getElementById('cmdk-input').focus(), 50);
  
  if (!window.pagefindLoaded) {
    const script = document.createElement('script');
    script.src = '/pagefind/pagefind.js';
    script.onload = async () => {
      window.pagefindLoaded = true;
      await pagefind.options({ baseUrl: '/' });
      await pagefind.init();
    };
    document.head.appendChild(script);
  }
}

function closeCmdK() {
  document.getElementById('cmdk').classList.remove('show');
}

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const isShowing = document.getElementById('cmdk').classList.contains('show');
    if (isShowing) closeCmdK(); else openCmdK();
  } else if (e.key === 'Escape') {
    closeCmdK();
  }
});

document.getElementById('cmdk-input').addEventListener('input', async (e) => {
  if (!window.pagefindLoaded) return;
  const query = e.target.value;
  const resultsDiv = document.getElementById('cmdk-results');
  if (!query) {
    resultsDiv.innerHTML = '';
    return;
  }
  const search = await pagefind.search(query);
  resultsDiv.innerHTML = '';
  
  for (const result of search.results.slice(0, 5)) {
    const data = await result.data();
    resultsDiv.innerHTML += `<a href="${data.url}" class="block px-5 py-2 hover:bg-ink/5 border-b border-ink/5 last:border-0"><div class="font-medium">${data.meta.title}</div><div class="text-sm text-ink/60 truncate">${data.excerpt}</div></a>`;
  }
});
