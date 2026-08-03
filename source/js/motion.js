/* global NexT, CONFIG */

NexT.motion = {};

NexT.motion.integrator = {
  queue: [],
  init() {
    this.queue = [];
    return this;
  },
  add(fn) {
    const sequence = fn();
    this.queue.push(sequence);
    return this;
  },
  bootstrap() {
    if (typeof Element.prototype.animate !== 'function') {
      document.body.classList.remove('use-motion');
      CONFIG.motion.enable = false;
      return;
    }
    if (!CONFIG.motion.async) this.queue = [this.queue.flat()];
    this.queue.forEach(sequence => this.schedule(sequence));
  },
  schedule(sequence) {
    let cursor = 0;
    sequence.forEach(item => {
      const duration = item.duration ?? CONFIG.motion?.duration ?? 200;
      const start = Math.max(0, cursor - (item.overlap ?? 0));
      const end = start + duration;
      cursor = Math.max(cursor, end);

      if (item.styles) {
        const targets = typeof item.targets === 'string' ? document.querySelectorAll(item.targets) : [item.targets].filter(Boolean);
        targets.forEach(target => {
          const animation = target.animate([{}, item.styles], {
            delay : start,
            duration,
            easing: 'linear',
            fill  : 'forwards'
          });
          animation.finished.then(() => {
            Object.assign(target.style, item.styles);
            animation.cancel();
          }).catch(() => {});
        });
      }
      if (item.complete) setTimeout(item.complete, end);
    });
  }
};

NexT.motion.middleWares = {
  header() {
    const sequence = [];

    function getMistLineSettings(targets) {
      sequence.push({
        targets,
        styles  : { transform: 'scaleX(1)' },
        duration: 500,
        overlap : 200
      });
    }

    function pushToSequence(targets, sequenceQueue = false) {
      sequence.push({
        targets,
        styles : { opacity: 1, top: '0px' },
        overlap: sequenceQueue ? 200 : 0
      });
    }

    pushToSequence('.column');
    CONFIG.scheme === 'Mist' && getMistLineSettings('.logo-line');
    CONFIG.scheme === 'Muse' && pushToSequence('.custom-logo-image');
    pushToSequence('.site-title');
    pushToSequence('.site-brand-container .toggle', true);
    pushToSequence('.site-subtitle');
    (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') && pushToSequence('.custom-logo-image');

    const menuItemTransition = CONFIG.motion.transition.menu_item;
    if (menuItemTransition) {
      document.querySelectorAll('.menu-item').forEach(targets => {
        sequence.push({
          targets,
          complete: () => targets.classList.add('animated', menuItemTransition),
          overlap : 200
        });
      });
    }

    return sequence;
  },

  subMenu() {
    const subMenuItem = document.querySelectorAll('.sub-menu .menu-item');
    if (subMenuItem.length > 0) {
      subMenuItem.forEach(element => {
        element.classList.add('animated');
      });
    }
    return [];
  },

  postList() {
    const sequence = [];
    const { post_block, post_header, post_body, coll_header } = CONFIG.motion.transition;

    function animate(animation, elements) {
      if (!animation) return;
      elements.forEach(targets => {
        sequence.push({
          targets,
          complete: () => targets.classList.add('animated', animation),
          overlap : 100
        });
      });
    }

    document.querySelectorAll('.post-block').forEach(targets => {
      sequence.push({
        targets,
        complete: () => targets.classList.add('animated', post_block),
        overlap : 100
      });
      animate(coll_header, targets.querySelectorAll('.collection-header'));
      animate(post_header, targets.querySelectorAll('.post-header'));
      animate(post_body, targets.querySelectorAll('.post-body'));
    });

    animate(post_block, document.querySelectorAll('.pagination, .comments'));

    return sequence;
  },

  sidebar() {
    const sequence = [];
    const sidebar = document.querySelectorAll('.sidebar-inner');
    const sidebarTransition = CONFIG.motion.transition.sidebar;
    // Only for desktop of Pisces | Gemini.
    if (sidebarTransition && (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') && window.innerWidth >= 992) {
      sidebar.forEach(targets => {
        sequence.push({
          targets,
          complete: () => targets.classList.add('animated', sidebarTransition),
          overlap : 100
        });
      });
    }
    return sequence;
  },

  footer() {
    return [{
      targets: document.querySelector('.footer'),
      styles : { opacity: 1 }
    }];
  }
};
