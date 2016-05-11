import React from 'react';
import TimeMovableRegion from './time_movable_region.jsx';
import PixelMovableFadeRegion from './pixel_movable_fade_region.jsx';
import compareProps from '../../helpers/props_comparison';
import createImmutableComparator from './create_immutable_comparator';

function isRegionFitting(clip, regionStart, regionLength) {
  return (regionStart >= 0 &&
  regionStart <= clip.get('duration') &&
  regionLength >= 0 &&
  regionLength <= clip.get('duration') - regionStart);
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

const areClipsSignificantlyDifferent = createImmutableComparator([
  ['fadeIn', 'position'],
  ['fadeIn', 'duration'],
  ['fadeOut', 'position'],
  ['fadeOut', 'duration'],
]);

const ClipBoxFades = React.createClass({
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

    const getChangeAction = fadeName => ({ regionStart, regionLength }) => {
      if (isRegionFitting(this.props.clip, regionStart, regionLength)) {
        const updatedClip = this.props.clip
          .setIn([fadeName, 'position'], regionStart)
          .setIn([fadeName, 'duration'], regionLength)
          ;
        updateClip(updatedClip);
      }
    };

    const fadeInProps = {
      component: PixelMovableFadeRegion,
      offsetStart,
      offsetLength,
      width,
      height,
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
    };
    return (
      <div>
        <TimeMovableRegion {...fadeInProps} />
        <TimeMovableRegion {...fadeOutProps} />
      </div>
    );
  },
});

export default ClipBoxFades;
