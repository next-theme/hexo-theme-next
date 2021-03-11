/* global NexT, CONFIG, Pjax */

const pjax = new Pjax({
  selectors: [
    'head title',
    'head meta[name^="hexo-config-"]',
    '.main-inner',
    '.post-toc-wrap',
    '.languages',
    '.pjax'
  ],
  analytics        : false,
  cacheBust        : false,
  scrollRestoration: false,
  scrollTo         : !CONFIG.bookmark.enable
});

document.addEventListener('pjax:success', () => {
  pjax.executeScripts(document.querySelectorAll('script[data-pjax], .pjax script'));
  NexT.boot.refresh();
  // Define Motion Sequence & Bootstrap Motion.
  if (CONFIG.motion.enable) {
    NexT.motion.integrator
      .init()
      .add(NexT.motion.middleWares.subMenu)
      .add(NexT.motion.middleWares.postList)
      .bootstrap();
  }
  const hasTOC = document.querySelector('.post-toc');
  document.querySelector('.sidebar-inner').classList.toggle('sidebar-nav-active', hasTOC);
  document.querySelector(hasTOC ? '.sidebar-nav-toc' : '.sidebar-nav-overview').click();
  NexT.utils.updateSidebarPosition();
});
