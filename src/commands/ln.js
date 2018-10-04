import createSpawn from './create-spawn';
import sudo from './sudo';
import acceptArgs from './accept-args';

const ln = (args, options) => {
  const { sudo, ...rest } = options;

  if (sudo) {
    return () =>
      sudo(['ln', ...(Array.isArray(args) ? args : [args])], options);
  } else {
    return createSpawn('ln')(args, options);
  }
};

// default options
const defaults = {};

export default (...args) => acceptArgs(args, defaults, ln);
