'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { url_for } = require('hexo-util');
let internal;
try {
  internal = require('@next-theme/plugins');
} catch (error) {
}
const vendorsFile = fs.readFileSync(path.join(__dirname, '../../../_vendors.yml'));
const dependencies = yaml.safeLoad(vendorsFile);

module.exports = hexo => {
  const { vendors } = hexo.theme.config;
  if (typeof internal === 'function') {
    internal(hexo, dependencies);
  }
  for (const [key, value] of Object.entries(dependencies)) {
    if (vendors[key]) {
      vendors[key] = url_for.call(hexo, vendors[key]);
      continue;
    }
    const { name, version, file, alias, unavailable } = value;
    const links = {
      local   : url_for.call(hexo, `lib/${name}/${file}`),
      jsdelivr: `//cdn.jsdelivr.net/npm/${name}@${version}/${file}`,
      unpkg   : `//unpkg.com/${name}@${version}/${file}`,
      cdnjs   : `//cdnjs.cloudflare.com/ajax/libs/${alias || name}/${version}/${file.replace(/^(dist|lib|)\/(browser\/|)/, '')}`
    };
    let { plugins = 'jsdelivr' } = vendors;
    if (plugins === 'cdnjs' && unavailable && unavailable.includes('cdnjs')) plugins = 'jsdelivr';
    if (plugins === 'local' && typeof internal === 'undefined') plugins = 'jsdelivr';
    vendors[key] = links[plugins] || links.jsdelivr;
  }
};
