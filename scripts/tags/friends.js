/**
 * 格式与官方标签插件一致使用空格分隔，中括号内的是可选参数（中括号不需要写出来）
 * {% friends repo:xxx/friends [api:https://issues-api.vercel.app/v1/] %}
 */

'use strict';

function mapArgs(args) {
  var newArgs = new Object();
  args.forEach((kv, i) => {
    const kvs = kv.split(":");
    if (kvs.length > 1) {
      newArgs[kvs.shift()] = kvs.join(":");
    } else {
      if (newArgs.others == undefined) {
        newArgs.others = [];
      }
      newArgs.others.push(kv);
    }
  });
  return newArgs;
}

module.exports = ctx => function(args) {
  args = mapArgs(args);
  const default_avatar = 'https://7.dusays.com/2021/03/08/82cd96d519f62.svg';
  if (!args.repo) {
    return;
  }
  if (!args.api) {
    args.api = ctx.theme.config.issues_api;
  }
  var el = '<div class="tag-plugin users-wrap">';
  function cell(friend) {
    if (friend.url && friend.title) {
      var cell = '<div class="user-card">';
      cell += '<a class="card-link" target="_blank" rel="external nofollow noopener noreferrer" href="' + friend.url + '">';
      cell += '<img src="' + (friend.avatar || default_avatar) + '" onerror="javascript:this.removeAttribute(&quot;data-src&quot;);this.src=&quot;' + default_avatar + '&quot;;"/>';
      cell += '<div class="name"><span>' + friend.title + '</span></div>';
      cell += '</a></div>'
      return cell;
    } else {
      return '';
    }
  }
  el += '<div class="friendsjs-wrap"';
  el += ' id="friends-api"';
  el += ' api="' + args.api + args.repo + '"';
  el += '>';
  el += '<div class="group-body"></div>';
  el += '</div>';
  el += '</div>';
  return el;
};
