import { spawn } from 'child_process';

const formatArgs = (args) => (Array.isArray(args) ? args : args.split(' '));

const sudo = (command, options = {}) =>
  new Promise((res, rej) => {
    const sudoProcess = spawn('sudo', formatArgs(command), {
      ...options,
      stdio: 'inherit',
    });

    sudoProcess.on('close', (code) => {
      if (code === 0) {
        res(code);
      } else {
        rej(`exit with error code: ${code}`);
      }
    });

    sudoProcess.on('close', (code) => {
      if (code === 0) {
        res(code);
      } else {
        rej(`exit with error code: ${code}`);
      }
    });
  });

export default sudo;
