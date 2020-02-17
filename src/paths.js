import path from 'path';
import { homedir } from 'os';
import pkgDir from 'pkg-dir';

import shell from '~/shell';

export const HOME_DIR = homedir();
export const ARCHER_DIR = path.resolve(HOME_DIR, '.archer');
export const ARCHER_CONFIG_PATH = path.resolve(ARCHER_DIR, 'config.json');
export const AUR_DIR = path.resolve(HOME_DIR, '.aur');
export const PACKAGE_DIR = pkgDir.sync(__dirname);

shell.mkdir.flags('-p', ARCHER_DIR).process({ async: false });
shell.mkdir.flags('-p', AUR_DIR).process({ async: false });
