// @flow
import path from 'path';
import directory from '@njmyers/directory';
import program from 'commander';
import update from 'update-notifier';
import getConfig from './get-config';
import runAll from '../../run-all';
// package.json
import pkg from '../../../package.json';

update({ pkg }).notify();

program
  .version(pkg.version, '-v --version')
  .option('-s --silent', 'toggles silent mode', false)
  .option('-g --generate', 'refresh and generate a new configuration', false)
  .usage('[config.json]')
  .action((...args) => {
    const [options, ...configs] = args.reverse();

    const cleanOptions = {
      silent: options.silent,
      generate: options.generate,
    };

    if (configs.length < 1) {
      getConfig(cleanOptions)
        .then((config) => {
          const pipeline = runAll(config, cleanOptions);

          pipeline()
            .then((response) => {
              console.log(response);
              console.log('all tasks complete');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const config = configs
        .map((file) => directory(file, { filter: 'json', read: true }))
        .reduce((bigArr, argArr) => bigArr.concat(argArr), [])
        .reduce(
          (config, obj) => ({
            ...config,
            [path.basename(obj.path, '.json')]: JSON.parse(obj.file),
          }),
          {}
        );

      const pipeline = runAll(config, cleanOptions);

      pipeline()
        .then((response) => {
          console.log(response);
          console.log('all tasks complete');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
  .parse(process.argv);
