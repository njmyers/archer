import pacman from '../commands/pacman';
import aur from '../commands/aur';
import taskRunner from '../task-runner';

const packages = ['deepin', 'ddm'];
const aurPackages = ['deepin-topbar'];

const deepin = () =>
  new Promise((res, rej) => {
    pacman(packages)
      .then((code) => aur(aurPackages))
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(deepin);
