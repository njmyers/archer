import chalk from 'chalk';

const logStart = (task, info = '\n') =>
  console.log(chalk.yellow(`TASK STARTED ==> `) + task.toUpperCase());

const logEnd = (task, response = '\n') =>
  console.log(chalk.green(`TASK COMPLETED ==> `) + task.toUpperCase());

const logError = (task, error) =>
  console.log(chalk.red(`TASK ERRORED ==> `) + task.toUpperCase());

const defaults = {
  silent: false,
  interactive: true,
};

const taskRunner = (asyncFunction) => ({
  options = defaults,
  tasks = {},
  ...rest
} = {}) =>
  new Promise((res, rej) => {
    const name = asyncFunction.name;

    if (!options.silent) {
      logStart(name);
    }

    asyncFunction()
      .then((response) => {
        if (!options.silent) {
          logEnd(name, response);
        }
        res({
          ...rest,
          options,
          tasks: {
            ...tasks,
            [name]: response,
          },
        });
      })
      // pass errors up as a promise resolution
      // the program can decide what to do with them
      .catch((error) => {
        if (!options.silent) {
          logError(name, error);
        }
        res({
          ...rest,
          options,
          tasks: {
            ...tasks,
            [name]: error,
          },
        });
      });
  });

export default taskRunner;
