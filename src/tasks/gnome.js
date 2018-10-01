import pacman from '../commands/pacman';
import taskRunner from '../task-runner';

const packages = ['gnome', 'wayland'];

const gnome = () =>
  new Promise((res, rej) => {
    pacman(packages)
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(gnome);
