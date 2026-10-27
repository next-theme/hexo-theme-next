'use strict';

const helpers = {};

global.hexo = {
  extend: {
    helper: {
      register(name, helper) {
        helpers[name] = helper;
      }
    }
  }
};

require('../../scripts/helpers/engine');
delete global.hexo;

describe('engine', () => {
  const context = {
    next_version: '8.28.0',
    theme       : {
      js     : 'js',
      vendors: {
        internal      : 'local',
        custom_cdn_url: '',
        library       : {
          url: 'https://cdn.example.com/library.js'
        },
        secure_library: {
          url      : 'https://cdn.example.com/secure.js',
          integrity: 'sha256-example'
        },
        stylesheet: {
          url: 'https://cdn.example.com/library.css'
        }
      }
    },
    url_for(path) {
      return '/' + path;
    }
  };

  const nextJs = helpers.next_js.bind(context);
  const nextVendors = helpers.next_vendors.bind(context);

  it('keeps defer as the default for NexT scripts', () => {
    nextJs('main.js').should.eql('<script src="/js/main.js" defer></script>');
  });

  it('supports custom loading options for NexT scripts', () => {
    nextJs('main.js', { defer: false }).should.eql('<script src="/js/main.js"></script>');
    nextJs('main.js', { async: true }).should.eql('<script src="/js/main.js" async></script>');
    nextJs('main.js', { defer: true, async: true }).should.eql('<script src="/js/main.js" defer async></script>');
  });

  it('preserves existing NexT script options', () => {
    nextJs('main.js', { pjax: true, module: true }).should.eql('<script data-pjax type="module" src="/js/main.js" defer></script>');
  });

  it('keeps defer as the default for vendor scripts', () => {
    nextVendors('library').should.eql('<script src="https://cdn.example.com/library.js" defer></script>');
    nextVendors('secure_library').should.eql('<script src="https://cdn.example.com/secure.js" integrity="sha256-example" crossorigin="anonymous" defer></script>');
  });

  it('supports custom loading options for vendor scripts', () => {
    nextVendors('library', { defer: false }).should.eql('<script src="https://cdn.example.com/library.js"></script>');
    nextVendors('library', { async: true }).should.eql('<script src="https://cdn.example.com/library.js" async></script>');
  });

  it('does not apply script loading options to stylesheets', () => {
    nextVendors('stylesheet', { async: true }).should.eql('<link rel="stylesheet" href="https://cdn.example.com/library.css">');
  });

  describe('next_pre', () => {
    const nextPre = (theme = {}) => helpers.next_pre.call({
      theme: {
        preconnect: true,
        js        : 'js',
        font      : { enable: false },
        vendors   : { internal: 'local', plugins: 'local', custom_cdn_url: '' },
        ...theme
      }
    });

    it('skips a relative local script path', () => {
      nextPre().should.eql('');
    });

    it('uses the scheme and hostname of an absolute local script URL', () => {
      nextPre({ js: 'https://static.example.com/next/js' }).should.eql('<link rel="preconnect" href="https://static.example.com" crossorigin>');
    });

    it('drops the port and path of a custom CDN URL', () => {
      nextPre({
        vendors: { internal: 'custom', plugins: 'custom', custom_cdn_url: 'https://Cdn.Example.com:8443/npm/${npm_name}@${version}/${minified}' }
      }).should.eql('<link rel="preconnect" href="https://cdn.example.com" crossorigin>');
    });

    it('skips a protocol-relative custom CDN URL', () => {
      nextPre({ vendors: { internal: 'custom', plugins: 'custom', custom_cdn_url: '//cdn.example.com' } }).should.eql('');
    });
  });
});
