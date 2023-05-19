/* global NexT, CONFIG, wavedrom */

document.addEventListener('page:loaded', () => {
    NexT.utils.getScript(CONFIG.wavedrom.js, {
      condition: window.wavedrom
    }).then(() => {
        NexT.utils.getScript(CONFIG.wavedrom_skin.js).then(() => {
            WaveDrom.ProcessAll()
        });
    });
});
