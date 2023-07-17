/* global Fancybox */

document.addEventListener('page:loaded', () => {

  /**
   * Wrap images with fancybox.
   */
  document.querySelectorAll('.post-body :not(a) > img, .post-body > img').forEach(image => {
    const imageLink = image.getAttribute('data-src') || image.getAttribute('src');
    const imageWrapLink = document.createElement('a');
    imageWrapLink.classList.add('fancybox');
    imageWrapLink.href = imageLink;
    imageWrapLink.setAttribute('itemscope', '');
    imageWrapLink.setAttribute('itemtype', 'http://schema.org/ImageObject');
    imageWrapLink.setAttribute('itemprop', 'url');
    image.wrap(imageWrapLink);

    if (image.closest('.post-gallery') !== null) {
      imageWrapLink.setAttribute('data-fancybox', 'gallery');
    } else if (image.closest('.group-picture') !== null) {
      imageWrapLink.setAttribute('data-fancybox', 'group');
    } else {
      imageWrapLink.setAttribute('data-fancybox', 'default');
    }

    const imageTitle = image.getAttribute('title') || image.getAttribute('alt');
    if (imageTitle) {
      // Do not append image-caption if pandoc has already created a figcaption
      if (!imageWrapLink.nextElementSibling || imageWrapLink.nextElementSibling.tagName.toLowerCase() !== 'figcaption') {
        const imageCaption = document.createElement('p');
        imageCaption.classList.add('image-caption');
        imageCaption.textContent = imageTitle;
        imageWrapLink.appendChild(imageCaption);
      }
      // Make sure img title tag will show correctly in fancybox
      imageWrapLink.title = imageTitle;
      imageWrapLink.dataset.caption = imageTitle;
    }
  });

  Fancybox.bind('[data-fancybox]');
});
