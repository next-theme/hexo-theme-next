/* global hexo */

'use strict';

hexo.extend.helper.register('next_menu', function(path) {
  path = ('/' + path).replace(/index\.html$/, '');
  const { menu_map } = this.theme;
  if (!menu_map.has(path)) return;
  let node = menu_map.get(path);
  const menus = [];
  if (node.children.length) {
    menus.unshift(node.children);
  }
  while (node.parent) {
    menus.unshift(node.parent.children);
    node = node.parent;
  }
  return menus;
});
