/* global hexo */

'use strict';

// http://json-schema.org/understanding-json-schema/reference/index.html
// https://github.com/ajv-validator/ajv
const create = () => {
  const { join } = require('path');
  const { readFileSync, writeFileSync } = require('fs');
  const { theme_dir } = hexo;
  const { safeLoad, safeDump } = require('js-yaml');
  let config = safeLoad(readFileSync(join(theme_dir, '_config.yml'), 'utf-8'));

  let parse = (obj, target) => {
    let child = {};
    if (Array.isArray(obj)) {
      target.type = 'array';
      target.items = child;
    } else {
      target.type = 'object';
      target.properties = child;
    }
    Object.keys(obj).forEach(key => {
      let val = obj[key];
      if (val === null) {
        child[key] = {
          type: 'null'
        };
        return;
      }
      if (typeof val === 'string') {
        child[key] = {
          type: 'string'
        };
        return;
      }
      if (typeof val === 'number') {
        child[key] = {
          type: 'number'
        };
        return;
      }
      if (typeof val === 'boolean') {
        child[key] = {
          type: 'boolean'
        };
        return;
      }
      child[key] = {};
      parse(val, child[key]);
    });
  };
  let data = parse(config);
  writeFileSync(join(__dirname, 'sss.yml'), safeDump(data));
};

hexo.extend.console.register('schema-create', 'Create schema from config file', {}, create);
