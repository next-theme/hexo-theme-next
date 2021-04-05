/* global hexo */

'use strict';

const templatePath = '_third-party/comments/disqus.njk';

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  const config = hexo.theme.config.disqus;
  if (!config.enable || !config.shortname) return;

  injects.comment.raw('disqus', `{%- include '${templatePath}' -%}`, {inject_point: 'comment'});
  injects.bodyEnd.raw('disqus', `{%- include '${templatePath}' -%}`, {inject_point: 'bodyEnd'});
});

// Add post_meta
hexo.extend.filter.register('theme_inject', injects => {
  const config = hexo.theme.config.disqus;
  if (!config.enable || !config.shortname || !config.count) return;

  injects.postMeta.raw('disqus', `{%- include '${templatePath}' -%}`, {inject_point: 'postMeta'});
});
