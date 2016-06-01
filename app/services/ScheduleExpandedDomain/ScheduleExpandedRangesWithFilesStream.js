import {
  View,
} from 'immview';
import {
  List,
} from 'immutable';
import ScheduleExpandedRangesStream from './ScheduleExpandedRangesStream';
import FilesDomain from '../FilesDomain';
import ScheduleDomain from '../ScheduleDomain';

const ScheduleReadyRangesToExpandStream = new View(
  {
    ScheduleDomain,
    ScheduleExpandedRangesStream,
  },
  data => {
    const ranges = data.getIn(['ScheduleDomain', 'ranges']);
    const rangesToExpand = data.get('ScheduleExpandedRangesStream');
    return ranges.filter((_, range) => rangesToExpand.includes(range));
  }
);

const fileDataMaxAge = 60 * 1000; // 1min
function downloadFiles(/* List */ fileIds) {
  let fileIdsLeft = fileIds;
  runDeferredFilePreload();

  function deferredFilePreload() {
    if (fileIds.count() > 0) {
      const fileId = fileIdsLeft.first();
      if (fileId) {
        fileIdsLeft = fileIdsLeft.rest();
        FilesDomain.loadFile(fileId, { maxAge: fileDataMaxAge, noLoadingState: true });
        runDeferredFilePreload();
      }
    }
  }

  function runDeferredFilePreload() {
    window.requestIdleCallback
      ? window.requestIdleCallback(deferredFilePreload, { timeout: 100 })
      : window.setTimeout(deferredFilePreload, 100);
  }
}

ScheduleReadyRangesToExpandStream
  .map(
    ranges => ranges
      .map(scheduleItems => scheduleItems.map(scheduleItem => scheduleItem.get('file')))
      .flatten(true)
      .toSet()
  )
  .subscribe(downloadFiles);

const ScheduleReadyQueriesWithFiles = new View(
  { queries: ScheduleReadyRangesToExpandStream, vault: FilesDomain },
  data => data.get('queries', List()).map(
    query => query
      .map(scheduleItem => {
        const fileID = scheduleItem.get('file');
        const file = data.getIn(['vault', 'files', fileID]);
        if (file) {
          return scheduleItem.set('file', file);
        }
        return null;
      })
      .filter(item => !!item)
  )
);

export default ScheduleReadyQueriesWithFiles;
