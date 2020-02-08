import fs from 'fs';
import path from 'path';
import { pipeAsync } from 'smalldash';

import Task from '~/library/Task';
import Queue from '~/library/Queue';

import shell from '~/shell';
import { AUR_DIR } from '~/paths';

const aur = (packages, options) => {
  const tasks = packages.map((pkg) => {
    const url = `https://aur.archlinux.org/${pkg}.git`;

    const pipeline = [];
    const destination = path.resolve(AUR_DIR, pkg);

    if (fs.existsSync(destination)) {
      pipeline.push(shell.git.flags('-C', destination, 'pull'));
    } else {
      pipeline.push(shell.git.flags('clone', url, destination));
    }

    pipeline.push(
      shell.makepkg.flags('-si', '--needed', '--noconfirm', '--clean')
    );

    const fn = pipeAsync(
      ...pipeline.map((command) => () => command.process({ cwd: destination }))
    );

    const task = new Task(fn, pkg, options);
    return () => task.run();
  });

  const queue = new Queue({ concurrency: 1 });
  queue.add(...tasks);
  queue.start();

  return queue.promise;
};

export default aur;
