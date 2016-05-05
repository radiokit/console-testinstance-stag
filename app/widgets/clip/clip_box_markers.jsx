import React from 'react';
import {
  List,
} from 'immutable';
import TimeMovableMarker from './time_movable_marker.jsx';
import compareProps from '../../helpers/props_comparison';
import makeAreDifferent from './compare_immutable_structures';

const markerColors = {
  intro: 'green',
  outro: 'orange',
  'mix-next': 'red',
};

function getClipMarkers(clip) {
  return clip.get('markers', List());
}

const propTypes = {
  clip: React.PropTypes.object,
  updateClip: React.PropTypes.func,
  offsetStart: React.PropTypes.number,
  offsetLength: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

const compareClipBoxFadesProps = compareProps(Object.keys(propTypes).filter(v => v !== 'clip'));

const areClipsSignificantlyDifferent = makeAreDifferent([
  ['markers'],
]);

const ClipBoxMarkers = React.createClass({
  propTypes,

  shouldComponentUpdate(nextProps) {
    return (
      compareClipBoxFadesProps.call(this, nextProps) ||
      areClipsSignificantlyDifferent(this.props.clip, nextProps.clip)
    );
  },

  render() {
    const {
      clip,
      updateClip,
      offsetStart,
      offsetLength,
      width,
      height,
    } = this.props;
    return (
      <div>{
        getClipMarkers(clip).toArray().map((marker, i) => {
          const rootProps = {
            offsetStart,
            offsetLength,
            width,
            height,
            position: marker.get('position'),
            onChange: newPosition => {
              const updatedMarker = marker.set('position', newPosition);
              const updatedClip = this.props.clip.setIn(['markers', i], updatedMarker);
              updateClip(updatedClip);
            },
            color: markerColors[marker.get('key')],
            key: `marker${marker.get('id')}`,
          };
          return <TimeMovableMarker {...rootProps} />;
        })
      }</div>
    );
  },
});

export default ClipBoxMarkers;
