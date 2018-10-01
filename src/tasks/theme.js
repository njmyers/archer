import shell from 'shelljs';
import aur from '../commands/aur';
import taskRunner from '../task-runner';

const installable = [
  'capitaine-cursors',
  'la-capitaine-icon-theme',
  'macos-icon-theme',
  'x-arc-white',
];

const theme = (arg, options) =>
  new Promise((res, rej) => {
    aur(installable)
      .then((response) => res(response))
      .catch((error) => rej(error));
  });

export default taskRunner(theme);
