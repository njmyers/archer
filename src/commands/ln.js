import createSpawn from './create-spawn';
import sudo from './sudo';
import acceptArgs from './accept-args';

const ln = (args, options) => {
  const { sudo: sudoOption, ...rest } = options;

  return sudoOption
    ? sudo(`ln -sf ${Array.isArray(args) ? args.join(' ') : args}`, options)
    : createSpawn('ln')(['-sf', ...args], options);
};

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, ln);
