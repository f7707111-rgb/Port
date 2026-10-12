// "Toolkit" window: renders the apps list and handles open/close.
(function () {
  'use strict';
  const modal = document.getElementById('sw-modal');
  if (!modal) return;

  // Build the lists from js/data/toolkit.js
  const ICONS = 'assets/icons/apps/';
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  function row(item) {
    const li = el('li', 'sw-row');
    const icon = el('span', 'sw-icon');
    const img = el('img');
    img.src = ICONS + item.icon + '.svg';
    img.alt = '';
    img.width = 26;
    img.height = 26;
    img.decoding = 'async';
    icon.append(img);
    const name = el('div', 'sw-name');
    name.append(el('strong', '', item.name));
    if (item.meta) name.append(el('small', '', item.meta));
    const mirrors = el('div', 'sw-mirrors');
    (item.tags || []).forEach((tag) => mirrors.append(el('span', 'sw-mirror sw-tag', tag)));
    (item.mirrors || []).forEach((m) => {
      const a = el('a', 'sw-mirror', m.label);
      a.href = m.url;
      a.target = '_blank';
      a.rel = 'noopener';
      const arrow = el('span', '', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      a.append(arrow);
      mirrors.append(a);
    });
    li.append(icon, name, mirrors);
    return li;
  }
  document.querySelectorAll('[data-sw-list]').forEach((list) => {
    const items = (window.KIKI_SOFTWARE || {})[list.dataset.swList] || [];
    list.append(...items.map(row));
    const counter = document.querySelector('[data-sw-count="' + list.dataset.swList + '"]');
    if (counter) counter.textContent = items.length;
  });

  let lastFocus = null,
    closeTimer = 0,
    isOpen = false;
  function open(push) {
    if (isOpen) return;
    isOpen = true;
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.documentElement.classList.add('sw-lock');
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));
    modal.querySelector('.sw-close').focus({ preventScroll: true });
    if (push && location.hash !== '#toolkit') history.pushState({ sw: 1 }, '', '#toolkit');
  }
  function close(fromHistory) {
    if (!isOpen) return;
    isOpen = false;
    modal.classList.remove('open');
    document.documentElement.classList.remove('sw-lock');
    closeTimer = setTimeout(() => {
      modal.hidden = true;
    }, 320);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    if (!fromHistory && location.hash === '#toolkit') {
      if (history.state && history.state.sw) history.back();
      else history.replaceState(null, '', location.pathname + location.search);
    }
  }
  document.querySelectorAll('[data-sw-open]').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open(true);
    }),
  );
  modal.querySelectorAll('[data-sw-close]').forEach((el) => el.addEventListener('click', () => close(false)));
  // While the window is open, keep keys away from the Game Boy controls.
  window.addEventListener(
    'keydown',
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        close(false);
        return;
      }
      if (e.key === 'Tab') {
        const f = [...modal.querySelectorAll('button, a[href]')];
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      e.stopPropagation();
    },
    true,
  );
  window.addEventListener(
    'keyup',
    (e) => {
      if (isOpen) e.stopPropagation();
    },
    true,
  );
  window.addEventListener('popstate', () => {
    location.hash === '#toolkit' ? open(false) : close(true);
  });
  if (location.hash === '#toolkit') open(false);
})();
