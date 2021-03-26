const { spawn } = require('child_process');

const subprocess = spawn('git', ['config', '--local', 'core.hooksPath', '.githooks/']);

subprocess.on('error', () => {
  console.error('Failed to install git hook.');
});
