import React from 'react';

import {
  Map,
  List,
} from 'immutable';

import './clip_background.scss';

const ClipBackground = props => {
  const {
    clip,
    offsetStart,
    offsetLength,
    width,
    height,
  } = props;
  const clipLength = clip.get('duration');
  const clipScale = offsetLength / clipLength;

  const imageWidth = Math.ceil(width / clipScale);

  const anyImage = clip.get('images', List()).first();
  const sufficientImage = clip.get('images', List()).find(image => image.get('width', 0) > width);

  const imageUrl = (sufficientImage || anyImage || Map()).get('url', '');

  const rootProps = {
    style: {
      position: 'relative',
      width,
      height,

      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${imageWidth + 1}px ${height}px`,
      backgroundPosition: `${Math.floor(imageWidth * (offsetStart / clipLength) * -1 - 1)}px 0`,
    },
    className: 'ClipBackground',
  };

  const vignetteStyle1 = {
    position: 'absolute',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,0.15) 100%)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  const vignetteStyle2 = {
    ...vignetteStyle1,
    background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,0) 79%,rgba(0,0,0,0.15) 100%)',
  };

  return (
    <div {...rootProps}>
      <div style={vignetteStyle1} />
      <div style={vignetteStyle2} />
    </div>
  );
};

ClipBackground.propTypes = {
  clip: React.PropTypes.object.isRequired,

  offsetStart: React.PropTypes.number.isRequired,
  offsetLength: React.PropTypes.number.isRequired,

  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};

export default ClipBackground;
