import React from 'react';

const TimeMovableRegion = props => {
  const {
    height,
    width,
    offsetLength,
    offsetStart,
    regionStart,
    regionLength,
    regionKey,
    color,
    onChange,
    component,
  } = props;

  const scale = offsetLength / width;

  const regionOffset = regionStart / scale - offsetStart / scale;
  const regionWidth = regionLength / scale;

  const onMove = (startX, endX) => {
    const oldPosition = {
      regionStart,
      regionLength,
    };
    const newPosition = {
      regionStart: Math.round(regionStart + startX * scale),
      regionLength: Math.round(regionLength + endX * scale),
    };
    onChange && onChange(newPosition, oldPosition);
  };

  if (regionOffset + regionWidth >= 0 && regionOffset <= width) {
    const MovableRegion = component;
    return (
      <MovableRegion
        regionKey={regionKey}
        color={color}
        height={height}
        offset={regionOffset}
        width={regionWidth}
        onMove={onMove}
      />
    );
  }

  return <noscript />;
};

TimeMovableRegion.propTypes = {
  onChange: React.PropTypes.func,

  /* clip viewing start time and length */
  offsetStart: React.PropTypes.number.isRequired,
  offsetLength: React.PropTypes.number.isRequired,

  /* region start time and length */
  regionKey: React.PropTypes.string,
  regionStart: React.PropTypes.number.isRequired,
  regionLength: React.PropTypes.number.isRequired,

  /* containers width & height */
  color: React.PropTypes.string,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,

  component: React.PropTypes.any,
};

export default TimeMovableRegion;
