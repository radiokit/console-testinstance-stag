import React from 'react';

const AutoDJShuffleInput = React.createClass({
  propTypes: {
    tags: React.PropTypes.array,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  render() {
    const {
      tag = null,
      proportion = 1,
    } = this.props.value.toObject();

    return (
      <div>
        <input type="text" value={tag.get('name')} />
        <input type="range" value={proportion} min="0" max="1" step="0.01" />
        {proportion * 100}%
      </div>
    );
  },
});

export default AutoDJShuffleInput;
