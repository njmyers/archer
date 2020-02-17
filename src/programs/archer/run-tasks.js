import { pipeAsync } from 'smalldash';
import { Task } from '~/library';
import getTask from './get-task';

function runTasks(config, options) {
  return pipeAsync(
    ...Object.entries(config).map(([configName, configTasks]) => {
      const allTasks = pipeAsync(
        ...Object.entries(configTasks).map(([task, args]) => {
          const configTask = new Task(getTask(task, args, options), task);
          return () => configTask.run();
        })
      );

      const task = new Task(allTasks, configName);
      return () => task.run();
    })
  );
}

export default runTasks;
