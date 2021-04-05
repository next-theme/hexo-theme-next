/* global hexo */

'use strict';

const templatePath = '_third-party/comments/changyan.njk';

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  const config = hexo.theme.config.changyan;
  if (!config.enable || !config.appid || !config.appkey) return;

  injects.comment.raw('changyan', `{%- include '${templatePath}' -%}`, {inject_point: 'comment'});
  injects.bodyEnd.raw('changyan', `{%- include '${templatePath}' -%}`, {inject_point: 'bodyEnd'});
  injects.postMeta.raw('changyan', `{%- include '${templatePath}' -%}`, {inject_point: 'postMeta'});
});
