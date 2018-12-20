import createSpawn from './create-spawn';
import acceptArgs from './accept-args';

const npm = (args, options) =>
  createSpawn('npm')(['install', '-g', ...args], options);

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, npm);
