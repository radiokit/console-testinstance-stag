import {
  View,
} from 'immview';
import {
  List,
} from 'immutable';
import FilesDomain from '../FilesDomain';
import ScheduleReadyQueriesStream from './ScheduleReadyQueriesStream';

const fileDataMaxAge = 60 * 1000; // 1min
ScheduleReadyQueriesStream
  .map(
    queries => queries
      .map(status => status.get('data', List()))
      .flatten(true)
  )
  .map(
    items => items
      .map(item => item.get('file'))
      .flatten(true)
      .toSet()
  )
  .subscribe(fileIds => fileIds.forEach(fileID => {
    FilesDomain.loadFile(fileID, { maxAge: fileDataMaxAge });
  }));

const ScheduleReadyQueriesWithFiles = new View(
  { queries: ScheduleReadyQueriesStream, vault: FilesDomain },
  data => data.get('queries', List()).map(
    query => query.set('data', query.get('data', List())
      .map(item => {
        const fileID = item.get('file');
        const file = data.getIn(['vault', 'files', fileID]);
        if (file) {
          return item.set('file', file);
        }
        return null;
      })
      .filter(item => !!item)
    )
  )
);

export default ScheduleReadyQueriesWithFiles;
