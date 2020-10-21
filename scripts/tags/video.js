/**
 * video.js | https://theme-next.js.org/docs/tag-plugins/
 */

'use strict';

module.exports = function(args) {
  return `<video src="${args[0]}" preload="metadata" controlslist="nodownload" controls playsinline poster="${args[1] || ''}"></video>`;
};
