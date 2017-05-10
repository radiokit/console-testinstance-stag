import { includes } from 'lodash';

const irregularModulos = [2, 3, 4];

export default {
  counterpart: {
    pluralize: (entry, count) => {
      let key;

      if (count === 0 && 'zero' in entry) {
        key = 'zero';
      } else if (count === 1 && 'one' in entry) {
        key = 'one';
      } else if (count > 11 && count < 20) {
        key = 'otherRegular';
      } else if (includes(irregularModulos, count % 10)) {
        key = 'otherIrregular';
      } else {
        key = 'otherRegular';
      }

      return entry[key];
    },
  },
};
