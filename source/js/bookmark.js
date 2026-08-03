/* global NexT, CONFIG */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const doSaveScroll = () => {
    localStorage.setItem('bookmark' + location.pathname, window.scrollY);
  };

  const scrollToMark = () => {
    let top = localStorage.getItem('bookmark' + location.pathname);
    top = Number(top);
    // If the page opens with a specific hash, just jump out
    if (!isNaN(top) && location.hash === '') {
      // Auto scroll to the position
      NexT.utils.scrollTo(window, top);
    }
  };
  // Register everything
  const init = function(trigger) {
    // Create a link element
    const link = document.querySelector('.book-mark-link');
    // Scroll event
    window.addEventListener('scroll', () => link.classList.toggle('book-mark-link-fixed', window.scrollY === 0), { passive: true });
    // Register beforeunload event when the trigger is auto
    if (trigger === 'auto') {
      // Register beforeunload event
      window.addEventListener('beforeunload', doSaveScroll);
      document.addEventListener('pjax:send', doSaveScroll);
    }
    // Save the position by clicking the icon
    link.addEventListener('click', () => {
      doSaveScroll();
      if (typeof link.animate !== 'function') {
        link.style.top = '-30px';
        setTimeout(() => {
          link.style.top = '';
        }, 600);
        return;
      }
      const animation = link.animate([{}, { top: '-30px' }], {
        duration: 200,
        easing  : 'linear',
        fill    : 'forwards'
      });
      animation.finished.then(() => {
        link.style.top = '-30px';
        animation.cancel();
        setTimeout(() => {
          link.style.top = '';
        }, 400);
      }).catch(() => {});
    });
    scrollToMark();
    document.addEventListener('pjax:success', scrollToMark);
  };

  init(CONFIG.bookmark.save);
});
