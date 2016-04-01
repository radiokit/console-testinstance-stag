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

class UploadDomain extends Domain {

  constructor() {

    /**
     *
     * @param {number} repositoryID
     * @param {Node} domElement
     */
    function registerDropZone(repositoryID, domElement) {
      //create process
      const process = RadioKit.upload(repositoryID, {autoStart: true});
      
      //bind repository and domElement to process
      nodesByProcess = nodesByProcess.set(process, domElement);
      repositoriesByProcess = repositoriesByProcess.set(process, repositoryID);

      //bind process to dom element
      process.assignBrowse(domElement);
      process.assignDrop(domElement);

      function update(queue) {
        queuesByProcess.write(
          queuesByProcess.read().set(process, queue)
        );
      }

      //prepare queue
      update(emptyQueue);

      function readQueue() {
        update(process.getQueue());
      }

      //update queue on every event
      process.EVENTS.forEach(event => process.on(event, readQueue));

      //start queue immediately after file selection
      process.on('added', () => process.start());
    }
    
    let nodesByProcess = Map();
    let repositoriesByProcess = Map();

    /**
     * Data wrapper for a Map linking process with process status
     * File: Map<{
     *    completed: boolean,
     *    id: string,
     *    name: string,
     *    progress: number,
     *    size: number,
     *    uploading: boolean
     *  }>
     *
     * Queues: List<
     *  Queue: Map<
     *    Process,
     *    List<File>
     *  >
     * >
     */
    const queuesByProcess = new Data(emptyMap);

    const nonEmptyQueues = new View(queuesByProcess, queuesData => queuesData.filter(queue => queue !== emptyQueue));

    /**
     * View wrapper for a List of active queue summaries
     * Summaries: List<
     *  Summary: Map<{
     *    progress: number,
     *    complete: boolean,
     *    uploading: boolean,
     *    files: List<Queue>
     *  }>
     * >
     */
    const queuesSummaries = new View(nonEmptyQueues, /* Queues */ queuesData => {
      return queuesData.map((/* Queue */ files, /* Process */ process) => {

        const progress = Math.round(
          files.reduce((progress, file) => progress + file.get('progress', 0), 0)
          / files.count()
        );
        const completed = !files.count(file => !file.get('completed'));
        const uploading = !!files.find(file => file.get('uploading'), null, false);
        const name = files.find(file => file.get('uploading'), null, emptyMap).get('name', '');
        const repository = repositoriesByProcess.get(process, 0);
        const node = nodesByProcess.get(process, 0);

        return Map({
          name,
          progress,
          completed,
          uploading,
          repository,
          node,
          files,
        });
      });
    });

    super(
      /* structure */
      queuesSummaries,
      /* interface */
      {
        registerDropZone,
      }
    );
  }

}

export default new UploadDomain();
