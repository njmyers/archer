import chalk from 'chalk';

const defaults = {
  silent: false,
  throw: false,
};

class Task {
  constructor(fn, name, options) {
    this.name = name;
    this.fn = fn;
    this.options = {
      ...defaults,
      ...options,
    };
  }

  start() {
    console.log(chalk.yellow('==> TASK STARTED ') + this.name);
  }

  end() {
    console.log(chalk.green('==> TASK COMPLETED ') + this.name);
  }

  error() {
    console.log(chalk.red('==> TASK ERRORED ') + this.name);
  }

  async run() {
    if (!this.options.silent) {
      this.start();
    }

    try {
      const response = await this.fn();
      if (!this.options.silent) {
        this.end();
      }

      return response;
    } catch (error) {
      this.error(error);

      if (this.options.throw) {
        throw error;
      } else {
        return error;
      }
    }
  }
}

export default Task;
