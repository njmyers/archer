import ps from 'child_process';

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
      .flat(2)
      .filter((i) => i)
      .map((string) => string.split(' '))
      .flat(2)
      .filter((i) => i);
  }

  process(options = {}) {
    const merged = {
      ...defaults,
      ...options,
    };

    const [command, ...args] = this.command;

    if (!merged.async) {
      return ps.spawnSync(command, args, merged);
    }

    return new Promise((resolve, reject) => {
      const child = ps.spawn(command, args, merged);
      child.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(code);
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
