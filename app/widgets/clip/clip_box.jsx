import React from 'react';

import ImmutableComponent from '../../helpers/immutable_component';
import ClipBackground from './clip_background.jsx';
import ClipBoxFades from './clip_box_fades.jsx';
import ClipBoxRegions from './clip_box_regions.jsx';
import ClipBoxMarkers from './clip_box_markers.jsx';

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
  return null;
}

function validateOffsetLength(props, propName, componentName) {
  const offsetError = validateOffset(props, propName, componentName);
  if (offsetError) {
    return offsetError;
  }
  if (props.offsetStart + props.offsetLength > props.clip.get('duration')) {
    return new Error('offsetLength is too long for the clip');
  }
  return null;
}

const noop = () => null;

import './clip_box.scss';

const ClipBox = React.createClass({
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
      onChange: noop,
      height: minimumClipBoxHeight,
      visibleFades: true,
      visibleRegions: true,
      visibleMarkers: true,
    };
  },

  shouldComponentUpdate: ImmutableComponent.shouldComponentUpdate,

  updateClip(newClip) {
    this.props.onChange && this.props.onChange(newClip, this.props.clip);
  },

  render() {
    const {
      clip,
      offsetStart,
      offsetLength,
      visibleRegions,
      visibleMarkers,
      visibleFades,
      width,
      height,
    } = this.props;

    if (!clip && !width) {
      return null;
    }

    const rootStyle = {
      width,
      height: calcHeight(height),
    };

    const childProps = {
      clip,
      updateClip: this.updateClip,
      offsetStart,
      offsetLength,
      width,
      height: calcHeight(height),
    };

    const regionProps = (
      visibleRegions &&
      childProps
    );

    const markerProps = (
      visibleMarkers &&
      childProps
    );

    const fadesProps = (
      visibleFades &&
      childProps
    );

    return (
      <div className="ClipBox" style={rootStyle}>
        <ClipBackground
          clip={clip}
          width={width}
          height={rootStyle.height}
          offsetStart={offsetStart}
          offsetLength={offsetLength}
        />
        { regionProps && (<ClipBoxRegions {...regionProps} />) }
        { markerProps && (<ClipBoxMarkers {...markerProps} />) }
        { fadesProps && (<ClipBoxFades {...childProps} />) }
      </div>
    );
  },
});

export default ClipBox;
