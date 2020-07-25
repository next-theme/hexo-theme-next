'use strict';

require('chai').should();

describe('label', () => {
  const Hexo = require('hexo');
  const hexo = new Hexo(__dirname);
  const postLabel = require('../../scripts/tags/label')(hexo);

  it('only text', () => {
    postLabel('@Hello world'.split(' ')).should.eql('<mark class="label default">Hello world</mark>');
  });

  it('classes and text', () => {
    postLabel('primary@Hello world'.split(' ')).should.eql('<mark class="label primary">Hello world</mark>');
  });
});
