import fs from 'fs';
import path from 'path';
import { AUR_DIR } from '~/paths';

/**
 * Gets a list of all of directories in the ~/.aur directory
 * If there are not aur directories they will silently fail
 */
const getInstalled = () => {
  return fs.readdirSync(AUR_DIR).filter((folderName) => {
    // path to specific aur folder
    const absolutePath = path.resolve(AUR_DIR, folderName);
    // filter out files and leave only folders
    return fs.lstatSync(absolutePath).isDirectory();
  });
};

export default getInstalled;
