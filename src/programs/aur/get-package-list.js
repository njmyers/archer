import getInstalled from './get-installed';

/**
 * Extracts the list of packages from the cli function
 * The input is variadic with options as our last argument
 * If we are passing the update flag we can check in ~/.aur
 * Maybe we will need some more lists in the future :)
 * Combine our lists at the end!
 */
const getPackageList = (args) => {
  const [options, ...packages] = args.reverse();

  return {
    options,
    packages: [
      ...packages.reverse(),
      ...(options.update ? getInstalled() : []),
    ],
  };
};

export default getPackageList;
