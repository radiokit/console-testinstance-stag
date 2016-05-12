export default function make(keys) {
  return function compareProps(nextProps) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (nextProps[key] !== this.props[key]) {
        return true;
      }
    }
    return false;
  };
}
