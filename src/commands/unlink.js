import createSpawn from './create-spawn';
import sudo from './sudo';
import acceptArgs from './accept-args';

const unlink = (args, options) => {
  const { sudo: sudoOption, ...rest } = options;

  return sudoOption
    ? sudo(`unlink ${Array.isArray(args) ? args.join(' ') : args}`, options)
    : createSpawn('unlink')(args, options);
};

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, unlink);
