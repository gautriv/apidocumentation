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
  let tip = svg.querySelector('.svg-tooltip');
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'svg-tooltip';
    tip.setAttribute('role', 'tooltip');
    tip.style.cssText = 'position:absolute;background:#1B1B1B;color:#F2EFE8;padding:4px 8px;font-size:12px;border-radius:3px;pointer-events:none;display:none;z-index:10;';
    svg.parentElement.style.position = svg.parentElement.style.position || 'relative';
    svg.parentElement.appendChild(tip);
  }

  const targets = svg.querySelectorAll('[data-tooltip]');
  const hide = () => { tip.style.display = 'none'; delete tip.dataset.target; };
  targets.forEach(t => {
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0');
    const show = () => {
      tip.textContent = t.getAttribute('data-tooltip');
      tip.style.display = 'block';
      t.setAttribute('aria-describedby', 'svg-tip');
      tip.id = 'svg-tip';
      tip.dataset.target = t.getAttribute('data-tooltip');
    };
    t.addEventListener('mouseenter', show);
    t.addEventListener('mouseleave', hide);
    t.addEventListener('focus', show);
    t.addEventListener('blur', hide);
    t.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShownForThis = tip.style.display === 'block' && tip.dataset.target === t.getAttribute('data-tooltip');
      if (isShownForThis) {
        hide();
      } else {
        show();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!svg.contains(e.target)) hide();
  });
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
