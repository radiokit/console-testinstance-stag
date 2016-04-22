import React from 'react';

import ClipBox from './clip_box.jsx';
import Movable from '../general/movable.jsx';
import TimeMovableRegion from './time_movable_region.jsx';
import PixelMovableFadeRegion from './pixel_movable_fade_region.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

function destructRegionDiff(newRegion, oldRegion) {
  const regionStartDiff = newRegion.regionStart - oldRegion.regionStart;
  const regionLengthDiff = newRegion.regionLength - oldRegion.regionLength;

  return {
    dragStartDiff: regionLengthDiff !== 0 ? regionStartDiff : 0,
    dragEndDiff: regionStartDiff === 0 ? regionLengthDiff : 0,
    dragBlockDiff: regionLengthDiff === 0 ? regionStartDiff : 0,
  };
}

const TrackItem = React.createClass({

  propTypes: {
    offsetStart: React.PropTypes.number.isRequired,
    offsetLength: React.PropTypes.number.isRequired,

    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,

    item: React.PropTypes.object.isRequired,

    fadesOf: React.PropTypes.oneOf(['clip', 'item', null]),
    selected: React.PropTypes.bool,

    onItemModification: React.PropTypes.func,
    onClipChange: React.PropTypes.func,

    // bypasses
    onMouseDown: React.PropTypes.func,
    onClick: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      selected: false,
    };
  },

  // movable events
  onHold() {
    this.lastChangingTotalY = 0;
  },

  onMove({ x, totalY }) {
    const scale = this.props.width / this.props.offsetLength;
    const positionDiff = Math.round(x / scale);
    const trackDiff = (
      Math.floor(
        Math.abs(totalY - this.lastChangingTotalY) /
        this.props.height
      ) *
      Math.sign(totalY - this.lastChangingTotalY)
    );
    if (trackDiff !== 0) {
      this.lastChangingTotalY = totalY;
    }

    this.triggerItemModification({
      position: positionDiff,
      track: trackDiff,
    });
  },

  getItem() {
    return this.props.item;
  },

  // passing native events
  handleMouseDown(e) {
    this.props.onMouseDown && this.props.onMouseDown(e);
  },

  handleClick(e) {
    this.props.onClick && this.props.onClick(e, this.props.item);
  },

  // bubbleing changes
  triggerItemModification(mod) {
    this.props.onItemModification && this.props.onItemModification({
      offsetStart: 0, position: 0, fadeIn: 0, offsetLength: 0, fadeOut: 0, track: 0,
      ...mod,
    }, this.props.item);
  },

  triggerClipChange(newClip, oldClip) {
    this.props.onClipChange && this.props.onClipChange(newClip, oldClip);
  },

  // fade regions changes
  handleFadeInChange(newRegion, oldRegion) {
    const item = this.getItem();
    const { dragStartDiff, dragEndDiff, dragBlockDiff } = destructRegionDiff(newRegion, oldRegion);
    const offsetDiff = Math.max(
      -1 * item.get('position'),
      Math.max(
        -1 * item.get('offsetStart'),
        Math.min(
          item.get('maxOffsetLength') - item.get('offsetStart') - item.get('fadeIn'),
          dragStartDiff + dragBlockDiff
        )
      )
    );
    const fadeDiff = Math.max(
      -1 * item.get('fadeIn'),
      dragEndDiff
    );

    this.triggerItemModification({
      offsetStart: offsetDiff,
      position: offsetDiff,
      fadeIn: fadeDiff,
      offsetLength: -1 * offsetDiff,
    });
  },

  handleFadeOutChange(newRegion, oldRegion) {
    const item = this.getItem();
    const { dragStartDiff, dragEndDiff, dragBlockDiff } = destructRegionDiff(newRegion, oldRegion);
    const offsetDiff = Math.max(
      -1 * item.get('offsetLength'),
      Math.min(
        item.get('maxOffsetLength') - item.get('offsetLength') - item.get('offsetStart'),
        dragEndDiff + dragBlockDiff
      )
    );
    const fadeDiff = Math.max(
      -1 * item.get('fadeOut'),
      Math.min(
        item.get('maxOffsetLength') - item.get('offsetStart') - item.get('fadeOut'),
        -1 * dragStartDiff
      )
    );

    this.triggerItemModification({
      fadeOut: fadeDiff,
      offsetLength: offsetDiff,
    });
  },

  render() {
    const { offsetStart, offsetLength, width, height } = this.props;
    const prettyItem = this.getItem();
    const scale = width / offsetLength;

    const viewLeftOffset = prettyItem.get('position') - offsetStart;
    const viewLeftClipping = Math.max(0, -1 * viewLeftOffset);
    const viewRightClipping = Math.max(0,
      prettyItem.get('position') +
      prettyItem.get('offsetLength') -
      (offsetStart + offsetLength)
    );

    const blockHeight = height - 1;
    const blockWidth = Math.round(
      Math.max(0,
        prettyItem.get('offsetLength') - viewLeftClipping - viewRightClipping) *
      scale
    );

    const containerPositionStyle = {
      position: 'absolute', left: 0,
      top: (prettyItem.get('track') - 1) * this.props.height,
      // transition: `top 60ms ease`,
      transform: `translateX(${Math.round(Math.max(0, viewLeftOffset) * scale)}px)`,
      width: blockWidth,
      height: blockHeight,
    };

    const movablePropsStyle = uniqStyle({
      ...containerPositionStyle,
      outline: this.props.selected ? '1px solid black' : '1px solid gray',
    });

    const movableProps = {
      // normal style
      style: movablePropsStyle,
      // style to display while dragging
      holdStyle: uniqStyle({
        ...movablePropsStyle,
        zIndex: 2,
      }),
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick,
      onHold: this.onHold,
      onMove: this.onMove,
    };

    const clipBoxProps = {
      offsetStart: Math.max(0, prettyItem.get('offsetStart') + viewLeftClipping),
      offsetLength: Math.max(0,
        prettyItem.get('offsetLength') -
        viewLeftClipping -
        viewRightClipping
      ),
      width: blockWidth,
      height: blockHeight,
      clip: prettyItem.get('clip'),
      visibleFades: this.props.fadesOf === 'clip',
      onChange: this.triggerClipChange,
    };

    const fadeInProps = {
      component: PixelMovableFadeRegion,
      width: blockWidth, height: blockHeight,
      offsetStart: clipBoxProps.offsetStart, offsetLength: clipBoxProps.offsetLength,
      regionStart: prettyItem.get('offsetStart'), regionLength: prettyItem.get('fadeIn'),
      regionKey: 'fadeIn',
      onChange: this.handleFadeInChange,
    };

    const fadeOutProps = {
      ...fadeInProps,
      regionStart: (
        prettyItem.get('offsetStart') +
        prettyItem.get('offsetLength') -
        prettyItem.get('fadeOut')
      ),
      regionLength: prettyItem.get('fadeOut'),
      regionKey: 'fadeOut',
      onChange: this.handleFadeOutChange,
    };

    const fadeContainerStyle = ({
      ...containerPositionStyle,
      zIndex: 2,
      pointerEvents: 'none',
    });

    return (
      <div>
        <Movable {...movableProps}>
          <ClipBox {...clipBoxProps} />
        </Movable>
        <div style={fadeContainerStyle}>
          {this.props.fadesOf === 'item' && (<TimeMovableRegion {...fadeInProps} />)}
          {this.props.fadesOf === 'item' && (<TimeMovableRegion {...fadeOutProps} />)}
        </div>
      </div>
    );
  },
});
export default TrackItem;
