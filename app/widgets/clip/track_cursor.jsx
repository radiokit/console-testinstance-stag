import React from 'react';
import makePropsComparison from '../../helpers/props_comparison';

import './track_cursor.scss';

const TrackCursor = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    left: React.PropTypes.number,
    opacity: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      left: 0,
      opacity: 1,
    };
  },

  shouldComponentUpdate: makePropsComparison(['left']),

  render() {
    const { left, style, opacity } = this.props;

    const rootStyle = {
      ...style,
      opacity,
      transform: `translateX(${left}px)`,
    };

    return (
      <div className="TrackCursor" style={rootStyle}>
        <div className="TrackCursor__line"></div>
        <div className="TrackCursor__top"></div>
        <div className="TrackCursor__bottom"></div>
      </div>
    );
  },
});
export default TrackCursor;
