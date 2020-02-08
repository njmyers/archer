import program from 'commander';
import update from 'update-notifier';

import aur from './aur';
import pkg from '../../../package.json';

update({ pkg }).notify();

program
  .version(pkg.version, '-v --version')
  .option('-S --sync', 'Sync package targets', false)
  .option('-y --refresh', 'Download a fresh copy of all packages', false)
  .option('-u --sysupgrade', 'Build and upgrade all packages', false)
  .option('-R --remove', 'Remove specified packages from the system', false)
  .option('-s --recursive', 'Remove other non-required dependencies', false)
  .option('-n --nosave', 'Remove other non-required dependencies', false)
  .action((options, packages) => {
    aur(packages, options)
      .then(() => console.log('All tasks finished'))
      .catch((code) => {
        console.log(`Program exited with code ${code}`);
        console.log(code);
      });
  })
  .parse(process.argv);
