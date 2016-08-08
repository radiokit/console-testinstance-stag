import {
  Map,
} from 'immutable';
import {
  pull,
  forEach,
} from 'lodash';
import RadioKit from '../../../services/RadioKit';

export const State = {
  playing: 'PLAYING',
  paused: 'PAUSED',
  hidden: 'HIDDEN',
  loading: 'LOADING',
  error: 'ERROR',
};

const defaultState = Map({
  source: Map(),
  state: State.hidden,
});

export default {
  state: defaultState,

  listeners: [],

  addUpdateListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    } else {
      // eslint-disable-next-line no-console
      console.warn('FilePlayerStore: listener should be a function, but got', typeof listener);
    }
  },

  removeUpdateListener(listener) {
    pull(this.listeners, listener);
  },

  callUpdateListeners() {
    forEach(this.listeners, listener => listener(this.state));
  },

  play() {
    const source = this.state.get('source');

    if (
      !source.get('url') ||
      !source.get('temp_url_expires') ||
      (parseInt(source.get('temp_url_expires'), 10) <= parseInt(Date.now() / 1000, 10))
    ) {
      this.fetchUrlForFile();
    } else {
      this.setState(this.state.set('state', State.playing));
    }
  },

  pause() {
    this.setState(this.state.set('state', State.paused));
  },

  hide() {
    this.setState(this.state.set('state', State.hidden));
  },

  markAsErroneus() {
    this.setState(this.state.set('state', State.error));
  },

  setSource(file) {
    this.setState(this.state.set('source', file));
  },

  fetchUrlForFile() {
    this.setState(this.state.set('state', State.loading));
    RadioKit
      .query('vault', 'Data.Record.File')
      .select('id', 'public_url')
      .where('id', 'eq', this.state.getIn(['source', 'id']))
      .on('fetch', (_wtf1, _wtf2, data) => {
        this.parseFileResponse(data.first());
      })
      .on('error', () => {
        this.setState(this.state.set('state', State.error));
      })
      .fetch();
  },

  parseFileResponse(file) {
    const url = file.get('public_url');
    const query = parseUri(url);

    if (this.state.getIn(['source', 'id']) === file.get('id')) {
      const newSource = this.state.get('source').merge({
        ...query,
        url,
      });

      this.setState(this.state
        .set('source', newSource)
        .set('state', State.playing)
      );
    }
  },

  setState(newState) {
    this.state = newState;
    this.callUpdateListeners();
  },

  getState() {
    return this.state;
  },

  clear() {
    this.setState(defaultState);
  },
};

function parseUri(url) {
  const query = url.split('?')[1] || '';
  const params = query.split('&');
  const queryObj = {};

  forEach(params, param => {
    const splitted = param.split('=');
    queryObj[splitted[0]] = splitted[1];
  });

  return queryObj;
}
