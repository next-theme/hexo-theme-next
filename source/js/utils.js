/* global NexT, CONFIG */

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

NexT.utils = {

  /**
   * Wrap images with fancybox.
   */
  wrapImageWithFancyBox: function() {
    document.querySelectorAll('.post-body :not(a) > img, .post-body > img').forEach(element => {
      const $image = $(element);
      const imageLink = $image.attr('data-src') || $image.attr('src');
      const $imageWrapLink = $image.wrap(`<a class="fancybox fancybox.image" href="${imageLink}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent('a');
      if ($image.is('.post-gallery img')) {
        $imageWrapLink.attr('data-fancybox', 'gallery').attr('rel', 'gallery');
      } else if ($image.is('.group-picture img')) {
        $imageWrapLink.attr('data-fancybox', 'group').attr('rel', 'group');
      } else {
        $imageWrapLink.attr('data-fancybox', 'default').attr('rel', 'default');
      }

      const imageTitle = $image.attr('title') || $image.attr('alt');
      if (imageTitle) {
        $imageWrapLink.append(`<p class="image-caption">${imageTitle}</p>`);
        // Make sure img title tag will show correctly in fancybox
        $imageWrapLink.attr('title', imageTitle).attr('data-caption', imageTitle);
      }
    });

    $.fancybox.defaults.hash = false;
    $('.fancybox').fancybox({
      loop   : true,
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  },

  registerExtURL: function() {
    document.querySelectorAll('span.exturl').forEach(element => {
      let link = document.createElement('a');
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

  /**
   * One-click copy code support.
   */
  registerCopyCode: function() {
    document.querySelectorAll('figure.highlight').forEach(element => {
      element.querySelectorAll('.code .line span').forEach(span => {
        span.classList.forEach(name => {
          span.classList.remove(name);
          span.classList.add(`hljs-${name}`);
        });
      });
      if (!CONFIG.copycode) return;
      element.insertAdjacentHTML('beforeend', '<div class="copy-btn"><i class="fa fa-clipboard fa-fw"></i></div>');
      const button = element.querySelector('.copy-btn');
      button.addEventListener('click', event => {
        const target = event.currentTarget;
        const code = [...target.parentNode.querySelectorAll('.code .line')].map(line => line.innerText).join('\n');
        const ta = document.createElement('textarea');
        ta.style.top = window.scrollY + 'px'; // Prevent page scrolling
        ta.style.position = 'absolute';
        ta.style.opacity = '0';
        ta.readOnly = true;
        ta.value = code;
        document.body.append(ta);
        ta.select();
        ta.setSelectionRange(0, code.length);
        ta.readOnly = false;
        const result = document.execCommand('copy');
        target.querySelector('i').className = result ? 'fa fa-check-circle fa-fw' : 'fa fa-times-circle fa-fw';
        ta.blur(); // For iOS
        target.blur();
        document.body.removeChild(ta);
      });
      element.addEventListener('mouseleave', () => {
        setTimeout(() => {
          button.querySelector('i').className = 'fa fa-clipboard fa-fw';
        }, 300);
      });
    });
  },

  wrapTableWithBox: function() {
    document.querySelectorAll('table').forEach(element => {
      const box = document.createElement('div');
      box.className = 'table-container';
      element.wrap(box);
    });
  },

  registerVideoIframe: function() {
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
        let width = Number(element.width);
        let height = Number(element.height);
        if (width && height) {
          box.style.paddingTop = (height / width * 100) + '%';
        }
      }
    });
  },

  registerScrollPercent: function() {
    const backToTop = document.querySelector('.back-to-top');
    const readingProgressBar = document.querySelector('.reading-progress-bar');
    // For init back to top in sidebar if page was scrolled after page refresh.
    window.addEventListener('scroll', () => {
      if (backToTop || readingProgressBar) {
        const docHeight = document.querySelector('.container').offsetHeight;
        const winHeight = window.innerHeight;
        const contentVisibilityHeight = docHeight > winHeight ? docHeight - winHeight : document.body.scrollHeight - winHeight;
        const scrollPercent = Math.min(100 * window.scrollY / contentVisibilityHeight, 100);
        if (backToTop) {
          backToTop.classList.toggle('back-to-top-on', Math.round(scrollPercent) >= 5);
          backToTop.querySelector('span').innerText = Math.round(scrollPercent) + '%';
        }
        if (readingProgressBar) {
          readingProgressBar.style.width = scrollPercent.toFixed(2) + '%';
        }
      }
      if (!Array.isArray(NexT.utils.sections)) return;
      let index = NexT.utils.sections.findIndex(element => {
        return element && element.getBoundingClientRect().top > 0;
      });
      if (index === -1) {
        index = NexT.utils.sections.length - 1;
      } else if (index > 0) {
        index--;
      }
      this.activateNavByIndex(index);
    });

    backToTop && backToTop.addEventListener('click', () => {
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
  registerTabsTag: function() {
    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    document.querySelectorAll('.tabs ul.nav-tabs .tab').forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        const target = event.currentTarget;
        // Prevent selected tab to select again.
        if (!target.classList.contains('active')) {
          // Add & Remove active class on `nav-tabs` & `tab-content`.
          [...target.parentNode.children].forEach(element => {
            element.classList.toggle('active', element === target);
          });
          // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
          const tActive = document.getElementById(target.querySelector('a').getAttribute('href').replace('#', ''));
          [...tActive.parentNode.children].forEach(element => {
            element.classList.toggle('active', element === tActive);
          });
          // Trigger event
          tActive.dispatchEvent(new Event('tabs:click', {
            bubbles: true
          }));
        }
      });
    });

    window.dispatchEvent(new Event('tabs:register'));
  },

  registerCanIUseTag: function() {
    // Get responsive height passed from iframe.
    window.addEventListener('message', ({ data }) => {
      if (typeof data === 'string' && data.includes('ciu_embed')) {
        const featureID = data.split(':')[1];
        const height = data.split(':')[2];
        document.querySelector(`iframe[data-feature=${featureID}]`).style.height = parseInt(height, 10) + 5 + 'px';
      }
    }, false);
  },

  registerActiveMenuItem: function() {
    document.querySelectorAll('.menu-item a[href]').forEach(target => {
      const isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
      const isSubPath = !CONFIG.root.startsWith(target.pathname) && location.pathname.startsWith(target.pathname);
      target.classList.toggle('menu-item-active', target.hostname === location.hostname && (isSamePath || isSubPath));
    });
  },

  registerLangSelect: function() {
    let sel = document.querySelector('.lang-select');
    if (!sel) return;
    sel.value = CONFIG.page.lang;
    sel.addEventListener('change', () => {
      let target = sel.options[sel.selectedIndex];
      document.querySelector('.lang-select-label span').innerText = target.text;
      let url = target.dataset.href;
      window.pjax ? window.pjax.loadUrl(url) : window.location.href = url;
    });
  },

  registerSidebarTOC: function() {
    this.sections = [...document.querySelectorAll('.post-toc li a.nav-link')].map(element => {
      const target = document.getElementById(decodeURI(element.getAttribute('href')).replace('#', ''));
      // TOC item animation navigate.
      element.addEventListener('click', event => {
        event.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY;
        window.anime({
          targets  : document.scrollingElement,
          duration : 500,
          easing   : 'linear',
          scrollTop: offset + 10
        });
      });
      return target;
    });
  },

  activateNavByIndex: function(index) {
    const target = document.querySelectorAll('.post-toc li a.nav-link')[index];
    if (!target || target.classList.contains('active-current')) return;

    document.querySelectorAll('.post-toc .active').forEach(element => {
      element.classList.remove('active', 'active-current');
    });
    target.classList.add('active', 'active-current');
    let parent = target.parentNode;
    while (!parent.matches('.post-toc')) {
      if (parent.matches('li')) parent.classList.add('active');
      parent = parent.parentNode;
    }
    // Scrolling to center active TOC element if TOC content is taller then viewport.
    const tocElement = document.querySelector('.post-toc-wrap');
    window.anime({
      targets  : tocElement,
      duration : 200,
      easing   : 'linear',
      scrollTop: tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top
    });
  },

  supportsPDFs: function() {
    let ua = navigator.userAgent;
    let isFirefoxWithPDFJS = ua.includes('irefox') && parseInt(ua.split('rv:')[1].split('.')[0], 10) > 18;
    let supportsPdfMimeType = typeof navigator.mimeTypes['application/pdf'] !== 'undefined';
    let isIOS = /iphone|ipad|ipod/i.test(ua.toLowerCase());
    return isFirefoxWithPDFJS || (supportsPdfMimeType && !isIOS);
  },

  getComputedStyle: function(element) {
    const clone = element.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.display = 'block';
    element.parentNode.appendChild(clone);
    const height = clone.clientHeight;
    element.parentNode.removeChild(clone);
    return height;
  },

  /**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
  initSidebarDimension: function() {
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarb2t = document.querySelector('.sidebar-inner .back-to-top');
    const sidebarNavHeight = sidebarNav ? sidebarNav.offsetHeight : 0;
    const sidebarb2tHeight = sidebarb2t ? sidebarb2t.offsetHeight : 0;
    const sidebarOffset = CONFIG.sidebar.offset || 12;
    let sidebarSchemePadding = (CONFIG.sidebar.padding * 2) + sidebarNavHeight + sidebarb2tHeight;
    if (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') sidebarSchemePadding += sidebarOffset * 2;
    // Initialize Sidebar & TOC Height.
    const sidebarWrapperHeight = document.body.offsetHeight - sidebarSchemePadding + 'px';
    document.documentElement.style.setProperty('--sidebar-wrapper-height', sidebarWrapperHeight);
  },

  updateSidebarPosition: function() {
    NexT.utils.initSidebarDimension();
    if (window.screen.width < 992 || CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') return;
    // Expand sidebar on post detail page by default, when post has a toc.
    const hasTOC = document.querySelector('.post-toc');
    let display = CONFIG.page.sidebar;
    if (typeof display !== 'boolean') {
      // There's no definition sidebar in the page front-matter.
      display = CONFIG.sidebar.display === 'always' || (CONFIG.sidebar.display === 'post' && hasTOC);
    }
    if (display) {
      window.dispatchEvent(new Event('sidebar:show'));
    }
  },

  getScript: function(url, callback, condition) {
    if (condition) {
      callback();
    } else {
      let script = document.createElement('script');
      script.onload = script.onreadystatechange = function(_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = script.onreadystatechange = null;
          script = undefined;
          if (!isAbort && callback) setTimeout(callback, 0);
        }
      };
      script.src = url;
      document.head.appendChild(script);
    }
  },

  loadComments: function(element, callback) {
    if (!CONFIG.comments.lazyload || !element) {
      callback();
      return;
    }
    let intersectionObserver = new IntersectionObserver((entries, observer) => {
      let entry = entries[0];
      if (entry.isIntersecting) {
        callback();
        observer.disconnect();
      }
    });
    intersectionObserver.observe(element);
    return intersectionObserver;
  }
};
