/**
 * node assets/init-schema.js
 */

'use strict';

const create = () => {
  const { join, resolve } = require('path');
  const { readFileSync, writeFileSync } = require('fs');
  const theme_dir = resolve(__dirname, '../');
  const { safeLoad, safeDump } = require('js-yaml');
  let config = safeLoad(readFileSync(join(theme_dir, '_config.yml'), 'utf-8'));

  let parse = (obj, target) => {
    let child = {};
    if (Array.isArray(obj)) {
      target.type = 'array';
      target.items = child;
      if (obj.length === 0) {
        return;
      }
      obj = obj[0];
      if (typeof obj === 'string') {
        target.items = {
          type: 'string'
        };
        return;
      }
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
  let data = {};
  parse(config, data);
  writeFileSync(join(theme_dir, 'assets/schema-draft.yml'), safeDump(data));
};

create();
