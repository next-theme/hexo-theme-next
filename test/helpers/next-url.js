'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

function btoa(str) {
  return Buffer.from(str).toString('base64');
}

describe('next-url', () => {
  const nextUrl = require('../../scripts/helpers/next-url').bind(hexo);

  before(() => {
    hexo.config.url = 'https://example.com';
  });

  it('default', () => {
    nextUrl('/child/').should.eql('');
  });
});
