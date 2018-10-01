import fs from 'fs';
import path from 'path';
import { homedir } from 'os';
import shell from 'shelljs';
import { pipeAsync } from 'smalldash';
import taskRunner from '../task-runner';
import git from './git';
import makepkg from './makepkg';
import validateDirectory from './validate-directory';
import acceptArgs from './accept-args';

const current = process.cwd();
const directory = path.resolve(homedir(), '.aur');

const aur = (packages, options) => {
  // validate aur directory
  validateDirectory(directory, { make: true });
  // return a function that returns a promise
  const tasks = packages.map((string) =>
    taskRunner(
      () =>
        new Promise((res, rej) => {
          const url = `https://aur.archlinux.org/${string}.git`;
          const destination = path.resolve(directory, string);

          if (!validateDirectory(destination, { make: false })) {
            shell.cd(destination);
            // return a promise
            return git(`clone ${url} ${destination}`)
              .then(() => makepkg())
              .then((code) => res(code))
              .catch((error) => rej(error));
          } else {
            // return a promise
            return git(`pull`)
              .then(() => {
                shell.cd(destination);
                return makepkg();
              })
              .then((code) => res(code))
              .catch((error) => rej(error));
          }
        }),
      `aur ${string}`
    )
  );
  // construct async pipeline
  const pipeline = pipeAsync(...tasks);
  // return a new promise at resolution of the ENTIRE async pipelines
  return new Promise((res, rej) => {
    pipeline()
      .then((response) => res(response))
      .catch((error) => rej(error));
  });
};

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, aur);
