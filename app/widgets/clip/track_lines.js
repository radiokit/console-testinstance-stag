import React from 'react';

import {
  range,
} from 'lodash';

import createPropsComparator from '../../helpers/props_comparison';

const TrackLines = React.createClass({
  propTypes: {
    tracksCount: React.PropTypes.number,
    trackHeight: React.PropTypes.number,
  },

  shouldComponentUpdate: createPropsComparator(['tracksCount', 'trackHeight']),

  render() {
    const { tracksCount, trackHeight } = this.props;
    return (
      <div className="TrackList__tracks">
        {range(0, tracksCount).map(num => (
          <div className="TrackList__tracks__line"
            key={num}
            style={{ transform: `translateY(${num * trackHeight}px)` }}
          ></div>
        )) }
      </div>
    );
  },
});

export default TrackLines;
