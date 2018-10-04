const flatten = (array) =>
  Array.isArray(array) ? [].concat(...array.map(flatten)) : array;

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
