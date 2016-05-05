import {
  List,
  Map,
} from 'immutable';

export function mergeCollections(collection1, collection2) {
  return collection1.map(c1Item => (
      collection2
        .find(c2Item => c1Item.get('id') === c2Item.get('id')) ||
      c1Item
    )
  );
}

function normalizeNumber(min, max, toFit) {
  return Math.max(min, Math.min(max, toFit));
}

function getItemMaxFadeIn(item) {
  return item.get('offsetLength') - item.get('fadeOut');
}

function getItemMaxFadeOut(item) {
  return item.get('offsetLength') - item.get('fadeIn');
}

function normalizeModificationForItem(
  item,
  { offsetStart = 0, position = 0, fadeIn = 0, offsetLength = 0, fadeOut = 0, track = 0 }
) {
  return {
    position: Math.max(
      -1 * item.get('position'),
      position
    ),
    offsetStart: normalizeNumber(
      -1 * item.get('offsetStart'),
      (
        item.get('maxOffsetLength') -
        item.get('offsetStart') -
        item.get('fadeIn') -
        item.get('fadeOut')
      ),
      offsetStart
    ),
    offsetLength: normalizeNumber(
      -1 * item.get('offsetLength') + item.get('fadeOut') + item.get('fadeIn'),
      item.get('maxOffsetLength') - item.get('offsetStart') - item.get('offsetLength'),
      offsetLength
    ),
    fadeIn: normalizeNumber(
      -1 * item.get('fadeIn'),
      getItemMaxFadeIn(item) - item.get('fadeIn'),
      fadeIn
    ),
    fadeOut: normalizeNumber(
      -1 * item.get('fadeOut'),
      getItemMaxFadeOut(item) - item.get('fadeOut'),
      fadeOut
    ),
    track: Math.max(
      -1 * item.get('track') + 1,
      track
    ),
  };
}

function normalizeModificationForCollection(items, modification) {
  let normalized = { ...modification };

  items.forEach(item => {
    normalized = normalizeModificationForItem(item, normalized);
  });

  return normalized;
}

export function applyModificationToCollection(items, modification) {
  const normalized = normalizeModificationForCollection(items, modification);
  return items
    .map(item => item
      .set('offsetStart', item.get('offsetStart', 0) + normalized.offsetStart)
      .set('position', item.get('position', 0) + normalized.position)
      .set('fadeIn', item.get('fadeIn', 0) + normalized.fadeIn)
      .set('offsetLength', item.get('offsetLength', 0) + normalized.offsetLength)
      .set('fadeOut', item.get('fadeOut', 0) + normalized.fadeOut)
      .set('track', item.get('track', 0) + normalized.track)
    );
}

export function crossfadeCollection(items) {
  let tracks = Map();

  // index by track
  items.forEach(item => {
    tracks = tracks.set(
      item.get('track'),
      tracks.get(
        item.get('track'), List()
      ).push(item)
    );
  });

  // sort track elements by position for easy neighbour detection
  const sortedTracks = tracks.map(
    track => track.sortBy(
      item => item.get('position')
    )
  );

  // modify fadeIn and fadeOut lengths of items when overlapping
  const fadedTracks = sortedTracks.map(
    track => track.reduce(
      (fadedTrack, item) => {
        const last = fadedTrack.last();

        if (!last) {
          return fadedTrack.push(item);
        }

        if (last.get('position') + last.get('offsetLength') <= item.get('position')) {
          // not sticking to each other
          return fadedTrack.push(item);
        }

        // sticking, crossfade
        const overlapLength = (
          last.get('position') +
          last.get('offsetLength') -
          item.get('position')
        );
        const lastItemMax = getItemMaxFadeOut(last);
        const currentItemMax = getItemMaxFadeIn(item);
        const negotiatedModification = Math.min(overlapLength, lastItemMax, currentItemMax);

        const modificatedLast = last.set('fadeOut', negotiatedModification);
        const modificatedCurrent = item.set('fadeIn', negotiatedModification);

        return fadedTrack.butLast().push(modificatedLast).push(modificatedCurrent);
      },
      List()
    )
  );

  return mergeCollections(items, fadedTracks.flatten(true));
}
