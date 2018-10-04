// @flow
import { spawn } from 'child_process';

type Args = string | Array<string>;

/** Properly format the arguments for spawning */
const formatArgs = (args: Args) =>
  Array.isArray(args) ? args : args.split(' ');

/** Stubs a spawn child process */
const createSpawn = (cmd: string) => (args: Args, options = {}): Promise<any> =>
  new Promise((res, rej) => {
    const child = spawn(cmd, formatArgs(args), {
      stdio: 'inherit',
      // put options second so we can override stdio
      ...options,
    });

    child.on('close', (code) => {
      if (code === 0) {
        res(code);
      } else {
        rej(code);
      }
    });
  });

export default createSpawn;
