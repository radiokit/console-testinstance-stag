import React from 'react';
import {
  List,
} from 'immutable';
import TimeMovableRegion from './time_movable_region.jsx';
import PixelMovableRegion from './pixel_movable_region.jsx';
import compareProps from '../../helpers/props_comparison';
import createImmutableComparator from './create_immutable_comparator';

function getClipRegions(clip) {
  return clip.get('regions', List());
}

function isRegionFitting(clip, regionStart, regionLength) {
  return (regionStart >= 0 &&
  regionStart <= clip.get('duration') &&
  regionLength >= 0 &&
  regionLength <= clip.get('duration') - regionStart);
}

const regionColors = {
  loop: 'purple',
};

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
  ['regions'],
]);

const ClipBoxRegions = React.createClass({
  propTypes,

  shouldComponentUpdate(nextProps) {
    return (
      compareClipBoxFadesProps.call(this, nextProps) ||
      areClipsSignificantlyDifferent(this.props.clip, nextProps.clip)
    );
  },

  onChange(i, region, regionStart, regionLength) {
    if (isRegionFitting(this.props.clip, regionStart, regionLength)) {
      const updatedRegion = region.set('position', regionStart).set('duration', regionLength);
      const updatedClip = this.props.clip.setIn(['regions', i], updatedRegion);
      this.props.updateClip && this.props.updateClip(updatedClip);
    }
  },

  render() {
    const {
      clip,
      offsetStart,
      offsetLength,
      width,
      height,
    } = this.props;

    return (
      <div className="ClipBox__regions">{
        getClipRegions(clip).toArray().map((region, i) => {
          const clipMovableProps = {
            component: PixelMovableRegion,
            offsetStart,
            offsetLength,
            width,
            height,
            regionStart: region.get('position'),
            regionLength: region.get('duration'),
            regionKey: region.get('key'),
            color: regionColors[region.get('key')],
            key: `region${region.get('id')}`,
            /* eslint react/prop-types: 0 */
            onChange: ({
              regionStart,
              regionLength,
            }) => this.onChange(i, region, regionStart, regionLength),
          };
          return (<TimeMovableRegion {...clipMovableProps} />);
        })
      }</div>
    );
  },
});

export default ClipBoxRegions;
