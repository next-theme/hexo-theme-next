'use strict';

const { join } = require('path').posix;

class TreeNode {
  constructor(parent, path, name, icon) {
    if (parent && !path.startsWith('http')) {
      path = join(parent.path, path);
    }
    this.parent = parent;
    this.children = [];
    this.path = path;
    this.name = name;
    this.icon = icon;
  }

  append(child) {
    this.children.push(child);
  }
}

module.exports = hexo => {
  const menu_map = new Map();
  const main_menu = [];
  hexo.theme.config.menu_map = menu_map;
  hexo.theme.config.main_menu = main_menu;

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
