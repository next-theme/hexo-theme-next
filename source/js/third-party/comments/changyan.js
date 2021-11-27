/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
  const { changyan } = CONFIG;
  const mainJs = 'https://cy-cdn.kuaizhan.com/upload/changyan.js';
  const countJs = `https://cy-cdn.kuaizhan.com/upload/plugins/plugins.list.count.js?clientId=${changyan.appid}`;

  /**
   *  Get number of comments
   */
  const getCommentsNum = () => {
    return NexT.utils.getScript(
      countJs,
      {
        attributes: {
          async: true,
          id   : 'cy_cmt_num'
        }
      }
    );
  };

  /**
   * load changyan js
   */
  const loadChangYan = () => {
    return NexT.utils.getScript(
      mainJs,
      {
        attributes: {
          async: true
        }
      }
    );
  };

  /**
   *  fetch comments of post
   */
  const loadComments = () => {
    const initComment = window.changyan?.api?.config;
    if (typeof initComment === 'function') {
      initComment({
        appid: changyan.appid,
        conf : changyan.appkey
      });
    } else {
      throw new Error('changyan.js don\'t be loaded, please to https://github.com/next-theme/hexo-theme-next/issues to report a bug');
    }
  };

  // get number of comments of post
  setTimeout(getCommentsNum, 0);

  // when scroll to comment section
  if (CONFIG.page.comments && !CONFIG.page.isHome) {
    NexT.utils.loadComments('#SOHUCS')
      .then(loadChangYan)
      .then(loadComments);
  }
});
