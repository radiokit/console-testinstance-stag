import {
  Map,
} from 'immutable';
import {
  key,
} from './ContentTypesConfig';
import RadioKitDomain from '../RadioKitDomain';

const { loading } = RadioKitDomain.STATUS;
const loadingState = Map({ value: true });
const idleState = Map({ value: false });

const ContentTypesLoadingStream = RadioKitDomain.map(
  function ContentTypesLoadingProcess(data) {
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

export default ContentTypesLoadingStream;
