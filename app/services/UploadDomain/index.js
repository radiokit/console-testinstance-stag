import {
  Domain,
} from 'immview';

import stream from './UploadProcessesSummaries';
import actions from './UploadDomainActions';

const UploadDomain = new Domain(
  stream,
  actions
);

export default UploadDomain;
