'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

describe('pdf', () => {
  const pdf = require('../../scripts/tags/pdf')(hexo);

  before(() => {
    hexo.theme.config.pdf = {
      height: '500px'
    };
  });

  it('default', () => {
    pdf(['https://example.com/sample.pdf']).should.eql('<div class="pdf-container" data-target="https://example.com/sample.pdf" data-height="500px"></div>');
  });

  it('custom height', () => {
    pdf(['https://example.com/sample.pdf', '1000px']).should.eql('<div class="pdf-container" data-target="https://example.com/sample.pdf" data-height="1000px"></div>');
  });
});
