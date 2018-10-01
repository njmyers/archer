import { pipeAsync } from 'smalldash';
import kernel from './tasks/kernel';
import network from './tasks/network';
import graphics from './tasks/graphics';
import deepin from './tasks/deepin';
import fonts from './tasks/fonts';
import theme from './tasks/theme';
import editors from './tasks/editors';
import applications from './tasks/applications';
import gnome from './tasks/gnome';
// import aur from './commands/aur';

// const aurPackages = [
//   'adobe-base-14-fonts',
//   'android-emulator',
//   'atom-editor-bin',
//   'capitaine-cursors',
//   'deepin-topbar',
//   'dropbox',
//   'dropbox-cli',
//   'google-chrome',
//   'keeweb-desktop',
//   'la-capitaine-icon-theme',
//   'macos-icon-theme',
//   'masterpdfeditor',
//   'nautilus-dropbox',
//   'ncurses5-compat-libs',
//   'otf-san-francisco',
//   'otf-sfmono',
//   'postman-bin',
//   'spotify',
//   'ttf-mac-fonts',
//   'ttf-ms-win10',
//   'visual-stusdio-code-bin',
//   'watchman',
//   'x-arc-white',
// ];

const pipeline = pipeAsync(
  kernel,
  graphics,
  fonts,
  gnome,
  theme,
  editors,
  applications
);

pipeline();

// aur(aurPackages)
//   .then((response) => {
//     console.log('all tasks completed successfully');
//   })
//   .catch((error) => {
//     console.log(error);
//   });
