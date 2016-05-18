import React from 'react';

const AutoDJShuffleInput = React.createClass({
  propTypes: {
    tags: React.PropTypes.array,
    // Map{ tag, ratio }
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  render() {
    const {
      tag = null,
      ratio = 1,
    } = this.props.value.toObject();

    return (
      <div>
        <input type="text" value={tag.get('name')} />
        <input type="range" value={ratio} min="0" max="1" step="0.01" />
        {ratio * 100}%
      </div>
    );
  },
});

export default AutoDJShuffleInput;
