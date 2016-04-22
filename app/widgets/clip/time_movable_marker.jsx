import React from 'react';

import PixelMovableMarker from './pixel_movable_marker.jsx';

const TimeMovableMarker = props => {

  const {
    color,
    position,
    onChange,
    height,
    width,
    offsetLength,
    offsetStart,
  } = props;

  const scale = offsetLength / width;
  const offset = (position - offsetStart) / scale;
  const onMove = x => {
    const newPosition = Math.round(position + x * scale);
    onChange && onChange(newPosition);
  };

  if (offset >= 0 && offset <= width) {
    return (
      <PixelMovableMarker
        color={color || 'black'}
        height={height}
        offset={offset}
        onMove={onMove}
      />
    );
  }

  // with 'null' instead
  // react is throwing exceptions
  return <noscript />;
};

TimeMovableMarker.propTypes = {
  color: React.PropTypes.string,
  onChange: React.PropTypes.func,
  position: React.PropTypes.number.isRequired,

  /* clip viewed time offset start and length */
  offsetStart: React.PropTypes.number.isRequired,
  offsetLength: React.PropTypes.number.isRequired,

  /* containers width & height */
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number,
};

export default TimeMovableMarker;
