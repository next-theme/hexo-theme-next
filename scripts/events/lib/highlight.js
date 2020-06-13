const fs = require('fs');

function parse(file) {
  let css = fs.readFileSync(file).toString();
  let rule = '';
  let background = '';
  let foreground = '';
  css.replace(/\.hljs(\s+|,[^{]+)\{(.*?)\}/sg, (match, $1, content) => {
    rule += content;
    return match;
  });
  rule.split('\n').forEach(line => {
    if (line.includes('background:')) background = line.split('background:')[1];
    else if (line.includes('background-color:')) background = line.split('background-color:')[1];
    else if (line.includes('color:')) foreground = line.split('color:')[1];
  });
  return {
    file,
    background,
    foreground
  };
}

module.exports = hexo => {
  let { config } = hexo;
  let theme = hexo.theme.config;
  config.highlight.hljs = false;
  config.prismjs = config.prismjs || {};
  theme.highlight = {
    enable: config.highlight.enable && !config.prismjs.enable,
    light : parse(`${hexo.plugin_dir}highlight.js/styles/${theme.codeblock.theme.light}.css`),
    dark  : parse(`${hexo.plugin_dir}highlight.js/styles/${theme.codeblock.theme.dark}.css`)
  };
  theme.prism = {
    enable: config.prismjs.enable,
    light : `${hexo.plugin_dir}prismjs/themes/${theme.codeblock.prism.light}.css`,
    dark  : `${hexo.plugin_dir}prismjs/themes/${theme.codeblock.prism.dark}.css`,
    number: `${hexo.plugin_dir}prismjs/plugins/line-numbers/prism-line-numbers.css`
  };
};
