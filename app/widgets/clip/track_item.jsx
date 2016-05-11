import React from 'react';
import ImmutableComponent from '../../helpers/immutable_component';
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

import './track_item.scss';
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

  shouldComponentUpdate: ImmutableComponent.shouldComponentUpdate,

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
    const item = this.getItem();
    const scale = width / offsetLength;

    const viewLeftOffset = item.get('position') - offsetStart;

    const blockHeight = height - 1;
    const blockWidth = Math.round(item.get('offsetLength') * scale);

    const containerPositionStyle = uniqStyle({
      // transition: `top 60ms ease`,
      transform: `translateX(${Math.round(viewLeftOffset * scale)}px)`,
      width: blockWidth,
      height: blockHeight,
    });
    
    const rootStyle = uniqStyle({
      top: (item.get('track') - 1) * this.props.height,
    });

    const movablePropsStyle = uniqStyle({
      ...containerPositionStyle,
      outline: this.props.selected ? '1px solid black' : '1px solid gray',
    });

    const movableProps = {
      className: 'TrackItem__element',
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
      offsetStart: item.get('offsetStart'),
      offsetLength: item.get('offsetLength'),
      width: blockWidth,
      height: blockHeight,
      clip: item.get('clip'),
      visibleFades: this.props.fadesOf === 'clip',
      onChange: this.triggerClipChange,
    };

    const fadeInProps = typeof item.get('fadeIn') === 'number'
      ? {
        component: PixelMovableFadeRegion,
        width: blockWidth,
        height: blockHeight,
        offsetStart: clipBoxProps.offsetStart,
        offsetLength: clipBoxProps.offsetLength,
        regionStart: item.get('offsetStart'),
        regionLength: item.get('fadeIn'),
        regionKey: 'fadeIn',
        onChange: this.handleFadeInChange,
      }
      : null;

    const fadeOutProps = typeof item.get('fadeIn') === 'number'
      ? {
        ...fadeInProps,
        regionStart: (
          item.get('offsetStart') +
          item.get('offsetLength') -
          item.get('fadeOut')
        ),
        regionLength: item.get('fadeOut'),
        regionKey: 'fadeOut',
        onChange: this.handleFadeOutChange,
      }
      : null;

    const fadeContProps = {
      className: 'TrackItem__fadeContainer',
      style: containerPositionStyle,
    };

    return (
      <div className="TrackItem" style={rootStyle}>
        <Movable {...movableProps}>
          <ClipBox {...clipBoxProps} />
        </Movable>
        <div {...fadeContProps}>
          {
            this.props.fadesOf === 'item' &&
            fadeInProps &&
            (<TimeMovableRegion {...fadeInProps} />)
          }
          {
            this.props.fadesOf === 'item' &&
            fadeOutProps &&
            (<TimeMovableRegion {...fadeOutProps} />)
          }
        </div>
      </div>
    );
  },
});
export default TrackItem;
