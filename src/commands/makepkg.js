import createSpawn from './create-spawn';
import acceptArgs from './accept-args';

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, createSpawn('makepkg'));
