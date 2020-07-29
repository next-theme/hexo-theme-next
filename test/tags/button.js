'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

describe('button', () => {
  const postButton = require('../../scripts/tags/button')(hexo);

  it('only url', () => {
    postButton(['#']).should.eql('<a class="btn" href="#"></a>');
  });

  it('url and text', () => {
    postButton('#, Hello world'.split(' ')).should.eql('<a class="btn" href="#">Hello world</a>');
  });

  it('url and icon (Font Awesome 4)', () => {
    postButton('#,, home fa-5x'.split(' ')).should.eql('<a class="btn" href="#"><i class="fa fa-home fa-5x"></i></a>');
  });

  it('url and icon', () => {
    postButton('#,, fab fa-fort-awesome fa-5x'.split(' ')).should.eql('<a class="btn" href="#"><i class="fab fa-fort-awesome fa-5x"></i></a>');
  });

  it('url, text and title', () => {
    postButton('#, Hello world,, Title'.split(' ')).should.eql('<a class="btn" href="#" title="Title">Hello world</a>');
  });

  it('url, text, icon and title', () => {
    postButton('#, Hello world, home, Title'.split(' ')).should.eql('<a class="btn" href="#" title="Title"><i class="fa fa-home"></i>Hello world</a>');
  });
});
