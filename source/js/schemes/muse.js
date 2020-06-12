/* global CONFIG, Velocity */

document.addEventListener('DOMContentLoaded', () => {

  const isRight = CONFIG.sidebar.position === 'right';
  const mousePos = {};

  const sidebarToggleLines = {
    lines: document.querySelector('.sidebar-toggle'),
    init : function() {
      this.lines.classList.remove('toggle-arrow', 'toggle-close');
    },
    arrow: function() {
      this.lines.classList.remove('toggle-close');
      this.lines.classList.add('toggle-arrow');
    },
    close: function() {
      this.lines.classList.remove('toggle-arrow');
      this.lines.classList.add('toggle-close');
    }
  };

  const sidebarToggleMotion = {
    isSidebarVisible: false,
    init            : function() {
      sidebarToggleLines.init();

      window.addEventListener('mousedown', this.mousedownHandler.bind(this));
      window.addEventListener('mouseup', this.mouseupHandler.bind(this));
      document.querySelector('#sidebar-dimmer').addEventListener('click', this.clickHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('click', this.clickHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('mouseenter', this.mouseEnterHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('mouseleave', this.mouseLeaveHandler.bind(this));
      window.addEventListener('sidebar:show', this.showSidebar.bind(this));
      window.addEventListener('sidebar:hide', this.hideSidebar.bind(this));
    },
    mousedownHandler: function(event) {
      mousePos.X = event.pageX;
      mousePos.Y = event.pageY;
    },
    mouseupHandler: function(event) {
      const deltaX = event.pageX - mousePos.X;
      const deltaY = event.pageY - mousePos.Y;
      const clickingBlankPart = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) < 20 && event.target.matches('.main');
      if (this.isSidebarVisible && (clickingBlankPart || event.target.matches('img.medium-zoom-image, .fancybox img'))) {
        this.hideSidebar();
      }
    },
    clickHandler: function() {
      this.isSidebarVisible ? this.hideSidebar() : this.showSidebar();
    },
    mouseEnterHandler: function() {
      if (!this.isSidebarVisible) {
        sidebarToggleLines.arrow();
      }
    },
    mouseLeaveHandler: function() {
      if (!this.isSidebarVisible) {
        sidebarToggleLines.init();
      }
    },
    showSidebar: function() {
      this.isSidebarVisible = true;
      document.body.classList.add('sidebar-active');
      if (typeof Velocity === 'function') {
        Velocity(document.querySelectorAll('.sidebar .motion-element'), isRight ? 'transition.slideRightIn' : 'transition.slideLeftIn', {
          stagger: 50,
          drag   : true
        });
      }

      sidebarToggleLines.close();
    },
    hideSidebar: function() {
      this.isSidebarVisible = false;
      document.body.classList.remove('sidebar-active');

      sidebarToggleLines.init();
    }
  };
  sidebarToggleMotion.init();

  function updateFooterPosition() {
    const footer = document.querySelector('.footer');
    const containerHeight = document.querySelector('.header').offsetHeight + document.querySelector('.main').offsetHeight + footer.offsetHeight;
    footer.classList.toggle('footer-fixed', containerHeight <= window.innerHeight);
  }

  updateFooterPosition();
  window.addEventListener('resize', updateFooterPosition);
  window.addEventListener('scroll', updateFooterPosition);
});
