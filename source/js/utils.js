/* global NexT, CONFIG */

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

(function() {
  const onPageLoaded = () => document.dispatchEvent(
    new Event('page:loaded', {
      bubbles: true
    })
  );

  document.addEventListener('DOMContentLoaded', onPageLoaded);
  document.addEventListener('pjax:success', onPageLoaded);
})();

NexT.utils = {

  registerExtURL() {
    document.querySelectorAll('span.exturl').forEach(element => {
      const link = document.createElement('a');
      // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
      link.href = decodeURIComponent(atob(element.dataset.url).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      link.rel = 'noopener external nofollow noreferrer';
      link.target = '_blank';
      link.className = element.className;
      link.title = element.title;
      link.innerHTML = element.innerHTML;
      element.parentNode.replaceChild(link, element);
    });
  },

  registerCopyButton(target, element, code = '') {
    // One-click copy code support.
    target.insertAdjacentHTML('beforeend', '<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');
    const button = target.querySelector('.copy-btn');
    button.addEventListener('click', async () => {
      if (!code) {
        const lines = element.querySelector('.code') || element.querySelector('code');
        code = lines.innerText;
      }
      if (navigator.clipboard) {
        // https://caniuse.com/mdn-api_clipboard_writetext
        try {
          await navigator.clipboard.writeText(code);
          button.querySelector('i').className = 'fa fa-check-circle fa-fw';
        } catch {
          button.querySelector('i').className = 'fa fa-times-circle fa-fw';
        }
      } else {
        button.querySelector('i').className = 'fa fa-times-circle fa-fw';
      }
    });
    // If copycode.style is not mac, element is larger than target
    // So we need to accept both of them as parameters
    element.addEventListener('mouseleave', () => {
      setTimeout(() => {
        button.querySelector('i').className = 'fa fa-copy fa-fw';
      }, 300);
    });
  },

  registerCodeblock(element) {
    const inited = !!element;
    let figure;
    if (CONFIG.hljswrap) {
      figure = (inited ? element : document).querySelectorAll('figure.highlight');
    } else {
      figure = document.querySelectorAll('pre');
    }
    figure.forEach(element => {
      // Skip pre > .mermaid for folding and copy button
      if (element.querySelector('.mermaid')) return;
      const languageName = [...element.classList].find(cls => cls !== 'highlight');
      if (!inited) {
        let span = element.querySelectorAll('.code .line span');
        if (span.length === 0) {
          // Hljs without line_number and wrap
          span = element.querySelectorAll('code.highlight span');
        }
        span.forEach(s => {
          s.classList.forEach(name => {
            s.classList.replace(name, `hljs-${name}`);
          });
        });
      }
      const height = parseInt(window.getComputedStyle(element).height, 10);
      const needFold = CONFIG.codeblock.fold.enable && (height > CONFIG.codeblock.fold.height);
      if (!needFold && !CONFIG.codeblock.copy_button.enable && !CONFIG.codeblock.language) return;
      let target;
      if (CONFIG.hljswrap && CONFIG.codeblock.copy_button.style === 'mac') {
        target = element;
      } else {
        let box = element.querySelector('.code-container');
        if (!box) {
          // https://github.com/next-theme/hexo-theme-next/issues/98
          // https://github.com/next-theme/hexo-theme-next/pull/508
          const container = element.querySelector('.table-container') || element;
          box = document.createElement('div');
          box.className = 'code-container';
          container.wrap(box);

          // add "notranslate" to prevent Google Translate from translating it, which also completely messes up the layout
          box.classList.add('notranslate');
        }
        target = box;
      }
      if (needFold && !target.classList.contains('unfold')) {
        target.classList.add('highlight-fold');
        target.insertAdjacentHTML('beforeend', '<div class="fold-cover"></div><div class="expand-btn"><i class="fa fa-angle-down fa-fw"></i></div>');
        target.querySelector('.expand-btn').addEventListener('click', () => {
          target.classList.remove('highlight-fold');
          target.classList.add('unfold');
        });
      }
      if (!inited && CONFIG.codeblock.copy_button.enable) {
        this.registerCopyButton(target, element);
      }
      if (!inited && CONFIG.codeblock.language && languageName) {
        const lang = document.createElement('div');
        lang.className = 'code-lang';
        lang.innerText = languageName.toUpperCase();
        target.insertAdjacentElement('afterbegin', lang);
      }
    });
  },

  wrapTableWithBox() {
    document.querySelectorAll('table').forEach(element => {
      const box = document.createElement('div');
      box.className = 'table-container';
      element.wrap(box);
    });
  },

  registerVideoIframe() {
    document.querySelectorAll('iframe').forEach(element => {
      const supported = [
        'www.youtube.com',
        'player.vimeo.com',
        'player.youku.com',
        'player.bilibili.com',
        'www.tudou.com'
      ].some(host => element.src.includes(host));
      if (supported && !element.parentNode.matches('.video-container')) {
        const box = document.createElement('div');
        box.className = 'video-container';
        element.wrap(box);
        const width = Number(element.width);
        const height = Number(element.height);
        if (width && height) {
          box.style.paddingTop = (height / width * 100) + '%';
        }
      }
    });
  },

  updateActiveNav() {
    if (!Array.isArray(this.sections)) return;
    let index = this.sections.findIndex(element => {
      return element?.getBoundingClientRect().top > 10;
    });
    if (index === -1) {
      index = this.sections.length - 1;
    } else if (index > 0) {
      index--;
    }
    this.activateNavByIndex(index);
  },

  registerScrollPercent() {
    const backToTop = document.querySelector('.back-to-top');
    const readingProgressBar = document.querySelector('.reading-progress-bar');
    // For init back to top in sidebar if page was scrolled after page refresh.
    window.addEventListener('scroll', () => {
      if (backToTop || readingProgressBar) {
        const contentHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = contentHeight > 0 ? Math.min(100 * window.scrollY / contentHeight, 100) : 0;
        if (backToTop) {
          backToTop.classList.toggle('back-to-top-on', Math.round(scrollPercent) >= 5);
          backToTop.querySelector('span').innerText = Math.round(scrollPercent) + '%';
        }
        if (readingProgressBar) {
          readingProgressBar.style.setProperty('--progress', scrollPercent.toFixed(2) + '%');
        }
      }
      this.updateActiveNav();
    }, { passive: true });

    backToTop?.addEventListener('click', () => {
      window.anime({
        targets  : document.scrollingElement,
        duration : 500,
        easing   : 'linear',
        scrollTop: 0
      });
    });
  },

  /**
   * Tabs tag listener (without twitter bootstrap).
   */
  registerTabsTag() {
    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    document.querySelectorAll('.tabs ul.nav-tabs .tab').forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        // Prevent selected tab to select again.
        if (element.classList.contains('active')) return;
        const nav = element.parentNode;
        // Get the height of `tab-pane` which is activated before, and set it as the height of `tab-content` with extra margin / paddings.
        const tabContent = nav.nextElementSibling;
        tabContent.style.overflow = 'hidden';
        tabContent.style.transition = 'height 1s';
        // Comment system selection tab does not contain .active class.
        const activeTab = tabContent.querySelector('.active') || tabContent.firstElementChild;
        // Hight might be `auto`.
        const prevHeight = parseInt(window.getComputedStyle(activeTab).height, 10) || 0;
        const paddingTop = parseInt(window.getComputedStyle(activeTab).paddingTop, 10);
        const marginBottom = parseInt(window.getComputedStyle(activeTab.firstElementChild).marginBottom, 10);
        tabContent.style.height = prevHeight + paddingTop + marginBottom + 'px';
        // Add & Remove active class on `nav-tabs` & `tab-content`.
        [...nav.children].forEach(target => {
          target.classList.toggle('active', target === element);
        });
        // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
        const tActive = document.getElementById(element.querySelector('a').getAttribute('href').replace('#', ''));
        [...tActive.parentNode.children].forEach(target => {
          target.classList.toggle('active', target === tActive);
        });
        // Trigger event
        tActive.dispatchEvent(new Event('tabs:click', {
          bubbles: true
        }));
        // Get the height of `tab-pane` which is activated now.
        const hasScrollBar = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
        const currHeight = parseInt(window.getComputedStyle(tabContent.querySelector('.active')).height, 10);
        // Reset the height of `tab-content` and see the animation.
        tabContent.style.height = currHeight + paddingTop + marginBottom + 'px';
        // Change the height of `tab-content` may cause scrollbar show / disappear, which may result in the change of the `tab-pane`'s height
        setTimeout(() => {
          if ((document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) !== hasScrollBar) {
            tabContent.style.transition = 'height 0.3s linear';
            // After the animation, we need reset the height of `tab-content` again.
            const currHeightAfterScrollBarChange = parseInt(window.getComputedStyle(tabContent.querySelector('.active')).height, 10);
            tabContent.style.height = currHeightAfterScrollBarChange + paddingTop + marginBottom + 'px';
          }
          // Remove all the inline styles, and let the height be adaptive again.
          setTimeout(() => {
            tabContent.style.transition = '';
            tabContent.style.height = '';
          }, 250);
        }, 1000);
        if (!CONFIG.stickytabs) return;
        const offset = nav.parentNode.getBoundingClientRect().top + window.scrollY + 10;
        window.anime({
          targets  : document.scrollingElement,
          duration : 500,
          easing   : 'linear',
          scrollTop: offset
        });
      });
    });

    window.dispatchEvent(new Event('tabs:register'));
  },

  registerCanIUseTag() {
    // Get responsive height passed from iframe.
    window.addEventListener('message', ({ data }) => {
      if (typeof data === 'string' && data.includes('ciu_embed')) {
        const featureID = data.split(':')[1];
        const height = data.split(':')[2];
        document.querySelector(`iframe[data-feature=${featureID}]`).style.height = parseInt(height, 10) + 5 + 'px';
      }
    }, false);
  },

  registerActiveMenuItem() {
    document.querySelectorAll('.menu-item a[href]').forEach(target => {
      const isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
      const isSubPath = !CONFIG.root.startsWith(target.pathname) && location.pathname.startsWith(target.pathname);
      target.classList.toggle('menu-item-active', target.hostname === location.hostname && (isSamePath || isSubPath));
    });
  },

  registerLangSelect() {
    const selects = document.querySelectorAll('.lang-select');
    selects.forEach(sel => {
      sel.value = CONFIG.page.lang;
      sel.addEventListener('change', () => {
        const target = sel.options[sel.selectedIndex];
        document.querySelectorAll('.lang-select-label span').forEach(span => {
          span.innerText = target.text;
        });
        // Disable Pjax to force refresh translation of menu item
        window.location.href = target.dataset.href;
      });
    });
  },

  registerSidebarTOC() {
    this.sections = [...document.querySelectorAll('.post-toc:not(.placeholder-toc) li a.nav-link')].map(element => {
      const target = document.getElementById(decodeURI(element.getAttribute('href')).replace('#', ''));
      // TOC item animation navigate.
      element.addEventListener('click', event => {
        event.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY;
        window.anime({
          targets  : document.scrollingElement,
          duration : 500,
          easing   : 'linear',
          scrollTop: offset,
          complete : () => {
            history.pushState(null, document.title, element.href);
          }
        });
      });
      return target;
    });
    this.updateActiveNav();
  },

  registerPostReward() {
    const button = document.querySelector('.reward-container button');
    if (!button) return;
    button.addEventListener('click', () => {
      document.querySelector('.post-reward').classList.toggle('active');
    });
  },

  activateNavByIndex(index) {
    const nav = document.querySelector('.post-toc:not(.placeholder-toc) .nav');
    if (!nav) return;

    const navItemList = nav.querySelectorAll('.nav-item');
    const target = navItemList[index];
    if (!target || target.classList.contains('active-current')) return;

    nav.querySelectorAll('.active').forEach(navItem => {
      navItem.classList.remove('active', 'active-current');
    });
    target.classList.add('active', 'active-current');

    let activateEle = target.querySelector('.nav-child') || target.parentElement;

    while (nav.contains(activateEle)) {
      if (activateEle.classList.contains('nav-item')) {
        activateEle.classList.add('active');
      }
      activateEle = activateEle.parentElement;
    }

    // Scrolling to center active TOC element if TOC content is taller then viewport.
    const tocElement = document.querySelector(CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini' ? '.sidebar-panel-container' : '.sidebar');
    if (!document.querySelector('.sidebar-toc-active')) return;
    window.anime({
      targets  : tocElement,
      duration : 200,
      easing   : 'linear',
      scrollTop: tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top
    });
  },

  updateSidebarPosition() {
    if (window.innerWidth < 1200 || CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') return;
    // Expand sidebar on post detail page by default, when post has a toc.
    const hasTOC = document.querySelector('.post-toc:not(.placeholder-toc)');
    let display = CONFIG.page.sidebar;
    if (typeof display !== 'boolean') {
      // There's no definition sidebar in the page front-matter.
      display = CONFIG.sidebar.display === 'always' || (CONFIG.sidebar.display === 'post' && hasTOC);
    }
    if (display) {
      window.dispatchEvent(new Event('sidebar:show'));
    }
  },

  activateSidebarPanel(index) {
    const sidebar = document.querySelector('.sidebar-inner');
    const activeClassNames = ['sidebar-toc-active', 'sidebar-overview-active'];
    if (sidebar.classList.contains(activeClassNames[index])) return;

    const panelContainer = sidebar.querySelector('.sidebar-panel-container');
    const tocPanel = panelContainer.firstElementChild;
    const overviewPanel = panelContainer.lastElementChild;

    const panelHeights = [
      tocPanel.scrollHeight,
      overviewPanel.scrollHeight
    ];
    panelContainer.style.setProperty('--inactive-panel-height', `${panelHeights[1 - index]}px`);
    panelContainer.style.setProperty('--active-panel-height', `${panelHeights[index]}px`);

    sidebar.classList.replace(activeClassNames[1 - index], activeClassNames[index]);
  },

  updateFooterPosition() {
    if (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') return;
    function updateFooterPosition() {
      const footer = document.querySelector('.footer');
      const containerHeight = document.querySelector('.main').offsetHeight + footer.offsetHeight;
      footer.classList.toggle('footer-fixed', containerHeight <= window.innerHeight);
    }

    updateFooterPosition();
    window.addEventListener('resize', updateFooterPosition);
    window.addEventListener('scroll', updateFooterPosition, { passive: true });
  },

  /**
   * Sets the CSS variable '--dialog-scrollgutter' to the specified gap value.
   * If no gap is provided, it calculates the gap as the difference between
   * the window's inner width and the document body's client width.
   *
   * @param {string} [gap] - The gap value to be set. If not provided, the
   *                         default gap is calculated automatically.
   */
  setGutter(gap) {
    document.body.style.setProperty('--dialog-scrollgutter', gap || `${window.innerWidth - document.body.clientWidth}px`);
  },

  getScript(src, options = {}, legacyCondition) {
    if (typeof options === 'function') {
      return this.getScript(src, {
        condition: legacyCondition
      }).then(options);
    }
    const {
      condition = false,
      attributes: {
        id = '',
        defer = false,
        crossOrigin = '',
        dataset = {},
        ...otherAttributes
      } = {},
      parentNode = null
    } = options;
    const async = options.async ?? false;
    return new Promise((resolve, reject) => {
      if (condition) {
        resolve();
      } else {
        const script = document.createElement('script');

        if (id) script.id = id;
        if (crossOrigin) script.crossOrigin = crossOrigin;
        script.async = async;
        script.defer = defer;
        Object.assign(script.dataset, dataset);
        Object.entries(otherAttributes).forEach(([name, value]) => {
          script.setAttribute(name, String(value));
        });

        script.onload = resolve;
        script.onerror = reject;

        if (typeof src === 'object') {
          const { url, integrity } = src;
          script.src = url;
          if (integrity) {
            script.integrity = integrity;
            script.crossOrigin = 'anonymous';
          }
        } else {
          script.src = src;
        }
        (parentNode || document.head).appendChild(script);
      }
    });
  },

  loadComments(selector, legacyCallback) {
    if (legacyCallback) {
      return this.loadComments(selector).then(legacyCallback);
    }
    return new Promise(resolve => {
      const element = document.querySelector(selector);
      if (!CONFIG.comments.lazyload || !element) {
        resolve();
        return;
      }
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;

        resolve();
        observer.disconnect();
      });
      intersectionObserver.observe(element);
    });
  },

  debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
};
