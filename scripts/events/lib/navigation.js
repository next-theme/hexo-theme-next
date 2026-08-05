'use strict';

const { join } = require('path').posix;

class TreeNode {
  /**
   * @param {?TreeNode} parent 
   * @param {string} path 
   * @param {string} name 
   * @param {string} icon
   */
  constructor(parent, path, name, icon) {
    if (parent && !path.startsWith('http')) {
      path = join(parent.path, path);
    }
    this.parent = parent;
    /** @type {TreeNode[]} */
    this.children = [];
    this.path = path;
    this.name = name;
    this.icon = icon;
  }

  /**
   * @param {TreeNode} child
   */
  append(child) {
    this.children.push(child);
  }
}

/**
 * @typedef {TreeNode} TreeNode
 */

module.exports = /** @param {import('hexo')} hexo */ hexo => {
  /** @type {Map<string, TreeNode>} */
  const menu_map = new Map();
  /** @type {TreeNode[]} */
  const main_menu = [];
  hexo.theme.config.menu_map = menu_map;
  hexo.theme.config.main_menu = main_menu;

  /**
   * @param {Record<string, string | { default: string }>} menu
   * @param {?TreeNode} parent
   */
  function parse(menu, parent) {
    if (!menu) return;
    Object.entries(menu).forEach(([name, value]) => {
      if (name.toLowerCase() === 'default') return;
      let node;
      if (typeof value === 'string') {
        const [path, icon] = value.split('||').map(v => v.trim());
        node = new TreeNode(parent, path, name, icon);
      } else if (typeof value === 'object') {
        if (typeof value.default !== 'string') {
          hexo.log.warn('Missing default entry for menu item:', name);
          return;
        }
        const [path, icon] = value.default.split('||').map(v => v.trim());
        node = new TreeNode(parent, path, name, icon);
        parse(value, node);
      }
      if (node) {
        menu_map.set(node.path, node);
        if (parent) {
          parent.append(node);
        } else {
          main_menu.push(node);
        }
      }
    });
  }

  parse(hexo.theme.config.menu);
};
