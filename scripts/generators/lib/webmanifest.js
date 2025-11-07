'use strict';

module.exports = hexo => {
  const theme = hexo.theme.config;
  const { enable, ...webmanifest } = theme.webmanifest;
  if (enable) {
    return {
      path: theme.favicon.android_manifest || "manifest.json",
      data: JSON.stringify(webmanifest)
    }
  }
}