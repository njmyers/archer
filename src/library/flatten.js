/**
 * Accepts an array (nested?) of strings or a string
 * Flattens the string or array of strings into a flattened array
 * All strings are also broken apart by spaces
 * We end up with an argument list for spawn style execution
 */
const flatten = (args) =>
  Array.isArray(args) ? [].concat(...args.map(flatten)) : args.split(' ');

export default flatten;
