/**
 * video.js | https://theme-next.js.org/docs/tag-plugins/
 */

'use strict';

module.exports = function(args) {
  return `<video src="${args}" preload="metadata" controls playsinline poster="">Sorry, your browser does not support the video tag.</video>`;
};
