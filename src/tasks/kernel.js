import pacman from '../commands/pacman';
import aur from '../commands/aur';
import taskRunner from '../task-runner';

const packages = ['linux-lts', 'base-devel'];

const kernel = () =>
  new Promise((res, rej) => {
    pacman(packages)
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(kernel);
