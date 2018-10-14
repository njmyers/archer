import path from 'path';
import { homedir } from 'os';
import validateDirectory from './validate-directory';

const aurDir = () => {
  const aurDir = path.resolve(homedir(), '.aur');
  validateDirectory(aurDir, { make: true });

  return aurDir;
};

export default aurDir;
