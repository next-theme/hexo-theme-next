'use strict';

require('chai').should();

describe('video', () => {
  const postVideo = require('../../scripts/tags/video');

  it('default', () => {
    postVideo(['https://example.com/sample.mp4']).should.eql('<video src="https://example.com/sample.mp4" preload="metadata" controls playsinline poster="">Sorry, your browser does not support the video tag.</video>');
  });
});
