/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.page.comments) return;

  NexT.utils.loadComments('#isso-thread')
    .then(() => NexT.utils.getScript(`${CONFIG.isso.url}js/embed.min.js`, {
      attributes: {
        dataset: {
          isso : `${CONFIG.isso.url}`,
          issoLang : `${CONFIG.isso.lang}`,
          issoReplyToSelf : `${CONFIG.isso.reply_to_self}`,
          issoRequireAuthor : `${CONFIG.isso.require_author}`,
          issoRequireEmail : `${CONFIG.isso.require_email}`,
          issoReplyNotifications : `${CONFIG.isso.reply_notifications}`,
          issoMaxCommentsTop : `${CONFIG.isso.max_comments_top}`,
          issoMaxCommentsNested : `${CONFIG.isso.max_comments_nested}`,
          issoRevealOnClick : `${CONFIG.isso.reveal_on_click}`,
          issoAvatar : `${CONFIG.isso.avatar}`,
          issoAvatarBg : `${CONFIG.isso.avatar_bg}`,
          issoAvatarFg : `${CONFIG.isso.avatar_fg}`,
          issoVote : `${CONFIG.isso.vote}`,
          issoVoteLevels : `${CONFIG.isso.vote_levels}`,
          issoFeed : `${CONFIG.isso.feed}`
        }
      },
      parentNode: document.querySelector('#isso-thread')
    }));
});
