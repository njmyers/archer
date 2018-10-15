import acceptArgs from '../accept-args';

const returnSelf = (args, options = {}) => ({ args, options });

const defaults = {
  key: 'value',
};

const tester = (...args) => acceptArgs(args, defaults, returnSelf);

describe('it accepts variadic arguments with options as the last arg', () => {
  test('it works with simple string argument', () => {
    const { args, options } = tester('string');
    expect(args).toMatchObject(['string']);
    expect(options).toMatchObject(defaults);
  });

  test('it works with longer string argument', () => {
    const { args, options } = tester('systemctl enable gdm.service');
    expect(args).toMatchObject(['systemctl', 'enable', 'gdm.service']);
    expect(options).toMatchObject(defaults);
  });

  test('it works with arrays of string argument', () => {
    const { args, options } = tester(['some', 'strings']);
    expect(args).toMatchObject(['some', 'strings']);
    expect(options).toMatchObject(defaults);
  });
});
