'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { url_for } = require('hexo-util');
const { getVendors } = require('./utils');

let internal;
try {
  internal = require('@next-theme/plugins');
} catch (error) {
}
const vendorsFile = fs.readFileSync(path.join(__dirname, '../../../_vendors.yml'));
const dependencies = yaml.load(vendorsFile);

module.exports = hexo => {
  const { vendors, creative_commons, pace } = hexo.theme.config;
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
    if (key === 'pace_css') {
      value.file = `${value.dir}/${pace.color}/pace-theme-${pace.theme}.css`;
    }
    const { name, file, unavailable } = value;
    const links = getVendors({
      ...value,
      minified: file,
      local   : url_for.call(hexo, `lib/${name}/${file}`),
      custom  : vendors.custom_cdn_url
    });
    let { plugins = 'jsdelivr' } = vendors;
    if (plugins === 'cdnjs' && unavailable && unavailable.includes('cdnjs')) plugins = 'jsdelivr';
    if (plugins === 'local' && typeof internal === 'undefined') plugins = 'jsdelivr';
    vendors[key] = {
      url      : links[plugins] || links.jsdelivr,
      integrity: value.integrity
    };
  }
};
