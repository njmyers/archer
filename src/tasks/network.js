import pacman from '../commands/pacman';
import systemctl from '../commands/systemctl';
import taskRunner from '../task-runner';

const packages = ['networkmanager', 'net-tools'];

const network = () =>
  new Promise((res, rej) => {
    pacman(packages)
      .then(() => systemctl('enable dhcpcd.service'))
      .then(() => systemctl('enable NetworkManager.service'))
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(network);
