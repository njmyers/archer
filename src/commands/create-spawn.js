import { spawn } from 'child_process';

const formatArgs = (args) => (Array.isArray(args) ? args : args.split(' '));

const createSpawn = (command) => (args, options = {}) =>
  new Promise((res, rej) => {
    const child = spawn(command, formatArgs(args), {
      ...options,
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      if (code === 0) {
        res(code);
      } else {
        rej(`exit with error code: ${code}`);
      }
    });

    child.on('close', (code) => {
      if (code === 0) {
        res(code);
      } else {
        rej(`exit with error code: ${code}`);
      }
    });
  });

export default sudo;
