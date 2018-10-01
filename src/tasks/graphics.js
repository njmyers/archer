import pacman from '../commands/pacman';
import taskRunner from '../task-runner';

const graphics = () =>
  new Promise((res, rej) => {
    pacman(['vulkan-intel', 'mesa'])
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(graphics);
