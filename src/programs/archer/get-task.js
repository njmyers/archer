import { pipeAsync } from 'smalldash';
import { Command, noopAsync } from '~/library';
import shell from '~/shell';
import aur from '~/programs/aur/aur';

import * as tasks from './tasks';

/**
 * Map a json task definition to a command to execute. If the command is not
 * found then return a noop functon.
 */
function getTask(task, args, options) {
  switch (task) {
    case tasks.PACMAN: {
      const command = shell.pacman.sudo().flags('-Syu', ...args);
      return () => command.process(options);
    }

    case tasks.AUR: {
      return () => aur(args);
    }

    case tasks.NPM: {
      const command = shell.npm.flags('install', '-g', ...args);
      return () => command.process(options);
    }

    case tasks.SYSTEMCTL: {
      const commands = args.map(({ state, service }) => {
        const command = shell.systemctl.sudo().flags(state, service);
        return () => command.process(options);
      });

      return () => pipeAsync(...commands);
    }

    case tasks.LN: {
      const commands = args.map(({ target, destination }) => {
        const command = shell.ln.sudo().flags(target, destination);
        return () => command.process(options);
      });

      return () => pipeAsync(...commands);
    }

    case tasks.UNLINK: {
      const commands = args.map(({ target }) => {
        const command = shell.unlink.sudo().flags(target);
        return () => command.process(options);
      });

      return () => pipeAsync(...commands);
    }

    case tasks.EXEC: {
      const commands = args.map(({ command, sudo }) => {
        if (sudo) {
          return () => new Command(command).sudo().process(options);
        }

        return () => new Command(command).process(options);
      });

      return () => pipeAsync(...commands);
    }

    default: {
      return () => noopAsync;
    }
  }
}

export default getTask;
