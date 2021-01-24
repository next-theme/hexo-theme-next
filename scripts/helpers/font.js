'use strict';

// https://developers.google.com/fonts/docs/getting_started
module.exports = function() {
  const config = this.theme.font;

  if (!config || !config.enable) return '';

  const fontStyles = ':300,300italic,400,400italic,700,700italic';
  const fontHost = config.host || 'https://fonts.googleapis.com';

  // Get a font list from config
  let fontFamilies = [];
  ['global', 'title', 'headings', 'posts', 'codes'].forEach(item => {
    if (config[item] && config[item].family && config[item].external) {
      fontFamilies = fontFamilies.concat(config[item].family.split(','));
    }
  });

  fontFamilies = fontFamilies.map(name => name.trim().replace(/\s/g, '+') + fontStyles);
  fontFamilies = [...new Set(fontFamilies)].join('%7C');

  // Merge extra parameters to the final processed font string
  return fontFamilies ? `<link rel="stylesheet" href="${fontHost}/css?family=${fontFamilies}&display=swap&subset=latin,latin-ext">` : '';
};
