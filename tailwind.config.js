/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_docs/**/*.md',
    './practice-exercises/**/*.{html,md}',
    './resources/**/*.{html,md}',
    './*.html',
    './*.md',
    './assets/js/**/*.js'
  ],
  // JS toggles these on/off at runtime — Tailwind can't see them via static scanning.
  safelist: [
    'name-only', 'tip-open', 'show', 'has-name', 'sheet-open',
    'border-ink', 'border-copper', 'border-sage',
    'text-ink', 'text-copper', 'text-sage',
    'callout--tip', 'callout--warning', 'callout--recap', 'callout--exercise', 'callout--note',
    { pattern: /^(text|bg|border)-(ink|cream|copper|sage)\/(5|10|15|20|25|30|40|45|50|55|60|65|70|75|80|85|90)$/ }
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        ink: '#0c1a2b',
        cream: '#fbf8f3',
        copper: '#b85c38',
        sage: '#5a7a64'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
