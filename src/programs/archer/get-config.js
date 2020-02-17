// @flow
import fs from 'fs';
import path from 'path';
import util from 'util';
import { pipeAsync } from 'smalldash';
import prompts from 'prompts';

import directory from '@njmyers/directory';
import { ARCHER_CONFIG_PATH, ARCHER_DIR, PACKAGE_DIR } from '~/paths';

const fsa = {
  stat: util.promisify(fs.stat),
  mkdir: util.promisify(fs.mkdir),
  readFile: util.promisify(fs.readFile),
  writeFile: util.promisify(fs.writeFile),
};

const getConfig = async (options) => {
  // Check for exisiting config
  const stats = await fsa.stat(ARCHER_DIR);

  if (!stats.isDirectory()) {
    await fsa.mkdir(ARCHER_DIR, { recursive: true });
  }

  if (stats && !options.generate) {
    const file = await fsa.readFile(ARCHER_CONFIG_PATH, 'utf8');
    const config = JSON.parse(file);
    return config;
  }

  // resolve from final location... the build directory
  const configOptions = directory(path.resolve(PACKAGE_DIR, 'src/tasks'), {
    read: true,
    filter: 'json',
  }).map((fileDescriptor) => {
    const name = path.basename(fileDescriptor.path, '.json');

    return {
      name,
      json: JSON.parse(fileDescriptor.file),
      prompt: {
        type: 'confirm',
        name: 'install',
        message: `Do you want to install ${name}`,
        initial: true,
      },
    };
  });

  const config = {};

  for (const option of configOptions) {
    const { install } = await prompts(option.prompt);

    if (install) {
      config[option.name] = option.json;
    }
  }

  await fsa.writeFile(ARCHER_CONFIG_PATH, JSON.stringify(config, null, 2));

  return config;
};

export default getConfig;
