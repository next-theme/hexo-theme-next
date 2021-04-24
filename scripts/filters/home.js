/* global hexo */

'use strict';

hexo.extend.filter.register('after_render:html', (str, {page}) => {
  if (!page.__index) return;

  // Fix anchor by prefixing with the relative path of the target article.
  let postIndex = 0;
  return str.replace(/(?<=<article[^>]*>)[^]+?(?=<\/article>)/g, (article) => {
    const pathAdded = article.replace(/(?<=<a[^>]* href=")[^"]+(?="[^>]* class="(anchor-link|headerlink)"[^>]*>)/g, (href) => {
      return page.posts.data[postIndex].path + href;
    });
    postIndex++;
    return pathAdded;
  });
});
