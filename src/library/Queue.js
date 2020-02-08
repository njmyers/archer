import chalk from 'chalk';
import os from 'os';

const CPUS = os.cpus().length;

class Queue {
  constructor({ concurrency = CPUS } = {}) {
    this.concurrency = concurrency;
    this.jobs = [];
    this.running = 0;
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  get nextJob() {
    if (this.jobs.length > 0) {
      return this.jobs.shift();
    }

    return;
  }

  add(...jobs) {
    this.jobs.push(...jobs);
  }

  start() {
    for (let current = 0; current < this.concurrency; current += 1) {
      this.run(this.nextJob);
    }
  }

  run(job) {
    if (!job && this.running === 0) {
      this.resolve();
    }

    if (!job) {
      return;
    }

    if (typeof job !== 'function') {
      this.log('job is not a function');
      return;
    }

    this.running += 1;
    job()
      .then(() => {
        this.running -= 1;
        this.run(this.nextJob);
      })
      .catch((error) => {
        this.log(error);
        this.running -= 1;
        this.run(this.nextJob);
      });
  }

  log(error) {
    console.log(chalk.red('QUEUE ERRORED ==>'));
    console.log(error);
  }
}

export default Queue;
