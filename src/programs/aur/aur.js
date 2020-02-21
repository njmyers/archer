import fs from 'fs';
import path from 'path';
import { pipeAsync } from 'smalldash';

import shell from '~/shell';
import { Task, noopAsync } from '~/library';
import { AUR_DIR } from '~/paths';

import getPackageList from './get-package-list';

const sync = (packages, options) => {
  return [...packages, ...getPackageList()].map((pkg) => {
    const url = `https://aur.archlinux.org/${pkg}.git`;
    const destination = path.resolve(AUR_DIR, pkg);
    const cached = fs.existsSync(destination);
    const pipeline = [];

    if (cached && options.refresh) {
      pipeline.push(shell.git.flags('-C', destination, 'pull'));
    }

    if (!cached && options.sync) {
      shell.mkdir.flags('-p', destination).process({ async: true });
      pipeline.push(shell.git.flags('clone', url, destination));
    }

    if ((cached && options.sysupgrade) || (!cached && options.sync)) {
      pipeline.push(
        shell.makepkg.flags('-si', '--needed', '--noconfirm', '--clean')
      );
    }

    if (pipeline.length === 0) {
      return noopAsync;
    }

    const fn = pipeAsync(
      ...pipeline.map((command) => () => command.process({ cwd: destination }))
    );

    const task = new Task(fn, pkg, options);
    return () => task.run();
  });
};

const remove = (packages, options) => {
  return packages.map((pkg) => {
    const destination = path.resolve(AUR_DIR, pkg);
    const pipeline = [];
    const pacflags = [
      '-R',
      options.nosave ? '-s' : '',
      options.recursive ? '-n' : '',
      pkg,
    ];

    pipeline.push(shell.pacman.sudo().flags(...pacflags));
    pipeline.push(shell.rm.sudo().flags('-rf', destination));

    if (pipeline.length === 0) {
      return noopAsync;
    }

    const fn = pipeAsync(...pipeline.map((command) => () => command.process()));
    const task = new Task(fn, pkg, { throw: true });
    return () => task.run();
  });
};

const aur = (packages = [], options) => {
  const tasks = [];

  if (options.sync) {
    tasks.push(...sync(packages, options));
  }

  if (options.remove) {
    tasks.push(...remove(packages, options));
  }

  if (tasks.length < 1) {
    return noopAsync();
  }

  return pipeAsync(...tasks)();
};

export default aur;
