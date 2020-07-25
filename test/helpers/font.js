'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

describe('font', () => {
  const nextFont = require('../../scripts/helpers/font').bind(hexo);

  before(() => {
    hexo.theme.font = {};
  });

  it('font disabled', () => {
    hexo.theme.font.enable = false;
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
    nextFont().should.eql('<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Amatic SC:300,300italic,400,400italic,700,700italic&display=swap&subset=latin,latin-ext">');
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
    nextFont().should.eql('<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Amatic SC:300,300italic,400,400italic,700,700italic|Palatino:300,300italic,400,400italic,700,700italic&display=swap&subset=latin,latin-ext">');
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
    nextFont().should.eql('<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Palatino:300,300italic,400,400italic,700,700italic&display=swap&subset=latin,latin-ext">');
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
    nextFont().should.eql('<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto Slab:300,300italic,400,400italic,700,700italic|Noto Serif SC:300,300italic,400,400italic,700,700italic|Palatino:300,300italic,400,400italic,700,700italic&display=swap&subset=latin,latin-ext">');
  });
});
