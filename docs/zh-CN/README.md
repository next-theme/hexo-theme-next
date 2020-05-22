<div align="right">
  语言:
  <a title="英语" href="../../README.md">🇺🇸</a>
  🇨🇳
  <a title="俄语" href="../ru/README.md">🇷🇺</a>
</div>

# <div align="center"><a title="NexT website repository" href="https://github.com/next-theme/theme-next-docs"><img align="center" width="56" height="56" src="https://raw.githubusercontent.com/next-theme/hexo-theme-next/master/source/images/logo.svg?sanitize=true"></a> e x T</div>

<p align="center">
  «NexT» 是一款风格优雅的高质量 <a href="https://hexo.io">Hexo</a> 主题，自点点滴滴中用爱雕琢而成。
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

## 即时预览

<p align="center">
  💟 <a href="https://theme-next.js.org/muse/">Muse</a> | 🔯 <a href="https://theme-next.js.org/mist/">Mist</a> | ♓️ <a href="https://theme-next.js.org/pisces/">Pisces</a> | ♊️ <a href="https://theme-next.js.org">Gemini</a>
<br>
<br>
  更多 «NexT» 的例子参见<a href="https://github.com/next-theme/awesome-next#live-preview">这里</a>。
</p>

## 安装

最简单的安装方式是直接克隆整个仓库：

```sh
$ cd hexo
$ git clone https://github.com/next-theme/hexo-theme-next themes/next
```

此外，如果你想要使用其他方式，你也可以参见[详细安装步骤][docs-installation-url]。

## 插件

NexT 支持大量的第三方插件，它们可以被轻松地配置。

例如，你想要在你的站点中使用 `pjax` 插件，请进入 NexT 配置文件，启用 `pjax` 配置项：

```yml
# Easily enable fast Ajax navigation on your website.
# Dependencies: https://github.com/next-theme/pjax
pjax: true
```

然后，打开它上面的 «Dependencies» 链接以查看它的安装步骤。

### 设置 CDN

如果你想要通过 CDN 来加载插件脚本，那么需要设置相关的 CDN 链接。

例如，你想要使用 `mediumzoom` 插件并通过 CDN 加载，进入 Next 配置文件并找到如下内容：

```yml
vendors:
  # ...
  # Some contents...
  # ...
  mediumzoom: # Set or update mediumzoom CDN URL.
```

## 更新

NexT 每个月都会发布新版本。你可以通过如下命令更新到最新的 master 分支：

```sh
$ cd themes/next
$ git pull
```

如果你在此过程中收到了任何错误报告 (例如 **«Commit your changes or stash them before you can merge»**)，我们推荐你使用 [Hexo 数据文件][docs-data-files-url]特性。\
然而你也可以通过提交（`Commit`）、贮藏（`Stash`）或忽视（`Discard`）本地更改以绕过这种更新错误。具体方法请参考[这里](https://stackoverflow.com/a/15745424/5861495)。

**如果你想要从 v5.1.x 更新到最新版本，阅读[这篇文档][docs-update-5-1-x-url]。**

## 反馈

* 浏览 [Awesome NexT][awesome-next-url] 列表，与其它用户分享插件和教程。
* 加入我们的 [Gitter][gitter-url] 聊天。
* 请花几秒钟来[添加或修正翻译][i18n-url]。
* 在 [GitHub Issues][issues-bug-url] 报告Bug。
* 在 [GitHub][issues-feat-url] 请求新的功能。
* 为 [受欢迎的 Feature request][feat-req-vote-url] 投票。

## 贡献你的代码

我们欢迎你加入 NexT 的开发，贡献出你的一份力量。请看[开源贡献指南][contributing-document-url]。 🤗

你也可以随时向我们的[官方插件][official-plugins-url]提交 Issue 或 Pull Request。

## 贡献者

- [iissnan/hexo-theme-next](https://github.com/iissnan/hexo-theme-next/graphs/contributors)
- [theme-next/hexo-theme-next](https://github.com/theme-next/hexo-theme-next/graphs/contributors)
- [next-theme/hexo-theme-next](https://github.com/next-theme/hexo-theme-next/graphs/contributors)

## 鸣谢

<p align="center">
  «NexT» 特别感谢这些支持我们核心基础设施的优质服务：
<br>
<br>
  <a href="https://github.com"><img align="center" width="100" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.netlify.com"><img align="center" width="150" src="https://cdn.netlify.com/15ecf59b59c9d04b88097c6b5d2c7e8a7d1302d0/1b6d6/img/press/logos/full-logo-light.svg"></a>
<br>
  <sub>GitHub 容许我们托管 Git 仓库，Netlify 容许我们分发文档。</sub>
<br>
<br>
  <a href="https://crowdin.com"><img align="center" width="180" src="https://support.crowdin.com/assets/logos/crowdin-logo1-small.png"></a>
<br>
  <sub>Crowdin 容许我们方便地翻译文档。</sub>
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

[contributing-document-url]: https://github.com/next-theme/hexo-theme-next/blob/master/docs/zh-CN/CONTRIBUTING.md
[official-plugins-url]: https://github.com/next-theme
