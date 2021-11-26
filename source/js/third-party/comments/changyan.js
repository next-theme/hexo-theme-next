/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
  const { changyan } = CONFIG;
  const mainJs = 'https://cy-cdn.kuaizhan.com/upload/changyan.js';
  const md5Js = 'https://cdn.jsdelivr.net/npm/md5js@1.0.7/dist/md5.min.js';
  const countJs = `https://cy-cdn.kuaizhan.com/upload/plugins/plugins.list.count.js?clientId=${changyan.appid}`;

  /**
   *  Calculate comment MD5 by title
   **/
  const titleToMd5 = className => {
    const { md5 : _md5 } = window.md5;
    if (typeof _md5 === 'function') {
      const posts = document.getElementsByClassName(className);
      Array.from(posts).forEach(post => {
        const dataMd5 = _md5(post.getAttribute('title'));
        post.setAttribute('id', `sourceId::${dataMd5}`);
      });
    }
  };

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

  const addMd5ForChangYan = () => {
    const { md5 : _md5 } = window.md5;
    const wrap = document.getElementById('SOHUCS');
    if (wrap && typeof _md5 === 'function') {
      wrap.setAttribute('sid', _md5(CONFIG.page.title));
    } else {
      throw new Error('failed to  calculate title md5');
    }
  };
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

  const handleComments = () => {
    titleToMd5('cy_cmt_count');

    // Join the task queue because chrome may be asynchronous to DOM operations
    setTimeout(getCommentsNum, 0);
    if (CONFIG.page.comments && !CONFIG.page.isHome) {
      NexT.utils.loadComments('#SOHUCS')
        .then(addMd5ForChangYan)
        .then(loadChangYan)
        .then(loadComments);
    }
  };

  NexT.utils.getScript(
    md5Js,
    {
      attributes: {
        async: true
      }
    }
  ).then(handleComments);
});
