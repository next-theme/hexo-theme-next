'use strict';

require('chai').should();

describe('tabs', () => {
  const Hexo = require('hexo');
  const hexo = new Hexo(__dirname);
  const postTabs = require('../../scripts/tags/tabs')(hexo);

  before(() => hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-renderer-marked'))));

  it('', () => {
    postTabs([]).should.eql('');
  });
});
