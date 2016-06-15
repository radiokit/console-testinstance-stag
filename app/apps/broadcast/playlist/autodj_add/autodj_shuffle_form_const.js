import {
  Map,
  List,
} from 'immutable';

export const EMPTY_TAG = Map({ ratio: 0, tag: null });
export const EMPTY_SHUFFLE = List();
export const EMPTY_FORM = Map({ tags: EMPTY_SHUFFLE });
export const ENTRY_ID_PATH = ['tag', 'id'];
export const ENTRY_RATIO_PATH = ['ratio'];
