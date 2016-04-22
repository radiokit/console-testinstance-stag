import React from 'react';

import PixelMovableMarker from './pixel_movable_marker.jsx';
import PixelMovableBlock from './pixel_movable_block.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

const PixelMovableRegion = React.createClass({
  propTypes: {
    regionKey: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    height: React.PropTypes.number.isRequired,
    offset: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    onMove: React.PropTypes.func,
  },

  triggerMove(startX, endX) {
    this.props.onMove && this.props.onMove(startX, endX);
  },

  handleMarker1Move(x) {
    this.triggerMove(x, -1 * x);
  },

  handleMarker2Move(x) {
    this.triggerMove(0, x);
  },

  handleBlockMove(x) {
    this.triggerMove(x, 0);
  },

  render() {
    const { color, height, width, offset } = this.props;

    const rootStyle = ({
      position: 'absolute', top: 0, left: 0,
      transform: `translateX(${offset}px)`,
      height,
      width,
    });

    const marker1Props = {
      color,
      height,
      offset: 0,
      onMove: this.handleMarker1Move,
    };

    const marker2Props = {
      ...marker1Props,
      offset: width,
      onMove: this.handleMarker2Move,
    };

    const blockProps = {
      color,
      height,
      offset: 0,
      width,
      onMove: this.handleBlockMove,
    };

    return (
      <div style={rootStyle}>
        <PixelMovableBlock {...blockProps} />
        <PixelMovableMarker {...marker1Props} />
        <PixelMovableMarker {...marker2Props} />
      </div>
    );
  },
});

export default PixelMovableRegion;
