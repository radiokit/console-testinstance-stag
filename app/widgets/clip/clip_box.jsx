import React from 'react';

import ImmutableComponent from '../../helpers/immutable_component';
import ClipBackground from './clip_background.jsx';
import TimeMovableMarker from './time_movable_marker.jsx';
import TimeMovableRegion from './time_movable_region.jsx';
import PixelMovableRegion from './pixel_movable_region.jsx';
import PixelMovableFadeRegion from './pixel_movable_fade_region.jsx';

const minimumClipBoxHeight = 50;

function calcHeight(height) {
  return Math.max(minimumClipBoxHeight, height);
}

function validateOffset(props, propName, componentName) {
  const reactError = React.PropTypes.number.isRequired(props, propName, componentName);
  if (reactError) {
    return reactError;
  }
  if (props[propName] < 0) {
    return new Error(`${propName} should be a positive number`);
  }
}

function validateOffsetLength(props, propName, componentName) {
  const offsetError = validateOffset(props, propName, componentName);
  if (offsetError) {
    return offsetError;
  }
  if (props.offsetStart + props.offsetLength > props.clip.get('duration')) {
    return new Error('offsetLength is too long for the clip');
  }
}

const ClipBox = React.createClass({

  ...ImmutableComponent,

  propTypes: {
    onChange: React.PropTypes.func,
    clip: React.PropTypes.object.isRequired,

    offsetStart: validateOffset,
    offsetLength: validateOffsetLength,

    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number,

    visibleFades: React.PropTypes.bool,
    visibleRegions: React.PropTypes.bool,
    visibleMarkers: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      onChange: () => null,
      height: minimumClipBoxHeight,
      visibleFades: true,
      visibleRegions: true,
      visibleMarkers: true,
    };
  },

  updateClip(newClip) {
    this.props.onChange && this.props.onChange(newClip, this.props.clip);
  },

  render() {
    const style = ({
      position: 'relative',
      display: 'block',
      width: this.props.width,
      height: calcHeight(this.props.height),
      overflow: 'hidden',
    });

    const childProps = {
      clip: this.props.clip,
      updateClip: this.updateClip,
      offsetStart: this.props.offsetStart,
      offsetLength: this.props.offsetLength,
      width: this.props.width,
      height: this.props.height,
    };

    return (
      <div className="ClipBox" style={style}>
        <ClipBackground clip={this.props.clip}
                        width={this.props.width}
                        height={style.height}
                        offsetStart={this.props.offsetStart}
                        offsetLength={this.props.offsetLength}/>
        {this.props.visibleRegions && (<ClipRegions {...childProps} />)}
        {this.props.visibleMarkers && (<ClipMarkers {...childProps} />)}
        {this.props.visibleFades && (<ClipBoxFades {...childProps} />)}
      </div>
    )
  }
});

export default ClipBox;

function isRegionFitting(clip, regionStart, regionLength) {
  return (regionStart >= 0 &&
  regionStart <= clip.get('duration') &&
  regionLength >= 0 &&
  regionLength <= clip.get('duration') - regionStart);
}

const markerColors = {
  intro: 'green',
  outro: 'orange',
  'mix-next': 'red',
};

const ClipMarkers = ({
  clip,
  updateClip,
  offsetStart,
  offsetLength,
  width,
  height,
}) => {
  return (
    <div>{
      clip.get('markers').toArray().map((marker, i) => {
        const rootProps = {
          offsetStart,
          offsetLength,
          width,
          height: calcHeight(height),
          position: marker.get('position'),
          onChange: newPosition => {
            const updatedMarker = marker.set('position', newPosition);
            const updatedClip = clip.setIn(['markers', i], updatedMarker);
            updateClip(updatedClip);
          },
          color: markerColors[marker.get('key')],
          key: 'marker' + marker.get('id'),
        };
        return <TimeMovableMarker {...rootProps} />;
      })
    }</div>
  )
};


const regionColors = {
  loop: 'purple',
};

const ClipRegions = ({
  clip,
  updateClip,
  offsetStart,
  offsetLength,
  width,
  height,
}) => {
  return (
    <div>{
      clip.get('regions').toArray().map((region, i)=> {
        const clipMovableProps = {
          component: PixelMovableRegion,
          offsetStart,
          offsetLength,
          width,
          height: calcHeight(height),

          regionStart: region.get('position'),
          regionLength: region.get('duration'),
          regionKey: region.get('key'),
          color: regionColors[region.get('key')],
          key: 'region' + region.get('id'),

          onChange: ({regionStart, regionLength}) => {
            if (isRegionFitting(clip, regionStart, regionLength)) {
              const updatedRegion = region.set('position', regionStart).set('duration', regionLength);
              const updatedClip = clip.setIn(['regions', i], updatedRegion);
              updateClip(updatedClip);
            }
          },
        };
        return (<TimeMovableRegion {...clipMovableProps} />);
      })
    }</div>
  );
};

const ClipBoxFades = ({
  clip,
  updateClip,
  offsetStart,
  offsetLength,
  width,
  height,
}) => {

  const getChangeAction = fadeName => (({regionStart, regionLength}) => {
    if (isRegionFitting(clip, regionStart, regionLength)) {
      const updatedClip = clip
        .setIn([fadeName, 'position'], regionStart)
        .setIn([fadeName, 'duration'], regionLength)
        ;
      updateClip(updatedClip);
    }
  })

  const fadeInProps = {
    component: PixelMovableFadeRegion,
    offsetStart,
    offsetLength,
    width,
    height: calcHeight(height),

    regionStart: clip.getIn(['fadeIn', 'position'], 0),
    regionLength: clip.getIn(['fadeIn', 'duration'], 0),
    regionKey: 'fadeIn',
    onChange: getChangeAction('fadeIn'),
  };
  const fadeOutProps = {
    ...fadeInProps,

    regionStart: clip.getIn(['fadeOut', 'position'], 0),
    regionLength: clip.getIn(['fadeOut', 'duration'], 0),
    regionKey: 'fadeOut',
    onChange: getChangeAction('fadeOut'),
  }
  return (
    <div>
      <TimeMovableRegion {...fadeInProps} />
      <TimeMovableRegion {...fadeOutProps} />
    </div>
  );
}
