import fs from 'fs';

const defaults = {
  make: true,
};

const validateDirectory = (dir, options = defaults) => {
  if (!fs.existsSync(dir)) {
    if (options.make) {
      fs.mkdirSync(dir);
    }

    return false;
  }

  return true;
};

export default validateDirectory;
