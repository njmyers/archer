import { Command } from '~/library';

const shell = {
  git: new Command('git'),
  mkdir: new Command('mkdir'),
  ln: new Command('ln'),
  makepkg: new Command('makepkg'),
  systemctl: new Command('systemctl'),
  pacman: new Command('pacman'),
  unlink: new Command('unlink'),
  npm: new Command('unlink'),
  curl: new Command('curl'),
  which: new Command('which'),
  cd: new Command('cd'),
};

export default shell;
