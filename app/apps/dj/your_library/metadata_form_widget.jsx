import React from 'react';
import MetadataInputField from './metadata_input_field.jsx';
import MetadataTextareaField from './metadata_textarea_field.jsx';
import Counterpart from 'counterpart';

import './metadata_form_widget.scss';
const MetadataFormWidget = React.createClass({
  propTypes: {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      enabledFields: [],
      userProvidedVals: {},
    };
  },

  componentWillReceiveProps() {
    // component needs to clear field values when file selection changes
    this.setState({
      enabledFields: [],
      userProvidedVals: {},
    });
  },

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.buildFieldValues());
  },

  getFieldComponentClass(fieldType) {
    switch (fieldType) {
      case 'text':
        return MetadataTextareaField;
      default:
        return MetadataInputField;
    }
  },

  submit() {
    this.refs.submitter.getDOMNode().click();
  },

  buildFieldValues() {
    const values = {};
    const newValues = this.state.userProvidedVals;
    Object.keys(newValues).forEach((fieldId) => {
      if (this.isFieldEnabled(fieldId)) {
        values[fieldId] = newValues[fieldId];
      }
    });
    return values;
  },

  handleFieldChange(fieldId, value) {
    const newInputVals = this.state.userProvidedVals;
    newInputVals[fieldId] = value;
    this.setState({ userProvidedVals: newInputVals });
  },

  isFieldEnabled(fieldId) {
    return this.state.userProvidedVals[fieldId] !== undefined;
  },

  render() {
    const fields = Object.keys(this.props.form).map((fieldId) => {
      const fieldSummary = this.props.form[fieldId];
      const disabled = !this.isFieldEnabled(fieldId);
      const FieldComponent = this.getFieldComponentClass(fieldSummary.type);

      const modelValue = this.state.userProvidedVals[fieldId];
      const inputValue = (
        (modelValue !== undefined)
          ? modelValue
          : (
            fieldSummary.hasMultiValues
              ? ''
              : fieldSummary.value
          )
      );
      const inputPlaceholder = fieldSummary.hasMultiValues ?
        Counterpart.translate(`${this.props.contentPrefix}.multiple_val`) : '';
      return (
        <FieldComponent
          key = {fieldId}
          contentPrefix = {this.props.contentPrefix}
          fieldId={fieldId}
          fieldSummary={fieldSummary}
          placeholder = {inputPlaceholder}
          value = {inputValue}
          disabled = {disabled}
          onFieldChanged ={this.handleFieldChange}
        />
      );
    });

    return (
      <form
        className="MetadataFormWidget form"
        onSubmit={this.onSubmit}
        role="form"
        ref="form"
      >
        {fields}
      <button type="submit" ref="submitter" className="hidden" />
      </form>
    );
  },
});
export default MetadataFormWidget;
