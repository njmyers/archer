/**
 * Name an anonymous function
 */
const namedFunction = (name, fn) => {
  Object.defineProperty(fn, 'name', { value: name, writable: false });
  return fn;
};

export default namedFunction;
