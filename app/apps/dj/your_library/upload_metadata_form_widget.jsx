import React, { PropTypes } from 'react';
// import Counterpart from 'counterpart';

import MetadataInputField from './metadata_input_field.jsx';
import MetadataTextareaField from './metadata_textarea_field.jsx';

import './metadata_form_widget.scss';
const UploadMetadataFormWidget = React.createClass({
  propTypes: {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    contentPrefix: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      userProvidedVals: {},
    };
  },

  onSubmit(e) {
    e.preventDefault();
  },

  getFieldComponentClass(fieldType) {
    switch (fieldType) {
      case 'text':
        return MetadataTextareaField;
      default:
        return MetadataInputField;
    }
  },

  handleFieldChange(fieldId, value) {
    const newInputVals = this.state.userProvidedVals;
    newInputVals[fieldId] = value;

    this.setState({ userProvidedVals: newInputVals });
  },

  submit() {

  },

  buildFieldValues() {

  },

  renderField(fieldId) {
    const fieldSummary = this.props.form[fieldId];
    const FieldComponent = this.getFieldComponentClass(fieldSummary.type);

    const modelValue = this.state.userProvidedVals[fieldId];
    const inputValue = (modelValue !== undefined) ? modelValue : fieldSummary.value || '';

    return (
      <FieldComponent
        key={fieldId}
        contentPrefix={this.props.contentPrefix}
        fieldId={fieldId}
        fieldSummary={fieldSummary}
        placeholder=""
        value={inputValue}
        disabled={false}
        selectionToggable={false}
        onFieldChanged={this.handleFieldChange}
      />
    );
  },

  render() {
    const fields = Object.keys(this.props.form).map(this.renderField);

    return (
      <form
        ref="form"
        role="form"
        className="MetadataFormWidget form"
        onSubmit={this.onSubmit}
      >
        {fields}
        <button type="submit" ref="submitter" className="hidden" />
      </form>
    );
  },
});

export default UploadMetadataFormWidget;
