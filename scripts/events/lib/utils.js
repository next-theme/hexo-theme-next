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

function parse(line, attr) {
  return line.split(attr)[1].replace(';', '').trim();
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
  points
};
