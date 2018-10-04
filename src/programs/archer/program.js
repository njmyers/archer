// @flow
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
    const [options, configs] = args.reverse();

    getConfig(options)
      .then((config) => {
        const pipeline = runAll(config, options);

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
  })
  .parse(process.argv);
