import React from 'react';

import PixelMovableMarker from './pixel_movable_marker.jsx';
import PixelMovableBlock from './pixel_movable_block.jsx';

const PixelMovableRegion = props => {

  const handleMove = (startX, endX) => {
    props.onMove && props.onMove(startX, endX);
  };

  const marker1Props = {
    color: props.color,
    height: props.height,
    offset: 0,
    onMove: x => handleMove(x, -1 * x),
  };
  const marker2Props = {
    ...marker1Props,
    offset: props.width,
    onMove: x => handleMove(0, x),
  }
  const blockProps = {
    color: props.color,
    height: props.height,
    offset: 0,
    width: props.width,
    onMove: x => handleMove(x, 0),
  };

  const style = {
    position: 'absolute', top: 0, left: 0,
    transform: `translateX(${props.offset}px)`,
    height: props.height,
    width: props.width,
  };

  return (
    <div style={style}>
      <PixelMovableBlock {...blockProps} />
      <PixelMovableMarker {...marker1Props} />
      <PixelMovableMarker {...marker2Props} />
    </div>
  );
}

PixelMovableRegion.propTypes = {
  regionKey: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onMove: React.PropTypes.func,
};

export default PixelMovableRegion;
