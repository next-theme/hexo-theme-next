<div align="right">
  Язык:
  <a title="Английский" href="../../README.md">🇺🇸</a>
  <a title="Китайский" href="../zh-CN/README.md">🇨🇳</a>
  🇷🇺
</div>

# <div align="center"><a title="Репозиторий сайта NexT" href="https://github.com/next-theme/theme-next-docs"><img align="center" width="56" height="56" src="https://raw.githubusercontent.com/next-theme/hexo-theme-next/master/source/images/logo.svg?sanitize=true"></a> e x T</div>

<p align="center">
  «NexT» — элегантная высококачественная тема под <a href="https://hexo.io">Hexo</a>. Сделана с нуля, с любовью.
<br>
<br>
  <a href="https://www.npmjs.com/package/hexo-theme-next"><img src="https://img.shields.io/npm/v/hexo-theme-next?style=flat-square"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E=10.9.0-green?style=flat-square"></a>
  <a href="https://hexo.io"><img src="https://img.shields.io/badge/hexo-%3E=4.0.0-blue?style=flat-square&logo=hexo"></a>
  <a href="https://github.com/next-theme/hexo-theme-next/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-%20AGPL-orange?style=flat-square&logo=gnu"></a>
  <img src="https://img.shields.io/github/workflow/status/next-theme/hexo-theme-next/Linter?style=flat-square">
<br>
  <img src="https://user-images.githubusercontent.com/16272760/63487983-da41b080-c4df-11e9-951c-64883a8a5e9b.png">
</p>

## Демо

<p align="center">
  💟 <a href="https://theme-next.js.org/muse/">Muse</a> | 🔯 <a href="https://theme-next.js.org/mist/">Mist</a> | ♓️ <a href="https://theme-next.js.org/pisces/">Pisces</a> | ♊️ <a href="https://theme-next.js.org">Gemini</a>
<br>
<br>
  Больше примеров «NexT» <a href="https://github.com/next-theme/awesome-next#live-preview">здесь</a>.
</p>

## Установка

Простейший вариант установки — склонировать весь репозиторий:

```sh
$ cd hexo
$ git clone https://github.com/next-theme/hexo-theme-next themes/next
```

Или предлагаю почитать [детальные инструкции по установке][docs-installation-url], если вариант выше не устраивает.

## Плагины

В конфиге NexT'а теперь можно найти зависимости на каждый модуль, который был вынесен во внешние репозитории, которые могут быть найдены по [ссылке основной организации][official-plugins-url].

Например, Вы хотите использовать `pjax` для своего сайта. Открываем конфиг NexT'а и находим:

```yml
# Easily enable fast Ajax navigation on your website.
# Dependencies: https://github.com/next-theme/pjax
pjax: true
```

Затем включаем параметр `pjax` и переходим по ссылке «Dependencies» с дальнейшеми инструкциями по установке этого модуля.

## Обновление

NexT выпускает новые версии каждый месяц. Можно обновить до последней мастер-ветки следующей командой:

```sh
$ cd themes/next
$ git pull
```

А если всплывают ошибки во время обновления (что-то наподобии **«Commit your changes or stash them before you can merge»**), рекомендуется ознакомиться с особенностью хранения [дата-файлов в Hexo][docs-data-files-url].\
Как бы то ни было, можно обойти ошибки при обновлении если «Закомитить», «Стэшнуть» или «Откатить» локальные изменения. Смотрим  [здесь](https://stackoverflow.com/a/15745424/5861495) как это сделать.

**Если нужно обновиться с версии v5.1.x на последней версиями, читаем [здесь][docs-update-5-1-x-url].**

## Обратная связь

* Посетите [Awesome NexT][awesome-next-url] список.
* Вступить в наши [Gitter][gitter-url] чаты.
* [Добавить или улучшить перевод][i18n-url] за несколько секунд.
* Сообщить об ошибке в разделе [GitHub Issues][issues-bug-url].
* Запросить новую возможность на [GitHub][issues-feat-url].
* Голосовать за [популярные запросы возможностей][feat-req-vote-url].

## Содействие

- [iissnan/hexo-theme-next](https://github.com/iissnan/hexo-theme-next/graphs/contributors)
- [theme-next/hexo-theme-next](https://github.com/theme-next/hexo-theme-next/graphs/contributors)
- [next-theme/hexo-theme-next](https://github.com/next-theme/hexo-theme-next/graphs/contributors)

Приветсвуется любое содействие, не стесняйтесь сообщать «Баги», брать «Форки» и вливать «Пулы».

## Благодарности

<p align="center">
  «NexT» выражает особую благодарность этим замечательным сервисам, которые спонсируют нашу основную инфраструктуру:
<br>
<br>
  <a href="https://github.com"><img align="center" width="100" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.netlify.com"><img align="center" width="150" src="https://cdn.netlify.com/15ecf59b59c9d04b88097c6b5d2c7e8a7d1302d0/1b6d6/img/press/logos/full-logo-light.svg"></a>
<br>
  <sub>GitHub позволяет нам хостить Git-репозиторий, Netlify позволяет нам деплоить документацию.</sub>
<br>
<br>
  <a href="https://crowdin.com"><img align="center" width="180" src="https://support.crowdin.com/assets/logos/crowdin-logo1-small.png"></a>
<br>
  <sub>Crowdin позволяет нам удобно переводить документацию.</sub>
</p>

[docs-installation-url]: https://theme-next.js.org/docs/getting-started/installation.html
[docs-data-files-url]: https://theme-next.js.org/docs/getting-started/configuration.html
[docs-update-5-1-x-url]: https://theme-next.js.org/docs/getting-started/update-from-v5.html

[gitter-url]: https://gitter.im/hexo-next
[i18n-url]: https://crowdin.com/project/hexo-theme-next

[awesome-next-url]: https://github.com/next-theme/awesome-next
[issues-bug-url]: https://github.com/next-theme/hexo-theme-next/issues/new?assignees=&labels=Bug&template=bug-report.md
[issues-feat-url]: https://github.com/next-theme/hexo-theme-next/issues/new?assignees=&labels=Feature+Request&template=feature-request.md
[feat-req-vote-url]: https://github.com/next-theme/hexo-theme-next/issues?q=is%3Aopen+is%3Aissue+label%3A%22Feature+Request%22

[contributing-document-url]: https://github.com/next-theme/hexo-theme-next/blob/master/.github/CONTRIBUTING.md
[official-plugins-url]: https://github.com/next-theme
