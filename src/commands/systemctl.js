import sudo from './sudo';
import acceptArgs from './accept-args';

const systemctl = (string, options) =>
  new Promise((res, rej) => {
    sudo(`systemctl ${string}`)
      .then((code) => res(code))
      .catch((code) => rej(code));
  });

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, systemctl);
