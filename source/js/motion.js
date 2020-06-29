/* global NexT, CONFIG, Velocity */

if (window.$ && window.$.Velocity) window.Velocity = window.$.Velocity;

NexT.motion = {};

NexT.motion.integrator = {
  queue : [],
  cursor: -1,
  init  : function() {
    this.queue = [];
    this.cursor = -1;
    return this;
  },
  add: function(fn) {
    this.queue.push(fn);
    return this;
  },
  next: function() {
    this.cursor++;
    const fn = this.queue[this.cursor];
    typeof fn === 'function' && fn(NexT.motion.integrator);
  },
  bootstrap: function() {
    this.next();
  }
};

NexT.motion.middleWares = {
  logo: function(integrator) {
    const sequence = [];

    function getMistLineSettings(targets) {
      sequence.push([{
        targets,
        scaleX  : [0, 1],
        duration: 500
      }, '-=200']);
    }

    function pushToSequence(targets, sequenceQueue = false) {
      sequence.push([{
        targets,
        opacity: 1,
        top    : 0
      }, sequenceQueue ? '-=200' : '-=0']);
    }

    pushToSequence('.header');
    CONFIG.scheme === 'Mist' && getMistLineSettings('.logo-line');
    CONFIG.scheme === 'Muse' && pushToSequence('.custom-logo-image');
    pushToSequence('.site-title');
    pushToSequence('.site-brand-container .toggle', true);
    pushToSequence('.site-subtitle');
    (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') && pushToSequence('.custom-logo-image');

    sequence[sequence.length - 1][0].complete = function() {
      integrator.next();
    };
    const timeline = window.anime.timeline({
      duration: 200,
      easing  : 'linear'
    });
    sequence.forEach(item => timeline.add(...item));

    if (CONFIG.motion.async) {
      integrator.next();
    }
  },

  menu: function(integrator) {
    Velocity(document.querySelectorAll('.menu-item'), 'transition.slideDownIn', {
      display : null,
      duration: 200,
      complete: function() {
        integrator.next();
      }
    });

    if (CONFIG.motion.async || !document.querySelectorAll('.menu-item').length) {
      integrator.next();
    }
  },

  subMenu: function(integrator) {
    const subMenuItem = document.querySelectorAll('.sub-menu .menu-item');
    if (subMenuItem.length > 0) {
      subMenuItem.forEach(element => {
        element.style.opacity = 1;
      });
    }
    integrator.next();
  },

  postList: function(integrator) {
    const postBlock = document.querySelectorAll('.post-block, .pagination, .comments');
    const postBlockTransition = CONFIG.motion.transition.post_block;
    const postHeader = document.querySelectorAll('.post-header');
    const postHeaderTransition = CONFIG.motion.transition.post_header;
    const postBody = document.querySelectorAll('.post-body');
    const postBodyTransition = CONFIG.motion.transition.post_body;
    const collHeader = document.querySelectorAll('.collection-header');
    const collHeaderTransition = CONFIG.motion.transition.coll_header;

    if (postBlock.length > 0) {
      const postMotionOptions = window.postMotionOptions || {
        stagger : 100,
        drag    : true,
        complete: function() {
          integrator.next();
        }
      };

      if (postBlockTransition) {
        Velocity(postBlock, 'transition.' + postBlockTransition, postMotionOptions);
      }
      if (postHeaderTransition) {
        Velocity(postHeader, 'transition.' + postHeaderTransition, postMotionOptions);
      }
      if (postBodyTransition) {
        Velocity(postBody, 'transition.' + postBodyTransition, postMotionOptions);
      }
      if (collHeaderTransition) {
        Velocity(collHeader, 'transition.' + collHeaderTransition, postMotionOptions);
      }
    }
    if (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') {
      integrator.next();
    }
  },

  sidebar: function(integrator) {
    const sidebar = document.querySelector('.sidebar');
    const sidebarTransition = CONFIG.motion.transition.sidebar;
    // Only for Pisces | Gemini.
    if (sidebarTransition && (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini')) {
      Velocity(sidebar, 'transition.' + sidebarTransition, {
        display : null,
        duration: 200
      });
    }
    integrator.next();
  },

  footer: function(integrator) {
    const footer = document.querySelector('.footer');
    Velocity(footer, {
      opacity: 1
    }, {
      duration: 200
    });
    integrator.next();
  }
};
