import {
  View,
} from 'immview';

import {
  List,
  Map,
  OrderedMap,
} from 'immutable';

import UploadProcessesStream from './UploadProcessesStream';

/**
 * Helper map to append repository ids to queues
 * Is not a stream for performance gain
 * Map<UploadProcess, string>
 */

const emptyQueue = List();
const emptyMap = OrderedMap();

let repositoriesByProcess = emptyMap;

/**
 * View wrapper for a List of active queue summaries
 * Its intention is to give similar informations for whole queue
 * like there is for single file upload
 *
 * OrderedMap<
 *  UploadProcess,
 *  Map {
 *    progress: number,
 *    complete: boolean,
 *    uploading: boolean,
 *    files: List<FileUpload>
 *  }
 * >
 */
const UploadProcessesSummaries = new View(
  UploadProcessesStream,
  queuesByProcessData => queuesByProcessData.map(
    (/** List<FileUpload> */ files,
     /** UploadProcess */ process) => Map({
       name: files.find(file => file.get('uploading'), null, emptyMap).get('name', ''),
       progress: Math.round(
       files.reduce((progress, file) => progress + file.get('progress', 0), 0)
       / files.count()
       ),
       completed: !files.count(file => !file.get('completed')),
       uploading: !!files.find(file => file.get('uploading'), null, false),
       repository: repositoriesByProcess.get(process, 0),
       files,
     })
  )
);

export {
  UploadProcessesSummaries,
  UploadProcessesSummaries as default,
  updateProcessQueue,
  setupProcess,
};


function updateProcessQueue(process, queue) {
  UploadProcessesStream.write(
    processes => processes.set(process, queue)
  );
}

function setupProcess(process, repositoryID) {
  repositoriesByProcess = repositoriesByProcess.set(process, repositoryID);
  updateProcessQueue(process, emptyQueue);
}
