'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

const fontStyles = ':300,300italic,400,400italic,700,700italic';
const fontHost = 'https://fonts.googleapis.com';

describe('font', () => {
  const nextFont = require('../../scripts/helpers/font').bind(hexo);

  before(() => {
    hexo.theme.font = {};
  });

  it('font disabled', () => {
    hexo.theme.font.enable = false;
    hexo.theme.font.title = {
      family  : 'Amatic SC',
      external: true
    };
    nextFont().should.eql('');
  });

  it('no external font', () => {
    hexo.theme.font.enable = true;
    hexo.theme.font.title = {
      family  : 'Amatic SC',
      external: false
    };
    nextFont().should.eql('');
  });

  it('trivial', () => {
    hexo.theme.font.enable = true;
    hexo.theme.font.title = {
      family  : 'Amatic SC',
      external: true
    };
    hexo.theme.font.headings = {
      family  : 'Palatino',
      external: false
    };
    nextFont().should.eql(`<link rel="stylesheet" href="${fontHost}/css?family=Amatic+SC${fontStyles}&display=swap&subset=latin,latin-ext">`);
  });

  it('multiple', () => {
    hexo.theme.font.enable = true;
    hexo.theme.font.title = {
      family  : 'Amatic SC',
      external: true
    };
    hexo.theme.font.headings = {
      family  : 'Palatino',
      external: true
    };
    nextFont().should.eql(`<link rel="stylesheet" href="${fontHost}/css?family=Amatic+SC${fontStyles}%7CPalatino${fontStyles}&display=swap&subset=latin,latin-ext">`);
  });

  it('duplicate', () => {
    hexo.theme.font.enable = true;
    hexo.theme.font.title = {
      family  : 'Palatino',
      external: true
    };
    hexo.theme.font.headings = {
      family  : 'Palatino',
      external: true
    };
    nextFont().should.eql(`<link rel="stylesheet" href="${fontHost}/css?family=Palatino${fontStyles}&display=swap&subset=latin,latin-ext">`);
  });

  it('fallback font', () => {
    hexo.theme.font.enable = true;
    hexo.theme.font.title = {
      family  : 'Roboto Slab, Noto Serif SC',
      external: true
    };
    hexo.theme.font.headings = {
      family  : 'Palatino',
      external: true
    };
    nextFont().should.eql(`<link rel="stylesheet" href="${fontHost}/css?family=Roboto+Slab${fontStyles}%7CNoto+Serif+SC${fontStyles}%7CPalatino${fontStyles}&display=swap&subset=latin,latin-ext">`);
  });
});
