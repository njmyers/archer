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

const pipeline = pipeAsync(
  kernel,
  graphics,
  fonts,
  gnome,
  theme,
  editors,
  applications
);

pipeline()
  .then((thing) => console.log(thing))
  .catch((error) => console.log(error));
