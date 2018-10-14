import path from 'path';
import { homedir } from 'os';
import validateDirectory from './validate-directory';

const archerDir = () => {
  const archerDir = path.resolve(homedir(), '.archer');
  validateDirectory(archerDir);

  return archerDir;
};

export default archerDir;
