'use strict';

// https://developers.google.com/fonts/docs/getting_started
module.exports = function() {
  const config = this.theme.font;

  if (!config || !config.enable) return '';

  const fontStyles = ':ital,wght@0,300;0,400;0,700;1,300;1,400;1,700';
  const fontHost = config.host || 'https://fonts.googleapis.com';

  // Get a font list from config
  let fontFamilies = [];
  ['global', 'title', 'headings', 'posts', 'codes'].forEach(item => {
    if (config[item]?.family && config[item].external) {
      fontFamilies = fontFamilies.concat(config[item].family.split(','));
    }
  });

  fontFamilies = fontFamilies.map(name => name.trim().replace(/\s/g, '+') + fontStyles);
  fontFamilies = [...new Set(fontFamilies)].map(name => 'family=' + name).join('&');

  // Merge extra parameters to the final processed font string
  return fontFamilies ? `<link rel="stylesheet" href="${fontHost}/css2?${fontFamilies}&display=swap&subset=latin,latin-ext">` : '';
};
