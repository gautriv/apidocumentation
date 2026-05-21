// Central framework for lesson interactive SVGs.
// Each SVG declares its pattern via data-svg-pattern on the root <svg>.
// Patterns: click-step, hover-tooltip, toggle, slider.

const patterns = {
  'click-step': initClickStep,
  'hover-tooltip': initHoverTooltip,
  'toggle': initToggle,
  'slider': initSlider
};

export function initInteractiveSvgs(root = document) {
  const svgs = root.querySelectorAll('svg[data-svg-pattern]');
  svgs.forEach(svg => {
    const pattern = svg.dataset.svgPattern;
    const init = patterns[pattern];
    if (init) init(svg);
  });
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initClickStep(svg) {
  const total = parseInt(svg.dataset.steps || '0', 10);
  svg.dataset.currentStep = '0';
  if (!svg.hasAttribute('tabindex')) svg.setAttribute('tabindex', '0');
  if (!svg.hasAttribute('role')) svg.setAttribute('role', 'button');
  if (!svg.hasAttribute('aria-label')) svg.setAttribute('aria-label', 'Click or press Enter to advance');

  const advance = () => {
    const next = (parseInt(svg.dataset.currentStep, 10) + 1) % Math.max(total, 1);
    svg.dataset.currentStep = String(next);
    svg.querySelectorAll('[data-step]').forEach(node => {
      const isActive = node.dataset.step === String(next);
      node.classList.toggle('is-active', isActive);
    });
    svg.dispatchEvent(new CustomEvent('svg:step', { detail: { step: next } }));
  };

  svg.addEventListener('click', advance);
  svg.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); }
  });
}

function initToggle(svg) {
  const states = (svg.dataset.states || 'A,B').split(',');
  svg.dataset.state = states[0];
  if (!svg.hasAttribute('tabindex')) svg.setAttribute('tabindex', '0');
  if (!svg.hasAttribute('role')) svg.setAttribute('role', 'switch');
  svg.setAttribute('aria-checked', 'false');

  const flip = () => {
    const idx = states.indexOf(svg.dataset.state);
    const next = states[(idx + 1) % states.length];
    svg.dataset.state = next;
    svg.setAttribute('aria-checked', String(next !== states[0]));
    const label = svg.querySelector('.toggle-label');
    if (label) label.textContent = next;
    svg.dispatchEvent(new CustomEvent('svg:toggle', { detail: { state: next } }));
  };

  svg.addEventListener('click', flip);
  svg.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
  });
}

function initHoverTooltip(svg) {
  // Shared tooltip lives on <body> so overflow:hidden on ancestor
  // wrappers cannot clip it. One tooltip is reused across all targets
  // and all hover-tooltip SVGs on the page.
  let tip = document.body.querySelector('.svg-tooltip-shared');
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'svg-tooltip-shared';
    tip.setAttribute('role', 'tooltip');
    Object.assign(tip.style, {
      position: 'absolute',
      pointerEvents: 'none',
      background: '#1B1B1B',
      color: '#F2EFE8',
      padding: '8px 12px',
      fontSize: '13px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.45',
      borderRadius: '4px',
      maxWidth: '280px',
      boxShadow: '0 6px 18px rgba(12, 26, 43, 0.18)',
      zIndex: '1000',
      display: 'none',
      opacity: '0',
      transition: 'opacity 0.12s ease'
    });
    document.body.appendChild(tip);
  }

  const place = (targetEl) => {
    const r = targetEl.getBoundingClientRect();
    tip.style.display = 'block';
    const tr = tip.getBoundingClientRect();
    const pad = 8;
    let left = r.left + r.width / 2 - tr.width / 2 + window.scrollX;
    let top = r.top - tr.height - 10 + window.scrollY;
    if (r.top < tr.height + 12) {
      top = r.bottom + 10 + window.scrollY;
    }
    const minLeft = pad + window.scrollX;
    const maxLeft = window.scrollX + window.innerWidth - tr.width - pad;
    left = Math.max(minLeft, Math.min(left, maxLeft));
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  };

  const hide = () => {
    tip.style.opacity = '0';
    tip.style.display = 'none';
    delete tip.dataset.active;
  };

  const show = (targetEl) => {
    tip.textContent = targetEl.getAttribute('data-tooltip');
    place(targetEl);
    requestAnimationFrame(() => { tip.style.opacity = '1'; });
    tip.dataset.active = targetEl.getAttribute('data-tooltip');
  };

  const targets = svg.querySelectorAll('[data-tooltip]');
  targets.forEach(t => {
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0');
    t.addEventListener('mouseenter', () => show(t));
    t.addEventListener('mouseleave', hide);
    t.addEventListener('focus', () => show(t));
    t.addEventListener('blur', hide);
    t.addEventListener('click', (e) => {
      e.stopPropagation();
      const sameTarget = tip.dataset.active === t.getAttribute('data-tooltip')
        && tip.style.display !== 'none';
      if (sameTarget) hide();
      else show(t);
    });
  });

  document.addEventListener('click', (e) => {
    if (!svg.contains(e.target)) hide();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
  });
  window.addEventListener('scroll', hide, { passive: true });
}

function initSlider(svg) {
  const input = svg.querySelector('.slider-input');
  const label = svg.querySelector('.slider-value');
  if (!input) return;
  const sync = () => {
    if (label) label.textContent = input.value;
    svg.dataset.value = input.value;
    svg.dispatchEvent(new CustomEvent('svg:slide', { detail: { value: input.value } }));
  };
  input.addEventListener('input', sync);
  sync();
}

// Auto-init on DOMContentLoaded for production pages.
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initInteractiveSvgs());
  } else {
    initInteractiveSvgs();
  }
}

// Exported for the test harness.
export const _testHooks = { patterns, prefersReducedMotion };
