import {
  List,
  Map,
  OrderedMap,
} from 'immutable';
import RadioKit from '../RadioKit';
import { update } from './RadioKitQueries';
import * as STATUS from './RadioKitQueryStatuses';
import { debounce } from 'lodash';

let mutationQueue = OrderedMap();
let isQueueRunning = false;

function mutationToParams(mutation) {
  const { app, model, id, action } = mutation.toObject();
  return Map({ app, model, id, action });
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
      update(queryParams, STATUS.done, result || List([data]), requestTime);
      resolve();
    };

    const onError = () => {
      update(queryParams, STATUS.error, List(), requestTime);
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

function shiftJobFromQueue() {
  const toRun = mutationQueue.first();
  mutationQueue = mutationQueue.rest();
  return toRun;
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

const runQueueDebounced = debounce(runQueue, 3000);

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

function dispatchMutation(mutation) {
  const { patch } = mutation.toObject();
  update(
    mutationToParams(mutation),
    STATUS.loading,
    List([patch.set('id', mutation.get('id'))]),
    Date.now()
  );
  pushMutationToQueue(mutation);
}

export function save(params, patch) {
  const mutation = params
    .set('action', params.get('id') ? 'update' : 'create')
    .set('patch', patch);
  dispatchMutation(mutation);
}

export function remove(params) {
  const stub = List([Map({ id: params.get('id') })]);
  const mutation = params
    .set('patch', stub)
    .set('action', 'destroy')
    .set('result', stub);
  dispatchMutation(mutation);
}
