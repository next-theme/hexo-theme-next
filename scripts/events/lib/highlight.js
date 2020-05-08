const fs = require('fs');

function parse(file) {
  let css = fs.readFileSync(file).toString();
  let rule = '';
  let background = '';
  let foreground = '';
  css.replace(/\.hljs([^\S]+|,[^\{]+)\{(.*?)\}/sg, (match, $1, content) => {
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
  hexo.config.highlight.hljs = false;
  let file = `${hexo.plugin_dir}highlight.js/styles/${hexo.theme.config.codeblock.highlight_theme}.css`;
  hexo.theme.config.highlight = parse(file);
};
