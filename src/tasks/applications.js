import shell from 'shelljs';
import pacman from '../commands/pacman';
import aur from '../commands/aur';
import taskRunner from '../task-runner';

const packages = ['firefox', 'chromium'];

const aurPackages = [
  'dropbox',
  'dropbox-cli',
  'nautilus-dropbox',
  'google-chrome',
  'keeweb-desktop',
  'masterpdfeditor',
  'postman-bin',
  'spotify',
];

const applications = (arg, options) =>
  new Promise((res, rej) => {
    pacman(packages)
      .then(() => aur(aurPackages))
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(applications);
