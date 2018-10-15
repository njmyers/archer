import flatten from '../flatten';

describe('it flattens strings and arrays recursively and creates a one dimensional array of args', () => {
  test('if accepts strings', () => {
    expect(flatten('string space')).toMatchObject(['string', 'space']);
  });

  test('it accepts arrays', () => {
    expect(flatten(['item', 'in', 'array'])).toMatchObject([
      'item',
      'in',
      'array',
    ]);
  });

  test('it breaks apart string seperated arguments inside of an array', () => {
    expect(flatten(['some string'])).toMatchObject(['some', 'string']);
  });

  test('it works on arrays of different dimension', () => {
    expect(flatten(['some', ['string', 'value']])).toMatchObject([
      'some',
      'string',
      'value',
    ]);
  });

  test('it works on arrays of different dimension and breaks up their args', () => {
    expect(flatten(['some', ['string', ['value flag']]])).toMatchObject([
      'some',
      'string',
      'value',
      'flag',
    ]);
  });
});
