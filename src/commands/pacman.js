import sudo from './sudo';
import acceptArgs from './accept-args';

const pacman = (packages, options) =>
  new Promise((res, rej) => {
    sudo(`pacman -S ${packages.reduce((prevString, string) => `${prevString} ${string}`)}`)
      .then((code) => res(code))
      .catch((code) => rej(code));
  });

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, pacman);
