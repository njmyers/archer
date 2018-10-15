import sudo from './sudo';
import acceptArgs from './accept-args';

/** Enables systemctl command */
const systemctl = (args, options) => sudo(['systemctl', ...args], options);

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, systemctl);
