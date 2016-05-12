import React from 'react';
import MetadataInputField from './metadata_input_field.jsx';
import Counterpart from 'counterpart';
import { some } from 'lodash';

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
      customInputVals: {},
    };
  },

  componentWillReceiveProps() {
    // component needs to clear field values when file selection changes
    this.setState({
      enabledFields: [],
      customInputVals: {},
    });
  },

  submit() {
    this.refs.submitter.getDOMNode().click();
  },

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.buildFieldValues());
  },

  buildFieldValues() {
    const values = {};
    this.state.enabledFields.forEach((fieldSummary) => {
      values[fieldSummary.id] = this.state.customInputVals[fieldSummary.id];
      if (fieldSummary.type === 'datetime') {
        values[fieldSummary.id] = new Date(values[fieldSummary.id]).toISOString();
      }
    });
    return values;
  },

  render() {
    const fields = Object.keys(this.props.form).map((fieldId) => {
      const fieldConfig = this.props.form[fieldId];
      const fieldSummary = {
        id: fieldId,
        type: fieldConfig.type,
      };
      const disabled = !some(this.state.enabledFields, fieldSummary);
      const onFieldEnabled = () => {
        const enabledFields = this.state.enabledFields;
        enabledFields.push(fieldSummary);
        this.setState({ enabledFields });
      };
      const onFieldDisabled = () => {
        const newInputVals = this.state.customInputVals;
        newInputVals[fieldId] = undefined;
        this.setState({
          enabledFields: this.state.enabledFields.filter((field) => field.id !== fieldSummary.id),
          customInputVals: newInputVals,
        });
      };
      const onFieldChanged = (e) => {
        const newInputVals = this.state.customInputVals;
        newInputVals[fieldId] = e.target.value;
        this.setState({ customInputVals: newInputVals });
      };
      let inputValue = fieldConfig.hasMultiValues ? '' : fieldConfig.value;
      if (this.state.customInputVals[fieldId] !== undefined) {
        inputValue = this.state.customInputVals[fieldId];
      }
      const inputPlaceholder = fieldConfig.hasMultiValues ?
        Counterpart.translate(`${this.props.contentPrefix}.multiple_val`) : '';
      return (
        <MetadataInputField
          key = {fieldId}
          contentPrefix = {this.props.contentPrefix}
          fieldId={fieldId}
          fieldConfig={fieldConfig}
          placeholder = {inputPlaceholder}
          value = {inputValue}
          disabled = {disabled}
          onFieldEnabled ={onFieldEnabled}
          onFieldDisabled ={onFieldDisabled}
          onFieldChanged ={onFieldChanged}
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
