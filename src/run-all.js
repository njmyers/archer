import {
  sudo,
  pacman,
  ln,
  unlink,
  aur,
  systemctl,
  createSpawn,
} from './commands';

import { pipeAsync } from 'smalldash';
import taskRunner from './task-runner';
import namedFunction from './commands/named-function';

const dispatcher = (options) => (entry) => {
  const [key, values] = entry;

  switch (key) {
    // map pacman packages to get
    case 'pacman':
      return () => pacman(values, options);
    // map aur packages to download
    case 'aur':
      return () => aur(values, options);
    // map out services to set the state on
    case 'systemctl':
      return pipeAsync(
        ...values.map(({ service, state } = {}) => () =>
          systemctl(`${state} ${service}.service`, options)
        )
      );
    // map out the symlinks to make
    case 'ln':
      return pipeAsync(
        ...values.map(({ target, destination, ...localOptions } = {}) => () =>
          ln(`${target} ${destination}`, { ...options, ...localOptions })
        )
      );
    // map out the symlinks to remove
    case 'unlink':
      return pipeAsync(
        ...values.map(({ target, ...options } = {}) => () =>
          unlink(`${target}`, options)
        )
      );

    // pure exec funtion
    case 'exec':
      return pipeAsync(
        ...values.map(
          ({ command, sudo: sudoOption, ...localOptions }) => () => {
            const parts = command.split(' ');

            return sudoOption
              ? sudo(parts, { ...options, ...localOptions })
              : createSpawn(parts[0])(parts.slice(1), {
                  ...options,
                  ...localOptions,
                });
            //
          }
        )
      );
  }
};

const runAll = (config, options) =>
  pipeAsync(
    // map through the configuration
    ...Object.entries(config).map((entry) => {
      // get the name of the task and the tasks to complete
      const [name, tasks] = entry;
      // map tasks into a named function
      const fn = namedFunction(
        name,
        pipeAsync(...Object.entries(tasks).map(dispatcher(options)))
      );
      // pass the named function to the task runner to execute
      return taskRunner(fn);
    })
  );

export default runAll;
