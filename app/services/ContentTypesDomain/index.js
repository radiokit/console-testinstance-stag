import {
  Domain,
} from 'immview';
import stream from './ContentTypesDomainStream';
import actions from './ContentTypesDomainActions';

const ContentTypesDomain = new Domain(stream, actions);

export default ContentTypesDomain;
