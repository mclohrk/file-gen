// theme.js — alternância dark/light persistida
const Theme = (() => {
  let mode = localStorage.getItem('filegen-theme') || 'dark';

  function apply() {
    document.documentElement.setAttribute('data-theme', mode);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
  }

  function toggle() {
    mode = mode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('filegen-theme', mode);
    apply();
  }

  return { apply, toggle };
})();
