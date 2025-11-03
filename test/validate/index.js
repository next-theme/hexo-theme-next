'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

describe('Validate', () => {
  it('config', () => {
    const themeConfig = fs.readFileSync(path.join(__dirname, '../../_config.yml'));
    (() => {
      yaml.load(themeConfig);
    }).should.not.throw();
  });

  it('vendors', () => {
    const vendorsFile = fs.readFileSync(path.join(__dirname, '../../_vendors.yml'));
    (() => {
      yaml.load(vendorsFile);
    }).should.not.throw();
  });

  it('language', () => {
    const languagesPath = path.join(__dirname, '../../languages');
    (() => {
      fs.readdirSync(languagesPath).forEach(lang => {
        if (!lang.endsWith('.yml')) return;
        const languagePath = path.join(languagesPath, lang);
        yaml.load(fs.readFileSync(languagePath), {
          filename: path.relative(__dirname, languagePath)
        });
      });
    }).should.not.throw();
  });
});
