import fs from 'fs';
import path from 'path';
import aurDir from '../../library/aur-dir';

/**
 * Gets a list of all of directories in the ~/.aur directory
 * If there are not aur directories they will silently fail
 */
const getInstalled = () => {
  const aurPath = aurDir();

  return fs.readdirSync(aurPath).filter((folderName) => {
    // path to specific aur folder
    const absolutePath = path.resolve(aurPath, folderName);
    // filter out files and leave only folders
    return fs.lstatSync(absolutePath).isDirectory();
  });
};

export default getInstalled;
