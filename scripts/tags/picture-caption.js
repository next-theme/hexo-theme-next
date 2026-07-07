/**
 * picture-caption.js | https://theme-next.js.org/docs/tag-plugins/picture-caption
 * Description: Insert an image with caption.
 * Usage:
 *   {% picturecaption pictureUrl, captionText %}
 *   {% picturecaption pictureUrl, pictureWidth, pictureHeight, captionText, captionUrl, captionIcon, captionPosition, captionAlignment %}
 */

'use strict';

module.exports = ctx => function(args) {
  args = args.join(' ').split(',');

  const pictureUrl = args[0].trim();
  if (!pictureUrl) {
    ctx.log.warn('Image URL can NOT be empty in picture-caption tag.');
    return '';
  }

  // Default value.
  let pictureWidth = 'auto';
  let pictureHeight = 'auto';
  let captionText = '';
  let captionUrl = '';
  let captionIcon = '';
  const theme = ctx.theme.config;
  let captionPosition = theme.picture_caption.caption_position;
  let captionAlignment = theme.picture_caption.caption_alignment;

  // Determine the invocation method based on the number of parameters.
  if (args.length === 2) {
    captionText = args[1].trim() || 'Picture';
  } else if (args.length >= 3) {
    // Take parameters from back to front.
    captionAlignment = ['left', 'center', 'right'].includes(args[args.length - 1].trim()) ? args.pop().trim() : 'center';
    captionPosition = ['top', 'bottom'].includes(args[args.length - 1].trim()) ? args.pop().trim() : 'bottom';
    captionIcon = args.pop().trim(); // This value can be null.
    captionUrl = args.pop().trim(); // This value can be null.
    // Take parameters from front to back.
    pictureWidth = args[1].trim() || 'auto';
    pictureHeight = args[2].trim() || 'auto';
    // Allow the captionText to contain English commas, and extract all characters starting from index 3 to the end.
    captionText = args.slice(3).join(',') || 'Picture';
  }

  const style = `width: ${pictureWidth}; height: ${pictureHeight}; object-fit: contain;`;

  const imgTag = `<img src="${pictureUrl}" alt="${captionText || 'Picture'}" style="${style}">`;

  // Handle captionUrl and captionIcon, default value is null, 'None/none' or empty string is considered as no link.
  const hascaptionUrl = captionUrl && captionUrl.toLowerCase() !== 'none';
  const hascaptionIcon = captionIcon && captionIcon.toLowerCase() !== 'none';

  let captionHtml = '';
  if (captionText) {
    let captionContent = '';
    if (hascaptionIcon) {
      if (!captionIcon.startsWith('fa')) { captionIcon = 'fa fa-' + captionIcon; }
      captionContent = `<i class="${captionIcon}"></i>${captionText}`;
    } else {
      captionContent = captionText;
    }
    if (hascaptionUrl) {
      captionContent = `<a href="${captionUrl}" target="_blank">${captionContent}</a>`;
    }
    captionHtml = `<div class="picture-caption-caption picture-caption-align-${captionAlignment}">${captionContent}</div>`;
  }

  // Determine the order based on captionPosition.
  const content
        = captionPosition === 'bottom'
          ? `${imgTag}${captionHtml}`
          : `${captionHtml}${imgTag}`;

  return `<div class="picture-caption-container picture-caption-position-${captionPosition}" style="max-width: ${pictureWidth};">${content}</div>`;
};
