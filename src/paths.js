import path from 'path';
import { homedir } from 'os';
import shell from '~/shell';

export const HOME_DIR = homedir();
export const ARCHER_DIR = path.resolve(HOME_DIR, '.archer');
export const AUR_DIR = path.resolve(HOME_DIR, '.aur');

shell.mkdir.flags('-p', ARCHER_DIR).process({ async: false });
shell.mkdir.flags('-p', AUR_DIR).process({ async: false });
