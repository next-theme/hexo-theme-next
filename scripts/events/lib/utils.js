'use strict';

const fs = require('fs');
const path = require('path');

function resolve(name, file = '') {
  let dir;
  try {
    dir = path.dirname(require.resolve(`${name}/package.json`));
  } catch (error) {
    return '';
  }
  return `${dir}/${file}`;
}

function highlightTheme(name) {
  const file = resolve('highlight.js', `styles/${name}.css`);
  const css = fs.readFileSync(file).toString();
  let rule = '';
  let background = '';
  let foreground = '';
  css.replace(/\.hljs(\s+|,[^{]+)\{(.*?)\}/sg, (match, $1, content) => {
    rule += content;
    return match;
  });
  const parse = (line, attr) => line.split(attr)[1].replace(';', '').trim();
  rule.split('\n').forEach(line => {
    if (line.includes('background:')) background = parse(line, 'background:');
    else if (line.includes('background-color:')) background = parse(line, 'background-color:');
    else if (line.includes('color:')) foreground = parse(line, 'color:');
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

// Required by theme-next-docs
module.exports = {
  resolve,
  highlightTheme,
  getVendors,
  points
};
