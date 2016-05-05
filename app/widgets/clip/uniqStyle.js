import {
  find,
} from 'lodash';

function isStyleEqual(s1, s2) {
  if (s2 === s1) {
    return true;
  }
  if (Object.keys(s2).length !== Object.keys(s1).length) {
    return false;
  }
  let same = true;
  Object.keys(s2).forEach(key => {
    same &= (s2[key] === s1[key]);
  });
  return same;
}

function findItem(collection, item) {
  return find(collection, dictItem => isStyleEqual(dictItem, item));
}

export default function () {
  let dict = [];
  return function uniqStyle(style) {
    // return style;
    const originalStyle = findItem(dict, style);
    if (originalStyle) {
      return originalStyle;
    }
    dict.push(style);
    if (dict.length > 100) {
      dict = dict.slice(50, 50);
    }
    return style;
  };
}
