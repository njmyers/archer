// @flow
import { spawn } from 'child_process';
import flatten from '../library/flatten';

type Args = string | Array<string | Args>;

/** Stubs a spawn child process */
const createSpawn = (cmd: string) => (args: Args, options = {}): Promise<any> =>
  new Promise((res, rej) => {
    const child = spawn(cmd, flatten(args), {
      stdio: 'inherit',
      shell: true,
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
