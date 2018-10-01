import shell from 'shelljs';

const git = (command, options = {}) =>
  new Promise((res, rej) => {
    if (!shell.which('git')) {
      rej('Sorry, this process requires git');
    }

    const gitProcess = shell.exec(
      `git ${command}`,
      options,
      (code, stdout, stderr) => {
        if (code === 0) {
          res(code);
        } else {
          rej(code);
        }
      }
    );
  });

export default git;
