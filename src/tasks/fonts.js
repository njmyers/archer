import shell from 'shelljs';
import aur from '../commands/aur';
import taskRunner from '../task-runner';

const installable = ['adobe-base-14-fonts', 'otf-san-francisco', 'otf-sfmono'];

const fonts = (arg, options) =>
  new Promise((res, rej) => {
    aur(installable)
      .then((response) => res(response))
      .catch((error) => rej(error));
  });

export default taskRunner(fonts);
