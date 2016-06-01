import React from 'react';
import {
  Map,
  List,
} from 'immutable';
import TagPicker from '../../../../widgets/autosuggest/tag_picker.jsx';

const EMPTY_TAG_LIST = List();
const EMPTY_VALUE = Map({ tags: EMPTY_TAG_LIST });

import './autodj_rotation_form.scss';

const AutoDJRotationForm = React.createClass({
  propTypes: {
    tags: React.PropTypes.object,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  getValue() {
    return this.props.value || EMPTY_VALUE;
  },

  getTags() {
    return this.getValue().get('tags', EMPTY_TAG_LIST);
  },

  setValue(newValue) {
    this.triggerChange(newValue, this.getValue());
  },

  setTags(newTags) {
    this.setValue(this.getValue().set('tags', newTags));
  },

  triggerChange(newValue) {
    const { onChange = () => null } = this.props;
    onChange(newValue, this.getValue());
  },

  handleTagChange(newTag, i) {
    this.setTags(
      this.getTags().set(i, newTag)
    );
  },

  handleTagCreation(newTag) {
    this.setTags(
      this.getTags().push(newTag)
    );
  },

  render() {
    return (
      <div className="AutoDJRotationForm">
        <div className="AutoDJRotationForm__tags">
          {this.getTags().toArray().map((tag, i) => (
            <div key={i}>
              <TagPicker
                value={tag}
                tags={this.props.tags}
                onChange={newTag => this.handleTagChange(newTag, i)}
              />
              <div className="AutoDJRotationForm__tags__separator">v</div>
            </div>
          ))}
          <div>
            <TagPicker
              tags={this.props.tags}
              onChange={this.handleTagCreation}
            />
          </div>
        </div>
      </div>
    );
  },
});

export default AutoDJRotationForm;
