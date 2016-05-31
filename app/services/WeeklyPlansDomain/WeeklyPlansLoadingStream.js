import {
  Map,
} from 'immutable';
import {
  key,
} from './WeeklyPlansConfig';
import RadioKitDomain from '../RadioKitDomain';

const { loading } = RadioKitDomain.STATUS;
const loadingState = Map({ value: true });
const idleState = Map({ value: false });

export default RadioKitDomain.map(
  function WeeklyPlansLoadingProcess(data) {
    return data
      .get('queries')
      .filter(
        (queryStatus, queryParams) => (
          queryStatus.get('status') === loading &&
          queryParams.get(key)
        )
      )
      .count() > 0
      ? loadingState
      : idleState
    ;
  }
);
