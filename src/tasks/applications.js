import shell from 'shelljs';
import aur from '../commands/aur';
import taskRunner from '../task-runner';

const installable = [
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
    aur(installable)
      .then((response) => res(response))
      .catch((error) => rej(error));
  });

export default taskRunner(applications);
