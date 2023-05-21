/* global NexT, CONFIG, WaveDrom */

document.addEventListener('page:loaded', () => {
  NexT.utils.getScript(CONFIG.wavedrom.js, {
    condition: window.WaveDrom
  }).then(() => {
    NexT.utils.getScript(CONFIG.wavedrom_skin.js).then(() => {
      WaveDrom.ProcessAll();
    });
  });
});
