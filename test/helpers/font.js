'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

const fontStyles = ':ital,wght@0,300;0,400;0,700;1,300;1,400;1,700';
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
    nextFont().should.eql(`<link rel="stylesheet" href="${fontHost}/css2?family=Amatic+SC${fontStyles}&display=swap&subset=latin,latin-ext">`);
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
    nextFont().should.eql(`<link rel="stylesheet" href="${fontHost}/css2?family=Amatic+SC${fontStyles}&family=Palatino${fontStyles}&display=swap&subset=latin,latin-ext">`);
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
    nextFont().should.eql(`<link rel="stylesheet" href="${fontHost}/css2?family=Palatino${fontStyles}&display=swap&subset=latin,latin-ext">`);
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
    nextFont().should.eql(`<link rel="stylesheet" href="${fontHost}/css2?family=Roboto+Slab${fontStyles}&family=Noto+Serif+SC${fontStyles}&family=Palatino${fontStyles}&display=swap&subset=latin,latin-ext">`);
  });
});
