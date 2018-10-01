import chalk from 'chalk';

const logStart = (task, info = '\n') =>
  console.log(chalk.green(`TASK STARTED ==> `) + task + info);

const logEnd = (task, response = '\n') =>
  console.log(chalk.green(`TASK COMPLETED ==> `) + task + response);

const logError = (task, error) =>
  console.log(chalk.red(`TASK ERRORED ==> `) + task + error);

const taskRunner = (asyncTask, dynamicName) => () =>
  new Promise((res, rej) => {
    const name = dynamicName ? dynamicName : asyncTask.name;
    logStart(name);

    asyncTask()
      .then((response) => {
        logEnd(name, response);
        res(response);
      })
      .catch((error) => {
        logError(name, error);
      });
  });

export default taskRunner;
