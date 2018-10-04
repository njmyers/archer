import sudo from './sudo';
import acceptArgs from './accept-args';

/**
 * Enables systemctl command
 * @return {Promise} resolves or rejects the error code
 */
const systemctl = (string, options) => sudo(`systemctl ${string}`);

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, systemctl);
