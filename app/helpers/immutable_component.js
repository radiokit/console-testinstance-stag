import {
  is,
} from 'immutable';

export function shouldComponentUpdate(nextProps, nextState) {
  if (nextState !== this.state) {
    return true;
  }
  const keys = Object.keys(this.constructor.propTypes);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const isEqual = is(this.props[key], nextProps[key]);
    if (!isEqual) {
      return true;
    }
  }
  return false;
}

export default {
  shouldComponentUpdate,
};
