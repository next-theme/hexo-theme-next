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
const dependencies = yaml.load(vendorsFile);

module.exports = hexo => {
  const { vendors, creative_commons } = hexo.theme.config;
  if (typeof internal === 'function') {
    internal(hexo, dependencies);
  }
  for (const [key, value] of Object.entries(dependencies)) {
    // This script will be executed repeatedly when Hexo listens file changes
    // But the variable vendors[key] only needs to be modified once
    if (vendors[key] && typeof vendors[key] === 'string') {
      vendors[key] = {
        url: url_for.call(hexo, vendors[key])
      };
      continue;
    }
    if (key === 'creative_commons') {
      value.file = `${value.dir}/${creative_commons.size}/${creative_commons.license.replace(/-/g, '_')}.svg`;
    }
    const { name, version, file, alias, unavailable } = value;
    const links = {
      local   : url_for.call(hexo, `lib/${name}/${file}`),
      jsdelivr: `https://cdn.jsdelivr.net/npm/${name}@${version}/${file}`,
      unpkg   : `https://unpkg.com/${name}@${version}/${file}`,
      cdnjs   : `https://cdnjs.cloudflare.com/ajax/libs/${alias || name}/${version}/${file.replace(/^(dist|lib|)\/(browser\/|)/, '')}`
    };
    let { plugins = 'jsdelivr' } = vendors;
    if (plugins === 'cdnjs' && unavailable && unavailable.includes('cdnjs')) plugins = 'jsdelivr';
    if (plugins === 'local' && typeof internal === 'undefined') plugins = 'jsdelivr';
    vendors[key] = {
      url      : links[plugins] || links.jsdelivr,
      integrity: value.integrity
    };
  }
};
