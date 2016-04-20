import {
  is,
  List,
  fromJS,
  Map,
} from 'immutable';

const blankImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export const ClipUtils = {
  fromRaw(raw) {
    return Map({
      raw,

      id: raw.get('id', 0),

      duration: raw.get('duration', 0),

      images: raw.get('variants', List())
        .filter(variant => variant.getIn(['schema', 'kind']) === 'waveform-image')
        .map(variant => Map({
          width: variant.getIn(['schema', 'option', 'width'], 0),
          url: variant.getIn(['public_url'], blankImage),
        })),

      markers: raw.get('metadata')
        .filter(meta => meta.getIn(['schema', 'kind']) === 'offset')
        .filter(meta => (
          meta.getIn(['schema', 'key']) !== 'fade-in' &&
          meta.getIn(['schema', 'key']) !== 'fade-out' &&
          meta.getIn(['schema', 'key']) !== 'cue-in' &&
          meta.getIn(['schema', 'key']) !== 'cue-out'
        ))
        .map(meta => Map({
          id: meta.getIn(['id']),
          key: meta.getIn(['schema', 'key']),
          position: meta.getIn(['value_offset']),
        })),

      regions: raw.get('metadata')
        .filter(meta => meta.getIn(['schema', 'kind']) === 'region')
        .map(meta => Map({
          id: meta.getIn(['id']),
          key: meta.getIn(['schema', 'key']),
          position: meta.getIn(['value_offset']),
          duration: meta.getIn(['value_duration']),
        })),

      fadeIn: Map({
        position: getClipMetas(raw, null, 'cue-in').getIn([0, 'value_offset']),
        duration: getClipMetas(raw, null, 'fade-in').getIn([0, 'value_offset']) - getClipMetas(raw, null, 'cue-in').getIn([0, 'value_offset']),
      }),

      fadeOut: Map({
        position: getClipMetas(raw, null, 'fade-out').getIn([0, 'value_offset']),
        duration: getClipMetas(raw, null, 'cue-out').getIn([0, 'value_offset']) - getClipMetas(raw, null, 'fade-out').getIn([0, 'value_offset']),
      }),
    });
  }
}

export function getClipLength(clip) {
  return clip.get('duration', 0);
}

export function getClipMetas(clip, kind, key) {
  let metas = clip.get('metadata', List());
  if (kind) {
    metas = metas.filter(info => info.getIn(['schema', 'kind']) === kind);
  }
  if (key) {
    metas = metas.filter(info => info.getIn(['schema', 'key']) === key);
  }
  return metas;
}

export function getVariantId(marker) {
  return marker.getIn(['id']);
}

export function getMetaId(marker) {
  return marker.getIn(['id']);
}

export function getVariantKey(marker) {
  return marker.getIn(['schema', 'key']);
}

export function getMetaKey(marker) {
  return marker.getIn(['schema', 'key']);
}

export function getVariantKind(marker) {
  return marker.getIn(['schema', 'kind']);
}

export function getMetaKind(marker) {
  return marker.getIn(['schema', 'kind']);
}

export function updateClipMeta(clip, oldMeta, newMeta) {
  return clip.set('metadata', clip.get('metadata').map(meta => {
    if (is(oldMeta, meta)) {
      return newMeta;
    }
    return meta;
  }));
}

/** MARKERS */

const markerKeys = List([
  'intro',
  'outro',
  'mix-next',
]);

export function getClipMarkers(clip) {
  return getClipMetas(clip, 'offset').filter(clip => markerKeys.includes(getMetaKey(clip)));
}

export function getMarkerId(marker) {
  return getMetaId(marker);
}

export function getMarkerKey(marker) {
  return getMetaKey(marker);
}

export function getMarkerPosition(marker) {
  return marker.get('value_offset', 0);
}

export function updateMarkerPosition(clip, marker, newPosition) {
  return marker.set('value_offset', Math.min(
    getClipLength(clip),
    Math.max(
      0,
      newPosition
    )
  ));
}

export function updateClipMarker(clip, oldMarker, newMarker) {
  return updateClipMeta(clip, oldMarker, newMarker);
}

/** FADES */

function getClipsFadeMetas(clip) {
  return {
    'fade-in': getClipMetas(clip, 'offset', 'fade-in').get(0, Map()),
    'cue-in': getClipMetas(clip, 'offset', 'cue-in').get(0, Map()),
    'fade-out': getClipMetas(clip, 'offset', 'fade-out').get(0, Map()),
    'cue-out': getClipMetas(clip, 'offset', 'cue-out').get(0, Map()),
  };
}

export function getClipFades(clip) {
  const metas = getClipsFadeMetas(clip);
  return Map({
    'fade-in': Map({
      offset: metas['cue-in'].get('value_offset', 0),
      length: metas['fade-in'].get('value_offset', 0) - metas['cue-in'].get('value_offset', 0),
    }),
    'fade-out': Map({
      offset: metas['fade-out'].get('value_offset', 0),
      length: metas['cue-out'].get('value_offset', 0) - metas['fade-out'].get('value_offset', 0),
    })
  })
}

export function updateClipFades(clip, fades) {
  const metas = getClipsFadeMetas(clip);
  let updatedClip = clip;
  updatedClip = updateClipMeta(
    updatedClip,
    metas['cue-in'],
    metas['cue-in'].set('value_offset', fades.getIn(['fade-in', 'offset']))
  );
  updatedClip = updateClipMeta(
    updatedClip,
    metas['fade-in'],
    metas['fade-in'].set('value_offset', fades.getIn(['fade-in', 'offset']) + fades.getIn(['fade-in', 'length']))
  );
  updatedClip = updateClipMeta(
    updatedClip,
    metas['fade-out'],
    metas['fade-out'].set('value_offset', fades.getIn(['fade-out', 'offset']))
  );
  updatedClip = updateClipMeta(
    updatedClip,
    metas['cue-out'],
    metas['cue-out'].set('value_offset', fades.getIn(['fade-out', 'offset']) + fades.getIn(['fade-out', 'length']))
  );
  return updatedClip;
}

/** REGIONS */

export function getClipRegions(clip) {
  return getClipMetas(clip, 'region');
}

export function getRegionId(region) {
  return getMetaId(region);
}

export function getRegionKey(region) {
  return getMetaKey(region);
}

export function getRegionPosition(region) {
  return {
    offset: region.get('value_offset'),
    length: region.get('value_duration'),
  };
}

export function updateRegionPosition(region, newPosition) {
  return region
    .set('value_offset', Math.max(0, newPosition.offset))
    .set('value_duration', Math.max(0, newPosition.length));
}

export function updateClipRegion(clip, oldRegion, newRegion) {
  return updateClipMeta(clip, oldRegion, newRegion);
}

/** IMAGES */

export function getClipImages(clip, widerThan = 0) {
  return clip.get('variants')
    .filter(variant => {
      return (variant.getIn(['schema', 'kind']) === 'waveform-image');
    })
    .filter(variant => {
      return (variant.getIn(['schema', 'options', 'width']) > widerThan);
    });
}
