/* global CONFIG, gio */

document.addEventListener('page:loaded', () => {
  gio('init', `${CONFIG.growingio_analytics}`, {});
  gio('send');
});
