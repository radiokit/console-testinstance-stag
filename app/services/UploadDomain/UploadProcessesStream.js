import {
  Data,
} from 'immview';

import {
  OrderedMap,
} from 'immutable';

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
const UploadProcessesStream = new Data(OrderedMap());

export default UploadProcessesStream;
