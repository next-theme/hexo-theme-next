/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
  const { changyan } = CONFIG;
  const mainJs = 'https://cy-cdn.kuaizhan.com/upload/changyan.js';
  const countJs = `https://cy-cdn.kuaizhan.com/upload/plugins/plugins.list.count.js?clientId=${changyan.appid}`;

  /**
   * Get number of comments
   */
  const getCommentsNum = () => {
    return NexT.utils.getScript(countJs, {
      attributes: {
        async: true,
        id   : 'cy_cmt_num'
      }
    });
  };

  /**
   * Load changyan js
   */
  const loadChangYan = () => {
    return NexT.utils.getScript(mainJs, {
      attributes: {
        async: true
      }
    });
  };

  /**
   * Fetch comments of post
   */
  const loadComments = () => {
    const initComment = window.changyan.api.config;
    initComment({
      appid: changyan.appid,
      conf : changyan.appkey
    });
  };

  // Get number of comments of post
  setTimeout(getCommentsNum, 0);

  // When scroll to comment section
  if (CONFIG.page.comments && !CONFIG.page.isHome) {
    NexT.utils.loadComments('#SOHUCS')
      .then(loadChangYan)
      .then(loadComments)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to load Changyan', error);
      });
  }
});
