<div align="right">
  Язык:
  <a title="Английский" href="../../README.md">🇺🇸</a>
  <a title="Китайский" href="../zh-CN/README.md">🇨🇳</a>
  🇷🇺
</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/next-theme/theme-next-docs/v8.13.0/source/images/next-schemes-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/next-theme/theme-next-docs/v8.13.0/source/images/next-schemes.png">
  <img alt="NexT preview" src="https://raw.githubusercontent.com/next-theme/theme-next-docs/v8.13.0/source/images/next-schemes.png">
</picture>

<a title="NexT website" href="https://theme-next.js.org"><img align="right" alt="NexT logo" width="100" height="100" src="https://raw.githubusercontent.com/next-theme/hexo-theme-next/master/source/images/logo.svg?sanitize=true"></a>

# NexT

> «NexT» — элегантная высококачественная тема под [Hexo](https://hexo.io). Сделана с нуля, с любовью.

[![NPM version](https://img.shields.io/npm/v/hexo-theme-next?color=red&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/hexo-theme-next)
[![NPM Downloads](https://img.shields.io/npm/dm/hexo-theme-next?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/hexo-theme-next)
[![Required Hexo version](https://img.shields.io/badge/hexo-%3E=7.0.0-blue?style=for-the-badge&logo=hexo)](https://hexo.io)
[![License](https://img.shields.io/badge/license-%20AGPL-orange?style=for-the-badge&logo=gnu)](https://github.com/next-theme/hexo-theme-next/blob/master/LICENSE.md)
[![Build Status](https://img.shields.io/github/actions/workflow/status/next-theme/hexo-theme-next/linter.yml?branch=master&label=test&logo=github&style=for-the-badge)](https://github.com/next-theme/hexo-theme-next/actions?query=workflow%3ALinter)
[![Build Status](https://img.shields.io/github/actions/workflow/status/next-theme/hexo-theme-next/tester.yml?branch=master&logo=github&style=for-the-badge)](https://github.com/next-theme/hexo-theme-next/actions?query=workflow%3ATester)
[![Coverage Status](https://img.shields.io/coveralls/github/next-theme/hexo-theme-next?logo=coveralls&style=for-the-badge)](https://coveralls.io/github/next-theme/hexo-theme-next)

## Демо

<p align="center">
  💟 <a href="https://theme-next.js.org/muse/">Muse</a> | 🔯 <a href="https://theme-next.js.org/mist/">Mist</a> | ♓️ <a href="https://theme-next.js.org/pisces/">Pisces</a> | ♊️ <a href="https://theme-next.js.org">Gemini</a>
<br>
<br>
  Больше примеров «NexT» <a href="https://github.com/next-theme/awesome-next#live-preview">здесь</a>.
</p>

## Установка

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

## Плагины

Plugins extend and expand the functionality of NexT. Some advanced features may require third-party libraries or additional configuration, giving you the flexibility to create a truly personalized website.

Configuring these plugins is very easy. Например, Вы хотите использовать `pjax` для своего сайта. Открываем конфиг NexT'а и находим:

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

## Обновление

The NexT theme will continue to release new versions to include new features and bug fixes. Please read the [release notes][docs-release-url] before updating the theme. You can update NexT by the following command.

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

**Если нужно обновиться с версии v5.x / v7.x на последней версиями, читаем [здесь][docs-upgrade-url].**

## Community

Connect with us and be part of our growing community!

* **Discord Server**: [Join our Discord!](https://discord.gg/qmkgkY3jaG)
* **Gitter**: [Join our Gitter chats!][gitter-url]
* **ChatGPT**: [NexT Mentor][gpt-url]

## Обратная связь

* Посетите [Awesome NexT][awesome-next-url] список.
* Вступить в наши [GitHub discussions][discussions-url].
* [Добавить или улучшить перевод][i18n-url] за несколько секунд.
* Сообщить об ошибке в разделе [GitHub Issues][issues-bug-url].
* Запросить новую возможность на [GitHub][issues-feat-url].
* Голосовать за [популярные запросы возможностей][feat-req-vote-url].

## Contributing

We welcome you to join the development of NexT. Please see [contributing document][contributing-document-url]. 🤗

Also, we welcome Issue or PR to our [official-plugins][official-plugins-url].

## Содействие

[![Contributors][contributors-image]][contributors-url]

## Благодарности

«NexT» send special thanks to these great services that sponsor our core infrastructure:

<a href="https://github.com"><img height="40" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"></a>

> GitHub allows us to host the Git repository and run the test suite.

<a href="https://www.netlify.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" height="40" srcset="https://raw.githubusercontent.com/netlify/netlify-example-styles/main/public/images/logo-netlify-small-fullcolor-darkmode.svg">
    <source media="(prefers-color-scheme: light)" height="40" srcset="https://raw.githubusercontent.com/netlify/netlify-example-styles/main/public/images/logo-netlify-small-fullcolor-lightmode.svg">
    <img alt="Netlify Logo" height="40" src="https://raw.githubusercontent.com/netlify/netlify-example-styles/main/public/images/logo-netlify-small-fullcolor-lightmode.svg">
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

[docs-installation-url]: https://theme-next.js.org/docs/getting-started/installation.html
[docs-configuration-url]: https://theme-next.js.org/docs/getting-started/configuration.html
[docs-custom-files-url]: https://theme-next.js.org/docs/advanced-settings/custom-files.html
[docs-release-url]: https://github.com/next-theme/hexo-theme-next/releases
[docs-upgrade-url]: https://theme-next.js.org/docs/getting-started/upgrade.html

[awesome-next-url]: https://github.com/next-theme/awesome-next
[discussions-url]: https://github.com/next-theme/hexo-theme-next/discussions
[gitter-url]: https://app.gitter.im/#/room/#next:gitter.im
[gpt-url]: https://chatgpt.com/g/g-68286c2fc1f48191aee3e87c94a89431-next-mentor
[i18n-url]: https://crowdin.com/project/hexo-theme-next

[issues-bug-url]: https://github.com/next-theme/hexo-theme-next/issues/new?assignees=&labels=Bug&template=bug-report.md
[issues-feat-url]: https://github.com/next-theme/hexo-theme-next/issues/new?assignees=&labels=Feature+Request&template=feature-request.md
[feat-req-vote-url]: https://github.com/next-theme/hexo-theme-next/issues?q=is%3Aopen+is%3Aissue+label%3A%22Feature+Request%22

[contributing-document-url]: https://github.com/next-theme/hexo-theme-next/blob/master/.github/CONTRIBUTING.md
[official-plugins-url]: https://github.com/next-theme
[contributors-image]: https://raw.githubusercontent.com/next-theme/contributors/master/contributors.svg
[contributors-url]: https://github.com/next-theme/hexo-theme-next/blob/master/docs/AUTHORS.md
