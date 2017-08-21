import RadioKit from '../RadioKit';
import {
  updateProcessQueue,
  setupProcess,
} from './UploadProcessesSummaries';
import UploadProcessesStream from './UploadProcessesStream';
import { OrderedMap } from 'immutable';


const actions = {
  upload,
  clear,
};

export default actions;

/**
 *
 * @param {number} id of repository that will hold the files
 * @param {File[]} list of files to upload to repository
 */
function upload(repositoryID, files) {
  // create process
  const uploadProcess = RadioKit.upload(repositoryID, { autoStart: true });

  // bind repository to process
  setupProcess(uploadProcess, repositoryID);

  // update queue on every event
  uploadProcess.EVENTS.forEach(
    event => uploadProcess.on(
      event,
      () => updateProcessQueue(uploadProcess, uploadProcess.getQueue())
    )
  );

  // WARNING
  // This uses private interface of process
  // May break in future
  // Should be officially supported feature
  files.forEach(file => uploadProcess.__resumable.addFile(file));
}

function clear() {
  UploadProcessesStream.write(OrderedMap());
}
