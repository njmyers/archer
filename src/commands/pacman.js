import sudo from './sudo';
import acceptArgs from './accept-args';

const pacman = (packages, options) =>
  sudo(
    `pacman -S ${packages.reduce(
      (prevString, string) => `${prevString} ${string}`
    )} ${options.silent ? '--noconfirm' : ''}`
  );

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, pacman);
