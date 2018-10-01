import { spawn } from 'child_process';

const makepkg = (command, options = {}) =>
  new Promise((res, rej) => {
    const makepkgProcess = spawn('makepkg', ['-si'], {
      ...options,
      stdio: 'inherit',
    });

    makepkgProcess.on('close', (code) => {
      if (code === 0) {
        res(code);
      } else {
        rej(`exit with error code: ${code}`);
      }
    });

    makepkgProcess.on('close', (code) => {
      if (code === 0) {
        res(code);
      } else {
        rej(`exit with error code: ${code}`);
      }
    });
  });

export default makepkg;
