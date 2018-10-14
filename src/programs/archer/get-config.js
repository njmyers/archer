// @flow
import fs from 'fs';
import path from 'path';
import { homedir } from 'os';
import { pipeAsync } from 'smalldash';
import directory from '@njmyers/directory';
import prompts from 'prompts';
import archerDir from '../../library/archer-dir';

const configPath = path.resolve(archerDir(), 'config.json');

const getConfig = (options): Promise<any> =>
  new Promise((res, rej) => {
    // check for config
    fs.stat(configPath, (err, data) => {
      if (data && !options.generate) {
        const json = JSON.parse(fs.readFileSync(configPath).toString());
        res(json);
      } else {
        // resolve from final location... the build directory
        const pipeline = directory(path.resolve(__dirname, '../src/tasks'), {
          read: true,
          filter: 'json',
        })
          .map((obj) => ({
            json: JSON.parse(obj.file),
            name: path.basename(obj.path, '.json'),
          }))
          .map(({ json, name }) => (prevConfig = {}) =>
            new Promise((res, rej) =>
              prompts({
                type: 'confirm',
                name: 'bool',
                message: `Do you want to install ${name}`,
                initial: true,
              })
                .then(({ bool }) => {
                  if (bool) {
                    res({
                      ...prevConfig,
                      [name]: json,
                    });
                  } else {
                    res(prevConfig);
                  }
                })
                .catch((error) => rej(error))
            )
          );

        return pipeAsync(...pipeline)({})
          .then((config) => {
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            res(config);
          })
          .catch((error) => rej(error));
      }
    });
  });

export default getConfig;
