import React from 'react';
import Translate from 'react-translate-component';
import Checkbox from '../../../widgets/general/indeterminate_checkbox_widget.jsx';

const MetadataTextareaField = React.createClass({
  propTypes: {
    fieldSummary: React.PropTypes.object.isRequired,
    fieldId: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onFieldChanged: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
  },

  componentWillReceiveProps() {
    this.setAutosize();
  },

  onFieldChanged(e) {
    this.props.onFieldChanged(this.props.fieldId, e.target.value);
  },

  setAutosize() {
    const node = this.refs[this.props.fieldId];

    node.style.height = 'auto';
    if (node.scrollHeight) {
      node.style.height = `${node.scrollHeight}px`;
    }
  },

  toggleSelection(isSelected) {
    this.props.onFieldChanged(this.props.fieldId, isSelected ? undefined : this.props.value);
  },

  render() {
    const fieldId = this.props.fieldId;

    return (
      <div key={fieldId} className="form-group">
        <div className="MetadataFormWidget__textareaGroup">
          <div className="input-group-content">
            <label
              htmlFor={fieldId}
            >
              {this.props.fieldSummary.name}
            </label>
            <textarea
              id={fieldId}
              ref={fieldId}
              required={this.props.fieldSummary.required}
              disabled={this.props.disabled}
              value={this.props.value}
              placeholder={this.props.placeholder}
              className="form-control"
              onChange={this.onFieldChanged}
            />
          </div>
          <div className="MetadataFormWidget__checkbox">
            <Translate component="p" content={`${this.props.contentPrefix}.retain`} />
            <Checkbox
              checked={this.props.disabled}
              onSelected={() => this.toggleSelection(true)}
              onDeselected={() => this.toggleSelection(false)}
            />
          </div>
        </div>
      </div>
    );
  },
});

export default MetadataTextareaField;
