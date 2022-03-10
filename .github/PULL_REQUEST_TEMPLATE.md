<!-- ATTENTION!
1. Please write pull request readme in English, thanks!

2. Always remember that NexT includes 4 schemes. And if on one of them works fine after the changes, on another scheme this changes can be broken. Muse and Mist have similar structure, but Pisces is very difference from them. Gemini is a mirror of Pisces with some styles and layouts remakes. So, please make the tests at least on two schemes (Muse or Mist and Pisces or Gemini).

3. In addition, you need to confirm that the changes made by this PR are compatible with PJAX and Dark Mode.
-->

## PR Checklist <!-- 我确认我已经查看了 -->
<!-- Change [ ] to [x] to select (将 [ ] 换成 [x] 来选择) -->

- [x] The commit message follows [guidelines for NexT](https://github.com/next-theme/hexo-theme-next/blob/master/.github/CONTRIBUTING.md).
- [x] Tests for the changes was maked (for bug fixes / features).
   - [x] Muse | Mist have been tested.
   - [x] Pisces | Gemini have been tested.
- [ ] [Docs](https://github.com/next-theme/theme-next-docs/tree/master/source/docs) in [NexT website](https://theme-next.js.org/docs/) have been added / updated (for features).
<!-- For adding Docs edit needed file here: https://github.com/next-theme/theme-next-docs/tree/master/source/docs and create PR with this changes here: https://github.com/next-theme/theme-next-docs/pulls -->

## PR Type
<!-- What kind of change does this PR introduce? -->

- [ ] Bugfix.
- [x] Feature.
- [ ] Code style update (formatting, local variables).
- [ ] Refactoring (no functional changes, no api changes).
- [ ] Documentation.
- [ ] Translation. <!-- We use Crowdin to manage translations https://crowdin.com/project/hexo-theme-next -->
- [x] Other... Please describe: Well, maybe this pull request is more for asking question than commit a new feature? I've thought, before asking a question, I might upload what I'm doing. Anyway, in conclusion, it's not a successful feature. To complete this feature, I might need some help.

## What is the current behavior?
<!-- Please describe the current behavior that you are modifying, or link to a relevant issue -->

Issue resolved:

## What is the new behavior?
<!-- Description about this pull, in several words -->

+ In archives page, there's a new knowledge graph to show your articles, deployed dates and deployed years, which shows like this:
![archive-knowledge-graph](http://resources.sakebow.cn/markdown/archive-knowledge-graph.png)
+ Click the leaf node to jump to the corresponding page.
+ When ready, the knowledge graph is folded and hard to read. By dragging the node, or holding any node for a while, the folded knowledge graph will unfold slowly.

- Link to demo site with this changes: 

[My blog with NexT8.10.1](http://hexo.sakebow.cn)

Mainly changes in [my archive page](http://hexo.sakebow.cn/archives/)

- Screenshots with this changes:

Well, It's hard to conclude...Maybe it's better to preview the website above?

### How to use?

In NexT `_config.yml`:
```yml
d3:
  enable: true
```
Set it `true`, and there will be a knowledge graph shows all your articles and deployed dates.

And with `hexo-archive-index` plugin, set in **hexo** config as lines below, **not** themes config:

```yml
archive_generator:
  per_page: 0
```

If you never use `hexo-archive-index`, try `npm install hexo-archive-index --save`.

### Bad News

It's hard to say that my commit is suitable...

I didn't get it how to get year, date, article title and tags all in once, and I just didn't find any document for it.

So, the data of knowledge graph can only be crawlled using JavaScript and jQuery.

That's why the original archive page can not be removed.

And I wonder if there's any solution to it.