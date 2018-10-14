const defaults = {
  char: '#',
};

const comment = (string, target, options = defaults) => {
  const regex = new RegExp(`^${options.char}?\s?(\w+${string}\w+)$`, 'gi');
  const results = regext.exec(target);
};
