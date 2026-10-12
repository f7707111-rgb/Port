// Runs in <head> so the saved theme is applied before first paint (no flash).
try {
  document.documentElement.dataset.theme = localStorage.getItem('kiki-theme') === 'dark' ? 'dark' : 'light';
} catch (e) {
  document.documentElement.dataset.theme = 'light';
}
