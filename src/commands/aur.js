import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import { pipeAsync } from 'smalldash';
import taskRunner from '../task-runner';
import git from './git';
import makepkg from './makepkg';
import namedFunction from './named-function';
import aurDir from '../library/aur-dir';
import validateDirectory from '../library/validate-directory';
import acceptArgs from './accept-args';

const aur = (packages, options) => {
  const aurPath = aurDir();
  // return a function that returns a promise
  const tasks = packages.map((string) => {
    const fn = namedFunction(
      string,
      () =>
        new Promise((res, rej) => {
          const url = `https://aur.archlinux.org/${string}.git`;
          const destination = path.resolve(aurPath, string);

          if (!validateDirectory(destination, { make: false })) {
            // return a promise
            return git(`clone ${url} ${destination}`)
              .then(() => {
                shell.cd(destination);
                return makepkg('-si --needed', options);
              })
              .then((code) => res(code))
              .catch((error) => rej(error));
          } else {
            shell.cd(destination);
            // return a promise
            return git(`pull`)
              .then(() => makepkg('-si --needed', options))
              .then((code) => res(code))
              .catch((error) => rej(error));
          }
        })
    );

    return taskRunner(fn);
  });
  // construct async pipeline
  const pipeline = pipeAsync(...tasks);
  // return a new promise at resolution of the ENTIRE async pipelines
  return new Promise((res, rej) => {
    pipeline({ options })
      .then((response) => res(response))
      .catch((error) => rej(error));
  });
};

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, aur);
