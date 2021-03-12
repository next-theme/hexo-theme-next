const friendsjs = {
  requestAPI: (url, callback, timeout) => {
    let retryTimes = 5;
    function request() {
      return new Promise((resolve, reject) => {
        let status = 0; // 0 等待 1 完成 2 超时
        let timer = setTimeout(() => {
          if (status === 0) {
            status = 2;
            timer = null;
            reject('请求超时');
            if (retryTimes == 0) {
              timeout();
            }
          }
        }, 5000);
        fetch(url).then(function(response) {
          if (status !== 2) {
            clearTimeout(timer);
            resolve(response);
            timer = null;
            status = 1;
          }
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function(data) {
          retryTimes = 0;
          callback(data);
        }).catch(function(error) {
          if (retryTimes > 0) {
            retryTimes -= 1;
            setTimeout(() => {
              request();
            }, 5000);
          } else {
            timeout();
          }
        });
      });
    }
    request();
  },
  layout: (cfg) => {
    const el = $(cfg.el)[0];
    $(el).append('<div class="loading-wrap"><svg class="loading" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2709"><path d="M832 512c0-176-144-320-320-320V128c211.2 0 384 172.8 384 384h-64zM192 512c0 176 144 320 320 320v64C300.8 896 128 723.2 128 512h64z" p-id="2710"></path></svg><p></p></div>');
    friendsjs.requestAPI(cfg.api, function(data) {
      $(el).find('.loading-wrap').remove();
      const arr = data.content;
      arr.forEach((item, i) => {
        var user = '<div class="user-card">';
        user += '<a class="card-link" target="_blank" rel="external nofollow noopener noreferrer"';
        user += ' href="' + item.url + '">';
        user += '<img src="' + (item.avatar || cfg.avatar) + '" onerror="javascript:this.src=\'' + cfg.avatar + '\';">';
        user += '<div class="name"><span>' + item.title + '</span></div>';
        user += '</a>';
        user += '</div>';
        $(el).find('.group-body').append(user);
      });
    }, function() {
      $(el).find('.loading-wrap svg').remove();
      $(el).find('.loading-wrap p').text('加载失败，请稍后重试。');
    });
  },
}

$(function () {
  const els = document.getElementsByClassName('friendsjs-wrap');
  for (var i = 0; i < els.length; i++) {
    const el = els[i];
    const api = el.getAttribute('api');
    if (api == null) {
      continue;
    }
    var cfg = new Object();
    cfg.el = el;
    cfg.api = api;
    cfg.class = el.getAttribute('class');
    cfg.avatar = 'https://7.dusays.com/2021/03/08/82cd96d519f62.svg';
    friendsjs.layout(cfg);
  }
});
