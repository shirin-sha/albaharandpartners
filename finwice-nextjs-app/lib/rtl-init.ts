// Runs before React to set <html dir> and the .rtl class using the "rtl" cookie.
// Keeps SSR/Hydration consistent and prevents layout flashing.
export const rtlInitScript = `
(function() {
  try {
    // Read cookie
    var m = document.cookie.match(/(?:^|; )rtl=([^;]+)/);
    var isRtl = m && decodeURIComponent(m[1]) === 'true';

    // Apply to <html> immediately
    var html = document.documentElement;
    var nextDir = isRtl ? 'rtl' : 'ltr';
    if (html.getAttribute('dir') !== nextDir) html.setAttribute('dir', nextDir);

    // Ensure .rtl class toggled
    if (isRtl) {
      if (!html.classList.contains('rtl')) html.classList.add('rtl');
    } else {
      if (html.classList.contains('rtl')) html.classList.remove('rtl');
    }
  } catch (e) {
    // fail-safe: do nothing
  }
})();
`;
