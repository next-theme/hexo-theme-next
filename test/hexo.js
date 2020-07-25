'use strict';

const marked = require('hexo-renderer-marked/lib/renderer');

function Hexo() {
  this.config = {};
  this.theme = {
    config: {}
  };
  this.execFilterSync = () => {};
  this.error = [];
  this.log = {
    warn: message => {
      this.error.push(message);
    }
  };
  this.render = {
    renderSync: marked.bind(this)
  };
}

module.exports = Hexo;
