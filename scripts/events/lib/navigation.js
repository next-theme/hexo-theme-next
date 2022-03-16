'use strict';

const { join } = require('path');

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
  const menu_root = [];
  hexo.theme.config.menu_map = menu_map;
  hexo.theme.config.menu_root = menu_root;

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
          hexo.log.warn('Missing default entry for ', name);
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
          menu_root.push(node);
        }
      }
    });
  }

  parse(hexo.theme.config.menu);
};
