// Theme (light/dark) and language (EN/RU) switches, saved in localStorage.
(function () {
  'use strict';
  const translations = window.KIKI_TRANSLATIONS;

  const langButton = document.getElementById('lang-toggle');
  const themeButton = document.getElementById('theme-toggle');
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('kiki-theme', theme);
    } catch (e) {}
    if (!themeButton) return;
    themeButton.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  function setLanguage(lang) {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = t[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.dispatchEvent(new CustomEvent('kiki:language', { detail: lang }));
    try {
      localStorage.setItem('kiki-language', lang);
    } catch (e) {}
    if (!langButton) return;
    langButton.textContent = lang === 'en' ? 'RU' : 'EN';
    langButton.setAttribute('aria-label', lang === 'en' ? 'Switch to Russian' : 'Switch to English');
  }
  if (langButton)
    langButton.addEventListener('click', () => setLanguage(document.documentElement.lang === 'en' ? 'ru' : 'en'));
  if (themeButton)
    themeButton.addEventListener('click', () =>
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'),
    );
  let initialTheme = 'light';
  try {
    initialTheme = localStorage.getItem('kiki-theme') === 'dark' ? 'dark' : 'light';
  } catch (e) {}
  setTheme(initialTheme);
  let initialLanguage = 'en';
  try {
    initialLanguage = localStorage.getItem('kiki-language') === 'ru' ? 'ru' : 'en';
  } catch (e) {}
  setLanguage(initialLanguage);
})();
