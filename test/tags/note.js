'use strict';

require('chai').should();

describe('note', () => {
  const Hexo = require('hexo');
  const hexo = new Hexo(__dirname);
  const postNote = require('../../scripts/tags/note')(hexo);

  before(() => hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-renderer-marked'))));

  it('', () => {
    postNote([]).should.eql('');
  });
});
