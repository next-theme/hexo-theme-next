/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
  const { changyan } = CONFIG;
  const mainJs = 'https://cy-cdn.kuaizhan.com/upload/changyan.js';
  const md5Js = 'https://cdn.jsdelivr.net/npm/md5js@1.0.7/dist/md5.min.js';
  const countJs = `https://cy-cdn.kuaizhan.com/upload/plugins/plugins.list.count.js?clientId=${changyan.appid}`;
  if (CONFIG.page.isHome) {
    NexT.utils.getScript(
      countJs,
      {
        attributes: {
          async: true,
          id   : 'cy_cmt_num'
        }
      }
    );
  } else if (CONFIG.page.comments) {
    NexT.utils.loadComments('#SOHUCS')
      .then(() => {
        return NexT.utils.getScript(
          md5Js,
          {
            attributes: {
              async: true
            }
          });
      })
      .then(() => {
        const { md5 : _md5 } = window.md5;
        const wrap = document.getElementById('SOHUCS');
        if (wrap && typeof _md5 === 'function') {
          wrap.setAttribute('sid', _md5(CONFIG.page.title));
        } else {
          throw new Error('failed to  calculate title md5');
        }
      })
      .then(() => {
        return NexT.utils.getScript(
          mainJs,
          {
            attributes: {
              async: true
            }
          }
        );
      })
      .then(() => {
        const initComment = window.changyan?.api?.config;
        if (typeof initComment === 'function') {
          initComment({
            appid: changyan.appid,
            conf : changyan.appkey
          });
        } else {
          throw new Error('changyan.js don\'t be loaded, please to https://github.com/next-theme/hexo-theme-next/issues to report a bug');
        }
      });
  }
});
