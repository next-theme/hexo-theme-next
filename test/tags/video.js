'use strict';

require('chai').should();

describe('video', () => {
  const postVideo = require('../../scripts/tags/video');

  it('default', () => {
    postVideo(['https://example.com/sample.mp4']).should.eql('<video src="https://example.com/sample.mp4" preload="metadata" controlslist="nodownload" controls playsinline poster=""></video>');
  });

  it('poster', () => {
    postVideo(['https://example.com/sample.mp4', 'https://example.com/sample.jpg']).should.eql('<video src="https://example.com/sample.mp4" preload="metadata" controlslist="nodownload" controls playsinline poster="https://example.com/sample.jpg"></video>');
  });
});
