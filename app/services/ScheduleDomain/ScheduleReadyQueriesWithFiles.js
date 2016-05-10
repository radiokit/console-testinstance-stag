import {
  View,
} from 'immview';
import {
  List,
} from 'immutable';
import RecordURI from '../RecordURI';
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
      .map(item => RecordURI.from(item.get('location')).id)
      .flatten(true)
      .toSet()
  )
  .subscribe(fileIds => fileIds.forEach(fileID => {
    FilesDomain.loadFile(fileID, { maxAge: fileDataMaxAge });
  }));

const queriesWithFiles = new View(
  { queries: ScheduleReadyQueriesStream, vault: FilesDomain },
  data => data.get('queries', List()).map(
    query => query.set('data', query.get('data', List())
      .map(item => {
        const fileID = RecordURI.from(item.get('location')).id;
        const file = data.getIn(['vault', 'files', fileID]);
        if (file) {
          return item
            .delete('location')
            .set('file', file);
        }
        return null;
      })
      .filter(item => !!item)
    )
  )
);

export default queriesWithFiles;
