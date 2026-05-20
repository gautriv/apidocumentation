const NAME_KEY = 'apidocs.firstName';

function applyName(name) {
  const trimmed = (name || '').trim();
  const has = !!trimmed;
  document.body.classList.toggle('has-name', has);
  document.querySelectorAll('.hero-name').forEach(el => el.textContent = trimmed || 'friend');
  const navName = document.getElementById('nav-name');
  if (navName) navName.textContent = trimmed || 'friend';
  
  const eyebrowDefault = document.getElementById('eyebrow-default');
  const eyebrowPersonal = document.getElementById('eyebrow-personal');
  if (eyebrowDefault) eyebrowDefault.classList.toggle('hidden', has);
  if (eyebrowPersonal) eyebrowPersonal.classList.toggle('hidden', !has);
  
  document.querySelectorAll('.name-only-inline').forEach(el => el.style.display = has ? '' : 'none');
  document.querySelectorAll('.default-only').forEach(el => el.style.display = has ? 'none' : '');
  
  const pill = document.querySelector('.name-only.items-center');
  if (pill) {
    if (has) { pill.classList.remove('hidden'); pill.classList.add('flex'); }
    else { pill.classList.add('hidden'); pill.classList.remove('flex'); }
  }
  document.querySelectorAll('section.name-only, button.name-only').forEach(el => {
    if (has) { el.classList.remove('hidden'); }
    else { el.classList.add('hidden'); }
  });
}

function loadName() {
  try { return localStorage.getItem(NAME_KEY) || ''; } catch (e) { return ''; }
}
function saveNameStr(s) {
  try { localStorage.setItem(NAME_KEY, s); } catch (e) {}
}
function clearNameStr() {
  try { localStorage.removeItem(NAME_KEY); } catch (e) {}
}

window.addEventListener('load', () => {
  applyName(loadName());
  if (!loadName() && !sessionStorage.getItem('apidocs.skipped')) {
    setTimeout(openNameModal, 2200);
  }
});

function openNameModal() {
  const m = document.getElementById('name-modal');
  if (m) {
    m.classList.add('show');
    setTimeout(() => document.getElementById('name-input').focus(), 60);
  }
}
function closeNameModal(skipped) {
  const m = document.getElementById('name-modal');
  if (m) m.classList.remove('show');
  if (skipped) try { sessionStorage.setItem('apidocs.skipped', '1'); } catch (e) {}
}
function startCourse(e) {
  if (loadName()) return;
  if (e) e.preventDefault();
  openNameModal();
}
function saveName(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('name-input');
  const v = input ? input.value.trim() : '';
  if (v) saveNameStr(v);
  applyName(v);
  closeNameModal();
}
function resetName() {
  clearNameStr();
  applyName('');
}
function toggleSheet() { document.body.classList.toggle('sheet-open'); }
