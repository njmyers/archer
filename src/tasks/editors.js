import shell from 'shelljs';
import aur from '../commands/aur';
import taskRunner from '../task-runner';

const installable = ['atom-editor-bin', 'visual-studio-code-bin'];

const editors = (arg, options) =>
  new Promise((res, rej) => {
    aur(installable)
      .then((response) => res(response))
      .catch((error) => rej(error));
  });

export default taskRunner(editors);
