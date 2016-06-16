import React from 'react';
import {
  Map,
} from 'immutable';
import TagPicker from '../../../../widgets/autosuggest/tag_picker.jsx';

import './autodj_shuffle_input.scss';

const AutoDJShuffleInput = React.createClass({
  propTypes: {
    tags: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    // Map{ tag, ratio }
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    showRatio: React.PropTypes.bool,
  },
  
  getDefaultProps() {
    return {
      showRatio: true,
    };
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
    } = (this.props.value || Map()).toObject();

    return (
      <div className="AutoDJShuffleInput">
        <div className="AutoDJShuffleInput__tag">
          <TagPicker
            placeholder={this.props.placeholder}
            value={tag}
            onChange={this.handleTagChange}
            tags={this.props.tags}
          />
        </div>
        <div className="AutoDJShuffleInput__ratio">
          {tag && this.props.showRatio && (
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
          {tag && this.props.showRatio && (
            <div className="AutoDJShuffleInput__ratio__value">
              {Math.round(ratio * 100)}%
            </div>
          )}
        </div>
        <div className="AutoDJShuffleInput__controls">
          {tag && (
            <button onClick={this.handleRemoval}>x</button>
          )}
        </div>
      </div>
    );
  },
});

export default AutoDJShuffleInput;
