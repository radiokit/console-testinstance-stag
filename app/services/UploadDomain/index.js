import {
  Data,
  View,
  Domain,
} from 'immview';

import {
  List,
  Map,
  OrderedMap,
} from 'immutable';

import RadioKit from '../RadioKit';

const emptyQueue = List();
const emptyMap = OrderedMap();

/** --------------- */
/** Domain storages */
/** --------------- */

/**
 * Helper map to append repository ids to queues
 * Map<UploadProcess, string>
 */
let repositoriesByProcess = Map();

/**
 * FileUpload is an interface
 * with which information about file upload
 * are given from RadioKit
 *
 * FileUpload: Map {
 *    completed: boolean,
 *    id: string,
 *    name: string,
 *    progress: number,
 *    size: number,
 *    uploading: boolean
 *  }
 *
 * Data wrapper for a Map linking process with queue - list of file upload informations
 * OrderedMap<
 *    UploadProcess,
 *    List<FileUpload>
 * >
 */
const queuesByProcess = new Data(emptyMap);

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
const queuesSummaries = new View(
  queuesByProcess,
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

/** ---------------- */
/** Domain interface */
/** ---------------- */

/**
 *
 * @param {number} id of repository that will hold the files
 * @param {File[]} list of files to upload to repository
 */
function upload(repositoryID, files) {
  // create process
  const uploadProcess = RadioKit.upload(repositoryID, { autoStart: true });

  // bind repository to process
  repositoriesByProcess = repositoriesByProcess.set(uploadProcess, repositoryID);

  function update(queue) {
    queuesByProcess.write(
      data => data.set(uploadProcess, queue)
    );
  }

  // prepare queue
  update(emptyQueue);

  // update queue on every event
  uploadProcess.EVENTS.forEach(
    event => uploadProcess.on(event, () => update(uploadProcess.getQueue()))
  );

  // append files to newly created queue
  files.forEach(file => uploadProcess.__resumable.addFile(file));
}

/** --------------- */
/** Domain creation */
/** --------------- */

const UploadDomain = new Domain(
  /* structure */
  queuesSummaries,
  /* actions */
  {
    upload,
  }
);

export default UploadDomain;
