import pacman from '../commands/pacman';
import sudo from '../commands/sudo';
import createSpawn from '../commands/create-spawn';
import taskRunner from '../task-runner';

const packages = ['linux-lts', 'base-devel'];

const locale = () =>
  new Promise((res, rej) => {
    createSpawn('locale-gen')()
      .then(() => sudo('ln -s /usr/share/zoneinfo/US/Eastern /etc/localtime'))
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(locale);
