import {
  is,
} from 'immutable';

export default {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }
    let should = false;
    const keys = Object.keys(this.constructor.propTypes);
    keys.forEach(key => {
      should = should || !is(this.props[key], nextProps[key]);
    });
    return should;
  },
};
