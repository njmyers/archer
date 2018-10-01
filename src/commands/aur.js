import shell from 'shelljs';
import git from './git';
import makepkg from './makepkg';
import fs from 'fs';
import path from 'path';
import { homedir } from 'os';
import validateDirectory from './validate-directory';
import acceptArgs from './accept-args';

const current = process.cwd();
const directory = path.resolve(homedir(), '.aur');

const aur = (packages, options) =>
  new Promise((res, rej) => {
    validateDirectory(directory, { make: true });

    const promises = packages.map((string) => {
      const url = `https://aur.archlinux.org/${string}.git`;
      const destination = path.resolve(directory, string);

      if (!validateDirectory(destination, { make: false })) {
        git(`clone ${url} ${destination}`);
        shell.cd(destination);
        // return a promise
        return makepkg();
      } else {
        shell.cd(destination);
        git(`pull`);
        // return a promise
        return makepkg();
      }
    });

    Promise.all(promises)
      .then(() => {
        shell.cd(current);
        res();
      })
      .catch((error) => {
        shell.cd(current);
        rej(error);
      });
  });

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, aur);
