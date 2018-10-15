import flatten from '../library/flatten';

/**
 * We can use this function to format our commands to accepts variadic arguments
 * The arguments can be either string commands like 'ls -la'
 * Or array style commands like ['ls', '-la']
 * The last argument can be the options argument that is passed on to the command.
 * Options object is then passed on to the spawn function
 * For 'command style' options and flags simply pass them as string arguments
 */
const acceptArgs = (args, defaults, fn) => {
  const length = args.length;
  // we can accept args as array of packages or list of packages
  // check the type of the last argument so we can see if is options or packages
  // this is because if we use one argument then it will be the last
  const hasOptions =
    typeof args[length - 1] === 'object' && !Array.isArray(args[length - 1]);
  // if options object was passed then the last argument is not a package
  const packages = hasOptions
    ? args.slice(0, length - 1).reverse()
    : args.reverse();
  // if options object was passed then combine otherwise use defaults
  const options = hasOptions ? { ...defaults, ...args[length - 1] } : defaults;

  return fn(flatten(packages), options);
};

export default acceptArgs;
