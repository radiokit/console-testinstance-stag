import Immutable from 'immutable';

export default {
  /**
   * Gets nested value from extra field from given record or fall backs
   * to the given default value if it is not found.
   *
   * Record has to be an Immutable Map.
   *
   * For example if you have a record that is an Immutable Map with extra
   * containing
   *
   *   { a: { b: "c" } }
   *
   * and you will call
   *
   *   getExtra(record, ["a", "b"], "default")
   *
   * you will get "c". But if you call a non-existent path like
   *
   *   getExtra(record, ["a", "x"], "default")
   *
   * you will get "default".
   */
  getExtra(record, path, defaultValue) {
    let current = record.get('extra');

    for (let i = 0; i < path.length; i++) {
      if (current.has(path[i])) {
        current = current.get(path[i]);
      } else {
        return defaultValue;
      }
    }

    return current;
  },


  /**
   * Sets nested value in extra field to the given value on the given record.
   * Record has to be an Immutable Map.
   *
   * Returns modified record.
   *
   * For example if you have a record that is an Immutable Map with extra
   * containing
   *
   *   { a: { b: "c" } }
   *
   * and you will call
   *
   *   setExtra(record, ["a", "d"], "soemthing")
   *
   * you will get
   *
   *   { a: { b: "c", d: "something" } }
   */
  setExtra(record, path, value) {
    const extra = {};
    let current = extra;

    for (let i = 0; i < path.length - 1; i++) {
      current[path[i]] = {};
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;

    return record.mergeDeep(Immutable.fromJS({ extra }));
  },
};
