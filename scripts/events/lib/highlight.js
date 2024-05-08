'use strict';

const fs = require('fs');
const { resolve, highlightTheme } = require('./utils');

function prismTheme(name) {
  let file = resolve('prismjs', `themes/${name}.css`);
  if (!fs.existsSync(file)) file = resolve('prism-themes', `themes/${name}.css`);
  return file;
}

module.exports = hexo => {
  const { config } = hexo;
  const theme = hexo.theme.config;
  config.highlight.hljs = false;
  theme.highlight = {
    enable: config.syntax_highlighter === 'highlight.js' || config.highlight.enable,
    light : highlightTheme(theme.codeblock.theme.light),
    dark  : highlightTheme(theme.codeblock.theme.dark)
  };
  theme.prism = {
    enable: config.syntax_highlighter === 'prismjs' || config.prismjs.enable,
    light : prismTheme(theme.codeblock.prism.light),
    dark  : prismTheme(theme.codeblock.prism.dark),
    number: resolve('prismjs', 'plugins/line-numbers/prism-line-numbers.css')
  };
};
