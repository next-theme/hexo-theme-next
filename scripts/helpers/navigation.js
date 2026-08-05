/* global hexo */

'use strict';

/**
 * @typedef {import('../events/lib/navigation.js').TreeNode} TreeNode
 */

hexo.extend.helper.register('next_menu', function(/** @type {string} */ path) {
  path = ('/' + path).replace(/index\.html$/, '');
  /** @type {{ menu_map: Map<string, TreeNode> }} */
  const { menu_map } = this.theme;
  if (!menu_map.has(path)) return;
  let node = menu_map.get(path);
  /** @type {TreeNode[][]} */
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
