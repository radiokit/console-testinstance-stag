import { Map } from 'immutable';
import { View } from 'immview';
import FilesDomain from '../FilesDomain';
import ScheduleDomain from '../ScheduleDomain';

export default new View(
  {
    FilesDomain,
    ScheduleDomain,
  },
  data => Map({
    value: (
      data.getIn(['FilesDomain', 'loading']) ||
      data.getIn(['ScheduleDomain', 'loading'])
    ),
  })
);
