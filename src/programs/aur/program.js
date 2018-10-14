import program from 'commander';
import update from 'update-notifier';
import aur from '../../commands/aur';
import getPackageList from './get-package-list';
// package.json
import pkg from '../../../package.json';

update({ pkg }).notify();

program
  .version(pkg.version, '-v --version')
  .option('-s --silent', 'toggles silent mode', true)
  .option('-i --interactive', 'toggles interactive mode', true)
  .option('-u --update', 'update all aur packages', false)
  .usage('[...packages] [...options]')
  .action((...args) => {
    const { options, packages } = getPackageList(args);

    aur(packages, {
      silent: options.silent,
      interactive: options.interactive,
    })
      .then((response) => {
        console.log(response);
        console.log('all tasks complete');
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .parse(process.argv);
