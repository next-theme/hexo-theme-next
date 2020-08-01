'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
let plugins;
try {
  plugins = require('@next-theme/plugins');
} catch (error) {
}
const vendorsFile = fs.readFileSync(path.join(__dirname, '../../../_vendors.yml'));
const vendors = yaml.safeLoad(vendorsFile);

module.exports = hexo => {
  if (typeof plugins === 'function') {
    plugins(hexo);
  }
  for (const [key, value] of Object.entries(vendors)) {
    if (hexo.theme.config.vendors[key]) continue;
    const { name, version, file, alias, unavailable } = value;
    const links = {
      jsdelivr: `https://cdn.jsdelivr.net/npm/${name}@${version}/${file}`,
      unpkg   : `https://unpkg.com/${name}@${version}/${file}`,
      cdnjs   : `https://cdnjs.cloudflare.com/ajax/libs/${alias || name}/${version}/${file.replace(/^(dist|lib|)\/(browser\/|)/, '')}`
    };
    let { provider = 'jsdelivr' } = hexo.theme.config.vendors;
    if (unavailable && unavailable.includes('cdnjs')) provider = 'jsdelivr';
    hexo.theme.config.vendors[key] = links[provider];
  }
};
