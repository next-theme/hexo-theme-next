'use strict';

const fs = require('fs');
const path = require('path');
let css;
try {
  css = require('@adobe/css-tools');
} catch {
  css = require('css');
}

function resolve(name, file = '') {
  let dir;
  try {
    dir = path.dirname(require.resolve(`${name}/package.json`));
  } catch {
    return '';
  }
  return `${dir}/${file}`;
}

function highlightTheme(name) {
  const file = resolve('highlight.js', `styles/${name}.css`);
  const content = fs.readFileSync(file, 'utf8');

  let background = '';
  let foreground = '';
  css.parse(content).stylesheet.rules
    .filter(rule => rule.type === 'rule' && rule.selectors.some(selector => selector.endsWith('.hljs')))
    .flatMap(rule => rule.declarations)
    .forEach(declaration => {
      if (declaration.property === 'background' || declaration.property === 'background-color') background = declaration.value;
      else if (declaration.property === 'color') foreground = declaration.value;
    });
  return {
    file,
    background,
    foreground
  };
}

function getVendors({ name, alias, version, file, minified, local, custom }) {
  // Make it possible to set `cdnjs_name` and `cdnjs_file` in `custom_cdn_url`
  const npm_name = name;
  const cdnjs_name = alias || name;
  const npm_file = file;
  const cdnjs_file = minified.replace(/^(dist|lib|source\/js|)\/(browser\/|)/, '');
  const value = {
    npm_name,
    cdnjs_name,
    version,
    npm_file,
    minified,
    cdnjs_file
  };
  return {
    local,
    jsdelivr: `https://cdn.jsdelivr.net/npm/${npm_name}@${version}/${minified}`,
    unpkg   : `https://unpkg.com/${npm_name}@${version}/${npm_file}`,
    cdnjs   : `https://cdnjs.cloudflare.com/ajax/libs/${cdnjs_name}/${version}/${cdnjs_file}`,
    custom  : (custom || '').replace(/\$\{(.+?)\}/g, (match, $1) => value[$1])
  };
}

const points = {
  views: [
    'head',
    'header',
    'sidebar',
    'postMeta',
    'postBodyStart',
    'postBodyEnd',
    'footer',
    'bodyEnd',
    'comment'
  ],
  styles: [
    'variable',
    'mixin',
    'style'
  ]
};

// Required by theme-next-docs and @next-theme/plugins
module.exports = {
  resolve,
  highlightTheme,
  getVendors,
  points
};
