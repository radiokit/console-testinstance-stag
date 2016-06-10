import {
  List,
  Map,
  OrderedMap,
} from 'immutable';
import RadioKit from '../RadioKit';
import { updateQueryInQueriesStream } from './RadioKitQueriesStream';
import * as STATUS from './RadioKitQueryStatuses';
import { debounce } from 'lodash';

let mutationQueue = OrderedMap();
let isQueueRunning = false;

export {
  save,
  remove,
};

const runQueueDebounced = debounce(runQueue, 3000);

function save(params, patch, filterKeys) {
  const mutation = params
    .set('patch', filterEntity(patch, filterKeys))
    .set('optimistic', patch)
    .set('action', params.get('id') ? 'update' : 'create')
  ;
  dispatchMutation(mutation);
}

function filterEntity(entity, fields) {
  if (!fields) {
    return entity;
  }
  return entity
    .filter((_, field) => fields.indexOf(field) >= 0);
}

function remove(params) {
  const stub = List([Map({ id: params.get('id') })]);
  const mutation = params
    .set('patch', stub)
    .set('optimistic', stub)
    .set('result', stub)
    .set('action', 'destroy')
    ;
  dispatchMutation(mutation);
}

function dispatchMutation(mutation) {
  const { optimistic } = mutation.toObject();
  updateQueryInQueriesStream(
    mutationToParams(mutation),
    STATUS.loading,
    List([optimistic]),
    Date.now()
  );
  pushMutationToQueue(mutation);
}

function mutationToParams(mutation) {
  const { app, model, id, action } = mutation.toObject();
  return Map({ app, model, id, action });
}

function pushMutationToQueue(mutation) {
  const { app, model, id } = mutation.toObject();
  const mutationQueueKey = Map({ app, model, id });
  const alreadyDispatched = mutationQueue.get(mutationQueueKey) || Map();
  const isDeletionDispatched = alreadyDispatched.get('action') === 'destroy';
  if (!isDeletionDispatched) {
    mutationQueue = mutationQueue.set(mutationQueueKey, mutation);
    runQueueDebounced();
  }
}

function runQueue() {
  if (isQueueRunning) {
    return;
  }
  const job = shiftJobFromQueue();
  if (job) {
    isQueueRunning = true;
    perform(job).then(() => {
      isQueueRunning = false;
      runQueue();
    });
  }
}

function shiftJobFromQueue() {
  const toRun = mutationQueue.first();
  mutationQueue = mutationQueue.rest();
  return toRun;
}

function perform(mutation) {
  const {
    app,
    model,
    id,
    action,
    patch,
    result,
  } = mutation.toObject();

  const queryParams = mutationToParams(mutation);
  const requestTime = Date.now();

  return new Promise((resolve) => {
    const onSuccess = (data) => {
      updateQueryInQueriesStream(queryParams, STATUS.done, result || List([data]), requestTime);
      resolve();
    };

    const onError = () => {
      updateQueryInQueriesStream(queryParams, STATUS.error, List(), requestTime);
      resolve();
    };

    RadioKit
      .record(app, model, id)
      .on('loaded', (__, _, data) => onSuccess(data))
      .on('warning', onError)
      .on('error', onError)
      [action](patch.delete('id'));
  });
}

