import {
  View,
} from 'immview';
import {
  List,
} from 'immutable';
import RecordURI from '../RecordURI';
import VaultDomain from '../VaultDomain';
import readyQueries from './ScheduleReadyQueries';

const fileDataMaxAge = 60 * 1000; // 1min
readyQueries
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
    VaultDomain.loadFile(fileID, { maxAge: fileDataMaxAge });
  }));

const queriesWithFiles = new View(
  { queries: readyQueries, vault: VaultDomain },
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
