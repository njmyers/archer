import shell from 'shelljs';

const defaults = {
  stdio: 'inherit',
  async: true,
};

class Command {
  constructor(...args) {
    this.args = args;
  }

  get command() {
    return this.args
      .flat(10)
      .map((string) => string.split(' '))
      .flat(1)
      .join(' ');
  }

  process(options = {}) {
    const merged = {
      ...defaults,
      ...options,
    };

    if (!merged.async) {
      return shell.exec(this.command, merged);
    }

    return new Promise((resolve, reject) => {
      shell.exec(this.command, merged, (code, stdout, stderr) => {
        if (code === 0) {
          resolve(code, stdout);
        } else {
          reject(code, stderr);
        }
      });
    });
  }

  sudo() {
    return new Command('sudo', ...this.args);
  }

  flags(...strings) {
    return new Command(...this.args, ...strings);
  }
}

export default Command;
