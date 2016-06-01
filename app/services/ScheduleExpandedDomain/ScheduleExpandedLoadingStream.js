import { Map } from 'immutable';
import { View } from 'immview';
import FilesDomain from '../FilesDomain';
import ScheduleDomain from '../ScheduleDomain';

const loadingState = Map({ value: true });
const idleState = Map({ value: false });

const ScheduleExpandedLoadingStream = new View(
  {
    FilesDomain,
    ScheduleDomain,
  },
  data => (
    (
      data.getIn(['FilesDomain', 'loading']) ||
      data.getIn(['ScheduleDomain', 'loading'])
    )
      ? loadingState
      : idleState
  )
);

export default ScheduleExpandedLoadingStream;
