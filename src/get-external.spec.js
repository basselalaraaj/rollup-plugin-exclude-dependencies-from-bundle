import getExternal from './get-external';

describe('getExternal', () => {
  describe('when passed an empty array', () => {
    it('returns a predicate that always returns false', () => {
      const fn = getExternal([]);

      expect(fn('redux')).toBe(false);
      expect(fn('redux-saga')).toBe(false);
    });
  });

  describe('when passed an array of module names', () => {
    it('returns a predicate that returns true for matching modules', () => {
      const fn = getExternal(['redux', 'redux-saga', 'reselect']);

      expect(fn('redux')).toBe(true);
      expect(fn('redux/compose')).toBe(true);
      expect(fn('redux-saga')).toBe(true);
      expect(fn('reselect')).toBe(true);
      expect(fn('babel-plugin-lodash')).toBe(false);
      expect(fn('lodash-es')).toBe(false);
    });
  });
});
