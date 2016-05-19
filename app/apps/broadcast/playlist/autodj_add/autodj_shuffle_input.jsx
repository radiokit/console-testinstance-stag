import React from 'react';
import {
  Map,
} from 'immutable';
import TagPicker from './tag_picker.jsx';

import './autodj_shuffle_input.scss';

const AutoDJShuffleInput = React.createClass({
  propTypes: {
    tags: React.PropTypes.object,
    // Map{ tag, ratio }
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  triggerChange(newValue) {
    const {
      value,
      onChange = () => null,
    } = this.props;
    onChange(newValue, value);
  },

  handleTagChange(tag) {
    const {
      value = Map(),
    } = this.props;
    const newValue = value.set('tag', tag);
    this.triggerChange(newValue);
  },

  handleRatioChange(ratio) {
    const {
      value = Map(),
    } = this.props;
    const newValue = value.set('ratio', ratio);
    this.triggerChange(newValue);
  },

  handleRangeInputChange(e) {
    this.handleRatioChange(parseFloat(e.target.value) / 100);
  },

  handleRemoval(e) {
    e.preventDefault();
    this.triggerChange(null);
  },

  render() {
    const {
      tag = null,
      ratio = 1,
    } = this.props.value.toObject();

    return (
      <div className="AutoDJShuffleInput">
        <div className="AutoDJShuffleInput__tag">
          <TagPicker
            value={tag}
            onChange={this.handleTagChange}
            tags={this.props.tags}
          />
        </div>
        <div className="AutoDJShuffleInput__ratio">
          {tag && (
            <div className="AutoDJShuffleInput__ratio__input">
              <input
                type="range"
                value={ratio * 100}
                min="0"
                max="100"
                step="1"
                onChange={this.handleRangeInputChange}
              />
            </div>
          )}
          {tag && (
            <div className="AutoDJShuffleInput__ratio__value">
              {Math.round(ratio * 100)}%
            </div>
          )}
        </div>
        <div className="AutoDJShuffleInput__controls">
          <button onClick={this.handleRemoval}>x</button>
        </div>
      </div>
    );
  },
});

export default AutoDJShuffleInput;
