import pacman from '../commands/pacman';
import taskRunner from '../task-runner';

const packages = ['vulkan-intel', 'mesa'];

const graphics = (env) =>
  new Promise((res, rej) => {
    pacman(packages)
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(graphics);
