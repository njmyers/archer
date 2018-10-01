import pacman from '../commands/pacman';
import systemctl from '../commands/systemctl';
import taskRunner from '../task-runner';

// install minimal gnome packages
const packages = [
  'gnome-shell',
  'nautilus',
  'wayland',
  'file-roller',
  'gnome-backgrounds',
  'gnome-calculator',
  'gnome-color-manager',
  'gnome-control-center',
  'gnome-dictionary',
  'gnome-disk-utility',
  'gnome-menus',
  'gnome-screenshot',
  'gnome-system-monitor',
  'gnome-user-share',
  'grilo-plugins',
  'gvfs',
  'gvfs-afc',
  'gvfs-goa',
  'gvfs-google',
  'gvfs-nfs',
  'gvfs-smb',
  'mousetweaks',
  'networkmanager',
  'rygel',
  'simple-scan',
  'sushi',
  'trackers',
  'trackers-miners',
  'vino',
  'xdg-user-dirs-gtk',
  'lightdm',
];

const gnome = () =>
  new Promise((res, rej) => {
    pacman(packages)
      .then(() => systemctl(`enable lightdm.service`))
      .then((code) => res(code))
      .catch((error) => rej(error));
  });

export default taskRunner(gnome);
