import {
  fromJS,
  List,
  Map,
} from 'immutable';

import {
  ClipUtils,
} from './clip_utils';

/** TRACKLIST */

export const TrackListUtils = {
  fromRawClip(clip) {
    const processedClip = ClipUtils.fromRaw(clip);
    return fromJS({
      items: [
        {
          offset: 0,
          track: 1,
          'cue-in': 0,
          'cue-out': processedClip.get('duration'),
          clip: processedClip,
        }
      ]
    });
  },
  fromRaw(raw) {
    return Map({
      id: raw.get('id', 0),
      name: raw.get('name', ''),
      items: raw.get('items', List()).map(TrackItemUtils.fromRaw)
    });
  },
  toRaw(originalRaw, pretty) {
    return originalRaw
      .set(
        'items',
        pretty
          .get('items')
          .map(
            newItem => TrackItemUtils.toRaw(
              originalRaw
                .get('items')
                .find(item=>item.get('id') === newItem.get('id')) || Map(),
              newItem
            )
          )
      );
  }
};

/** TRACKITEM */

export const TrackItemUtils = {
  fromRaw(raw) {
    const processedClip = ClipUtils.fromRaw(raw.get('clip'));
    return Map({
      id: raw.get('id', 0),
      track: raw.get('track', 0),
      position: raw.get('offset', 0),
      offsetStart: raw.get('cue-in', 0),
      offsetLength: raw.get('cue-out', 0) - raw.get('cue-in', 0),
      fadeIn: raw.get('fade-in', 0) - raw.get('cue-in', 0),
      fadeOut: raw.get('cue-out', 0) - raw.get('fade-out', 0),
      clip: processedClip,
      maxOffsetLength: processedClip.get('duration'),
    });
  },
  toRaw(originalRaw, pretty) {
    return originalRaw
      .set('track', pretty.get('track'))
      .set('offset', pretty.get('position'))
      .set('cue-in', pretty.get('offsetStart'))
      .set('fade-in', pretty.get('offsetStart') + pretty.get('fadeIn'))
      .set('fade-out', pretty.get('offsetStart') + pretty.get('offsetLength') - pretty.get('fadeOut'))
      .set('cue-out', pretty.get('offsetStart') + pretty.get('offsetLength'))
      ;
  },
};
