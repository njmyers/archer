import { Command } from '~/library';

const shell = {
  cd: new Command('cd'),
  curl: new Command('curl'),
  git: new Command('git'),
  ln: new Command('ln'),
  makepkg: new Command('makepkg'),
  mkdir: new Command('mkdir'),
  npm: new Command('unlink'),
  pacman: new Command('pacman'),
  rm: new Command('rm'),
  systemctl: new Command('systemctl'),
  unlink: new Command('unlink'),
  which: new Command('which'),
};

export default shell;
