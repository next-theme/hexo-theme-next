/* global hexo */

'use strict';

const crypto = require('crypto');
const nextFont = require('./font');
const nextUrl = require('./next-url');

hexo.extend.helper.register('next_font', nextFont);
hexo.extend.helper.register('next_url', nextUrl);

hexo.extend.helper.register('next_inject', function(point) {
  return this.theme.injects[point]
    .map(item => this.partial(item.layout, item.locals, item.options))
    .join('');
});

hexo.extend.helper.register('next_js', function(file, pjax = false) {
  const { next_version } = this;
  const { internal } = this.theme.vendors;
  const links = {
    local   : this.url_for(`${this.theme.js}/${file}`),
    jsdelivr: `//cdn.jsdelivr.net/npm/hexo-theme-next@${next_version}/source/js/${file}`,
    unpkg   : `//unpkg.com/hexo-theme-next@${next_version}/source/js/${file}`,
    cdnjs   : `//cdnjs.cloudflare.com/ajax/libs/hexo-theme-next/${next_version}/${file}`
  };
  const src = links[internal] || links.local;
  return `<script ${pjax ? 'data-pjax ' : ''}src="${src}"></script>`;
});

hexo.extend.helper.register('post_gallery', function(photos) {
  if (!photos || !photos.length) return '';
  const content = photos.map(photo => `
    <div class="post-gallery-image">
      <img src="${this.url_for(photo)}" itemprop="contentUrl">
    </div>`).join('');
  return `<div class="post-gallery" itemscope itemtype="http://schema.org/ImageGallery">
    ${content}
    </div>`;
});

hexo.extend.helper.register('post_edit', function(src) {
  const { theme } = this;
  if (!theme.post_edit.enable) return '';
  return this.next_url(theme.post_edit.url + src, '<i class="fa fa-pen-nib"></i>', {
    class: 'post-edit-link',
    title: this.__('post.edit')
  });
});

hexo.extend.helper.register('gitalk_md5', function(path) {
  const str = this.url_for(path);
  return crypto.createHash('md5').update(str).digest('hex');
});

/**
 * Get page path given a certain language tag
 */
hexo.extend.helper.register('i18n_path', function(language) {
  const { path, lang } = this.page;
  const base = path.startsWith(lang) ? path.slice(lang.length + 1) : path;
  return this.url_for(`${this.languages.indexOf(language) === 0 ? '' : '/' + language}/${base}`);
});

/**
 * Get the language name
 */
hexo.extend.helper.register('language_name', function(language) {
  const name = hexo.theme.i18n.__(language)('name');
  return name === 'name' ? language : name;
});
