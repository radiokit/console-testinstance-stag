import {
  View,
  dispatch,
} from 'immview';
import {
  Map,
  List,
} from 'immutable';
import ScheduleExpandedRangesStream from './ScheduleExpandedRangesStream';
import FilesDomain from '../FilesDomain';
import ScheduleDomain from '../ScheduleDomain';

const fileDataMaxAge = 60 * 1000; // 1min

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

ScheduleReadyRangesToExpandStream
  .map(
    ScheduleReadyRangesToExpand => ScheduleReadyRangesToExpand.map(getFileIdsOfScheduleItems)
  )
  .map(concatChildren)
  .map(getUniqValues)
  .subscribe(downloadFiles);

const ScheduleReadyQueriesWithFiles = new View(
  {
    ScheduleReadyRangesToExpandStream,
    FilesDomain,
  },
  data => {
    const files = data.getIn(['FilesDomain', 'files']) || Map();
    const ranges = data.get('ScheduleReadyRangesToExpandStream') || List();

    return ranges.map(
      scheduleItems => getNonEmptyValues(
        scheduleItems.map(scheduleItem => {
          const scheduleItemExpanded = getScheduleItemExpandedWithFile(files, scheduleItem);
          if (scheduleItemExpanded.get('file')) {
            return scheduleItemExpanded;
          }
          return null;
        })
      )
    );
  });

export default ScheduleReadyQueriesWithFiles;

function getScheduleItemExpandedWithFile(files, scheduleItem) {
  return scheduleItem.set(
    'file',
    files.get(
      scheduleItem.get('file'),
      null
    )
  );
}

function getNonEmptyValues(collection) {
  return collection.filter(getNonEmptyValue);
}

function getNonEmptyValue(item) {
  return !!item;
}

function getUniqValues(collection) {
  return collection.toSet();
}

function concatChildren(collections) {
  return collections.reduce(
    (result, collection) => result.concat(collection || List()),
    List()
  );
}

function getFileIdsOfScheduleItems(scheduleItems) {
  return scheduleItems.map(scheduleItem => scheduleItem.get('file'));
}

function downloadFiles(/* List */ fileIds) {
  dispatch(() => deferredFilePreload(fileIds));

  function deferredFilePreload(fileIdsLeft) {
    if (fileIdsLeft.count() > 0) {
      const fileId = fileIdsLeft.first();
      if (fileId) {
        FilesDomain.loadFile(fileId, { maxAge: fileDataMaxAge, noLoadingState: true });
        dispatch(() => deferredFilePreload(fileIdsLeft.rest()));
      }
    }
  }
}
