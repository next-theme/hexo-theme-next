const { spawn } = require('child_process');
const path = require('path');

const subprocess = spawn('git', ['config', '--local', 'core.hooksPath', path.join(__dirname, '.githooks/')]);

subprocess.on('error', () => {
  console.error('Failed to install git hook.');
});
