export default function makeAreDifferent(paths) {
  return function areDifferent(firstImm, secondImm) {
    return (
      !firstImm ||
      !secondImm ||
      (() => {
        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          if (firstImm.getIn(path) !== secondImm.getIn(path)) {
            return true;
          }
        }
        return false;
      })()
    );
  };
}
