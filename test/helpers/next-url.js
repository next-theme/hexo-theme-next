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
    hexo.url_for = require('hexo/dist/plugins/helper/url_for').bind(hexo);
  });

  it('text', () => {
    nextUrl('/child/', 'Text').should.eql('<a href="/child/">Text</a>');
  });

  it('icon', () => {
    nextUrl('/child/', '<i class="fab fa-fort-awesome"></i>').should.eql('<a href="/child/"><i class="fab fa-fort-awesome"></i></a>');
  });

  it('class', () => {
    nextUrl('/child/', 'Text', { class: 'theme-link' }).should.eql('<a href="/child/" class="theme-link">Text</a>');
  });

  it('external', () => {
    nextUrl('https://theme-next.js.org', 'Text').should.eql('<a href="https://theme-next.js.org/" rel="noopener" target="_blank">Text</a>');
  });

  it('decodeURI', () => {
    (() => nextUrl('https://theme-next.js.org', 'A % B')).should.not.throw();
  });

  it('exturl enabled', () => {
    hexo.theme.exturl = true;
    const encoded = btoa('https://theme-next.js.org');
    nextUrl('https://theme-next.js.org', 'Text').should.eql(`<span class="exturl" data-url="${encoded}">Text</span>`);
  });

  it('class with exturl enabled', () => {
    hexo.theme.exturl = true;
    const encoded = btoa('https://theme-next.js.org');
    nextUrl('https://theme-next.js.org', 'Text', { class: 'theme-link' }).should.eql(`<span class="exturl theme-link" data-url="${encoded}">Text</span>`);
  });
});
