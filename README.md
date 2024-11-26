<div align="right">
  Language:
  🇺🇸
  <a title="Chinese" href="docs/zh-CN/README.md">🇨🇳</a>
  <a title="Russian" href="docs/ru/README.md">🇷🇺</a>
</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/next-theme/theme-next-docs/v8.13.0/source/images/next-schemes-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/next-theme/theme-next-docs/v8.13.0/source/images/next-schemes.png">
  <img alt="NexT preview" src="https://raw.githubusercontent.com/next-theme/theme-next-docs/v8.13.0/source/images/next-schemes.png">
</picture>

<a title="NexT website" href="https://theme-next.js.org"><img align="right" alt="NexT logo" width="100" height="100" src="https://raw.githubusercontent.com/next-theme/hexo-theme-next/master/source/images/logo.svg"></a>

# NexT

> NexT is a high quality elegant [Hexo](https://hexo.io) theme. It is crafted from scratch with love.

[![NPM version](https://img.shields.io/npm/v/hexo-theme-next?color=red&logo=npm&style=flat-square)](https://www.npmjs.com/package/hexo-theme-next)
[![NPM Downloads](https://img.shields.io/npm/dm/hexo-theme-next?logo=npm&style=flat-square)](https://www.npmjs.com/package/hexo-theme-next)
[![Required Hexo version](https://img.shields.io/badge/hexo-%3E=5.3.0-blue?style=flat-square&logo=hexo)](https://hexo.io)
[![License](https://img.shields.io/badge/license-%20AGPL-orange?style=flat-square&logo=gnu)](https://github.com/next-theme/hexo-theme-next/blob/master/LICENSE.md)
[![Build Status](https://img.shields.io/github/actions/workflow/status/next-theme/hexo-theme-next/linter.yml?branch=master&label=test&logo=github&style=flat-square)](https://github.com/next-theme/hexo-theme-next/actions?query=workflow%3ALinter)
[![Build Status](https://img.shields.io/github/actions/workflow/status/next-theme/hexo-theme-next/tester.yml?branch=master&logo=github&style=flat-square)](https://github.com/next-theme/hexo-theme-next/actions?query=workflow%3ATester)
[![Coverage Status](https://img.shields.io/coveralls/github/next-theme/hexo-theme-next?logo=coveralls&style=flat-square)](https://coveralls.io/github/next-theme/hexo-theme-next)

## Live Preview

<p align="center">
  💟 <a href="https://theme-next.js.org/muse/">Muse</a> | 🔯 <a href="https://theme-next.js.org/mist/">Mist</a> | ♓️ <a href="https://theme-next.js.org/pisces/">Pisces</a> | ♊️ <a href="https://theme-next.js.org">Gemini</a>
<br>
<br>
  More NexT examples <a href="https://github.com/next-theme/awesome-next#live-preview">here</a>.
</p>

## Installation

If you're using Hexo 5.0 or later, the simplest way to install is through npm:

```sh
cd hexo-site
npm install hexo-theme-next
```

Or you can clone the entire repository:

```sh
cd hexo-site
git clone https://github.com/next-theme/hexo-theme-next themes/next
```

See [detailed installation instructions][docs-installation-url] if you want any other variant.

After the installation, open Hexo config file and set `theme` variable to `next`.

```yml
theme: next
```

## Configuration

It is not recommended to directly modify any files in the NexT theme. Because this may cause errors (e.g. merge conflicts), and the modified files may be discarded when upgrading the theme.

At present, NexT encourages users to use the [Alternate Theme Config][docs-configuration-url] to configure NexT. And it's easy to customize the layout or style of NexT using [Custom Files][docs-custom-files-url].

## Plugins

Plugins extend and expand the functionality of NexT. There are two types of plugins: core plugins and third-party plugins. The core plugins are required by the basic functions of NexT. Third-party plugins provide a large number of optional features.

Configuring these plugins is very easy. For example, if you want to enable `pjax` on your site, just set `pjax` to `true` in NexT config file:

```yml
# Easily enable fast Ajax navigation on your website.
# For more information: https://github.com/next-theme/pjax
pjax: true
```

### Configure CDN

Third-party plugins are loaded from [CDNJS](https://cdnjs.com) CDN by default. We also provide other optional CDNs, including the famous [UNPKG](https://unpkg.com) and [jsDelivr](https://www.jsdelivr.com).

For example, if you want to use `unpkg` instead of `cdnjs` as the default CDN provider, you need to edit the following settings in NexT config file:

```yml
vendors:
  # ...
  # Some contents...
  # ...
  plugins: unpkg
```

## Update

A new version of NexT will be released every month. Please read the [release notes][docs-release-url] before updating the theme. You can update NexT by the following command.

Install the latest version through npm:

```sh
cd hexo-site
npm install hexo-theme-next@latest
```

Or update to the latest master branch:

```sh
cd themes/next
git pull
```

**If you want to update from v5.x / v7.x to the latest version, read [this][docs-upgrade-url].**

## Community

Connect with us and be part of our growing community!

* **Telegram Group (Chinese Language)**: [Click here to join!](https://t.me/theme_next_cn)
* **Discord Server**: [Join our Discord!](https://discord.gg/qmkgkY3jaG)
* **Gitter**: [Join our Gitter chats!][gitter-url]

## Feedback

* Visit the [Awesome NexT][awesome-next-url] list to share plugins and tutorials with other users.
* Join our [GitHub discussions][discussions-url].
* [Add or improve translation][i18n-url] in few seconds.
* Report a bug in [GitHub Issues][issues-bug-url].
* Request a new feature on [GitHub][issues-feat-url].
* Vote for [popular feature requests][feat-req-vote-url].

## Contributing

We welcome you to join the development of NexT. Please see [contributing document][contributing-document-url]. 🤗

Also, we welcome Issue or PR to our [official-plugins][official-plugins-url].

## Contributors

[![Contributors][contributors-image]][contributors-url]

## Thanks

NexT send special thanks to these great services that sponsor our core infrastructure:

<a href="https://github.com"><img height="40" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"></a>

> GitHub allows us to host the Git repository and run the test suite.

<a href="https://www.netlify.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" height="40" srcset="https://www.netlify.com/v3/img/components/full-logo-dark.svg">
    <source media="(prefers-color-scheme: light)" height="40" srcset="https://www.netlify.com/v3/img/components/full-logo-light.svg">
    <img alt="Netlify Logo" height="40" src="https://www.netlify.com/v3/img/components/full-logo-light.svg">
  </picture>
</a>

> Netlify allows us to distribute the documentation.

<a href="https://crowdin.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" height="40" srcset="https://support.crowdin.com/assets/logos/core-logo/svg/crowdin-core-logo-cWhite.svg">
    <source media="(prefers-color-scheme: light)" height="40" srcset="https://support.crowdin.com/assets/logos/core-logo/svg/crowdin-core-logo-cDark.svg">
    <img alt="Netlify Logo" height="40" src="https://support.crowdin.com/assets/logos/core-logo/svg/crowdin-core-logo-cDark.svg">
  </picture>
</a>

> Crowdin allows us to translate conveniently the documentation.

<a href="https://cdnjs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" height="40" srcset="https://raw.githubusercontent.com/cdnjs/brand/master/logo/source/light-brackets.svg">
    <source media="(prefers-color-scheme: light)" height="40" srcset="https://raw.githubusercontent.com/cdnjs/brand/master/logo/source/dark-brackets.svg">
    <img alt="CDNJS Logo" height="40" src="https://raw.githubusercontent.com/cdnjs/brand/master/logo/source/dark-brackets.svg">
  </picture>
</a>

> Thanks CDNJS for providing public CDN service.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnext-theme%2Fhexo-theme-next.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnext-theme%2Fhexo-theme-next?ref=badge_large)

[docs-installation-url]: https://theme-next.js.org/docs/getting-started/installation.html
[docs-configuration-url]: https://theme-next.js.org/docs/getting-started/configuration.html
[docs-custom-files-url]: https://theme-next.js.org/docs/advanced-settings/custom-files.html
[docs-release-url]: https://github.com/next-theme/hexo-theme-next/releases
[docs-upgrade-url]: https://theme-next.js.org/docs/getting-started/upgrade.html

[awesome-next-url]: https://github.com/next-theme/awesome-next
[discussions-url]: https://github.com/next-theme/hexo-theme-next/discussions
[gitter-url]: https://app.gitter.im/#/room/#next:gitter.im
[i18n-url]: https://crowdin.com/project/hexo-theme-next

[issues-bug-url]: https://github.com/next-theme/hexo-theme-next/issues/new?assignees=&labels=Bug&template=bug-report.md
[issues-feat-url]: https://github.com/next-theme/hexo-theme-next/issues/new?assignees=&labels=Feature+Request&template=feature-request.md
[feat-req-vote-url]: https://github.com/next-theme/hexo-theme-next/issues?q=is%3Aopen+is%3Aissue+label%3A%22Feature+Request%22

[contributing-document-url]: https://github.com/next-theme/hexo-theme-next/blob/master/.github/CONTRIBUTING.md
[official-plugins-url]: https://github.com/next-theme
[contributors-image]: https://raw.githubusercontent.com/next-theme/contributors/master/contributors.svg
[contributors-url]: https://github.com/next-theme/hexo-theme-next/blob/master/docs/AUTHORS.md
