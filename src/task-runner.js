import chalk from 'chalk';

const logStart = (task) => console.log(chalk.green(`TASK STARTED => `) + task)

const logMiddle = (task, response) => console.log(chalk.green(`TASK STARTED => `) + task)

const logEnd = (task, response) => console.log(chalk.green(`TASK COMPLETED => `) + task)

const logError = (task, error) => console.log(chalk.red(`TASK ERRORED => `) + task + error)

const taskRunner = (asyncTask) => new Promise((res, rej) => {
  const name = asyncTask.name;
  logStart(name)

  asyncTask().then((response) => {
    logEnd(name, response)
    res(response)
  }).catch((error) => {
    logError(name, error)
  })
})

export default taskRunner
