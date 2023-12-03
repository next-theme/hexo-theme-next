'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const should = require('chai').should();

describe('Validate', () => {
  it('config', () => {
    const themeConfig = fs.readFileSync(path.join(__dirname, '../../_config.yml'));
    should.not.throw(() => {
      yaml.load(themeConfig);
    });
  });

  it('vendors', async () => {
    const { createHash } = require('crypto');
    const { getVendors } = require('../../scripts/events/lib/utils');
    const vendorsFile = fs.readFileSync(path.join(__dirname, '../../_vendors.yml'));
    (await Promise.all(Object.entries(yaml.load(vendorsFile)).map(async ([key, vendor]) => {
      vendor.minified = vendor.file || '';
      const { cdnjs } = getVendors(vendor);
      // fetch content and check sha256
      return await fetch(cdnjs)
        .then((response) => response.text())
        .then((body) => {
          const integrity = Buffer.from(createHash('sha256').update(body, 'utf8').digest()).toString('base64');
          return !vendor.integrity || "sha256-" + integrity == vendor.integrity;
        });
    }))).should.all.equal(true);
  });

  it('language', () => {
    const languagesPath = path.join(__dirname, '../../languages');
    should.not.throw(() => {
      fs.readdirSync(languagesPath).forEach(lang => {
        if (!lang.endsWith('.yml')) return;
        const languagePath = path.join(languagesPath, lang);
        yaml.load(fs.readFileSync(languagePath), {
          filename: path.relative(__dirname, languagePath)
        });
      });
    });
  });
});
