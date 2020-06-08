/* global hexo */

'use strict';

// http://json-schema.org/understanding-json-schema/reference/index.html
// https://github.com/ajv-validator/ajv
const check = () => {
  const { join } = require('path');
  const { readFileSync } = require('fs');
  const { log, theme_dir } = hexo;
  const { safeLoad } = require('js-yaml');
  const { deepMerge } = require('hexo-util');
  const Ajv = require('ajv');
  const ajv = new Ajv();
  const validate = ajv.compile(safeLoad(readFileSync(join(__dirname, 'schema.yml'), 'utf-8')));
  let config = safeLoad(readFileSync(join(theme_dir, '_config.yml'), 'utf-8'));
  if (hexo.config.theme_config) {
    config = deepMerge(config, hexo.config.theme_config);
  }
  var valid = validate(config);
  if (valid) {
    log.info('Congratulations, your theme configuration is correct!');
  } else {
    validate.errors.forEach(item => {
      log.error(`hexo.theme${item.dataPath} ${item.message}`);
    });
  }
};

hexo.extend.console.register('check', 'Check whether the environment is complete', {}, check);
