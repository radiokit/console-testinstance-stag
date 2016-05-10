import React from 'react';
import _ from 'lodash';
import Counterpart from 'counterpart';
import Translate from 'react-translate-component';
import Checkbox from '../../../widgets/general/indeterminate_checkbox_widget.jsx';

import './metadata_form_widget.scss';
const MetadataFormWidget = React.createClass({

  propTypes: {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return { enabledFields: [] };
  },

  componentWillReceiveProps() {
    this.replaceState({ enabledFields: [] });
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
      values[fieldSummary.id] = this.refs[fieldSummary.id].value;

      if (fieldSummary.type === 'datetime') {
        values[fieldSummary.id] = new Date(values[fieldSummary.id]).toISOString();
      }
    });
    return values;
  },

  render() {
    const fields = Object.keys(this.props.form).map((fieldId) => {
      const fieldConfig = this.props.form[fieldId];
      const that = this;
      const fieldSummary = {
        id: fieldId,
        type: fieldConfig.type,
      };
      const onFieldEnabled = () => {
        const enabledFields = this.state.enabledFields;
        enabledFields.push(fieldSummary);
        that.setState({ enabledFields });
      };
      const onFieldDisabled = () => {
        that.setState({
          enabledFields: that.state.enabledFields.filter((field) => field.id !== fieldSummary.id),
          [fieldId]: undefined,
        });
      };
      const inputListener = (e) => {
        that.setState({ [fieldId]: e.target.value });
      };
      const disabled = !_.some(this.state.enabledFields, fieldSummary);
      let inputValue = fieldConfig.hasMultiValues ? '' : fieldConfig.value;
      const inputPlaceholder = fieldConfig.hasMultiValues ? Counterpart.translate(`${this.props.contentPrefix}.multiple_val`) : '';
      let inputType = fieldConfig.type;
      let step = null;
      let min = null;
      let max = null;
      if (this.state[fieldId] !== undefined) {
        inputValue = this.state[fieldId];
      }
      switch (inputType) {
        case 'string':
          inputType = 'text';
          break;
        case 'db':
        case 'integer':
          inputType = 'number';
          break;
        case 'float':
          inputType = 'number';
          step = 'any';
          break;
        case 'duration':
          inputType = 'number';
          min = 0;
          break;
        case 'datetime':
          inputType = 'datetime-local';
          inputValue = inputValue && inputValue.slice(-1) === 'Z' ? inputValue.slice(0, -1) : inputValue;
          break;
        case 'time':
          step = 1;
          break;
        default:
      }
      return (
        <div key={ fieldId } className="form-group">
          <div className="input-group">
            <div className="input-group-content">
              <label
                htmlFor={ fieldId }
              >
                {fieldConfig.name}
              </label>
              <input
                type= {inputType}
                id={ fieldId }
                ref={ fieldId }
                required={ fieldConfig.required }
                disabled = { disabled }
                value={ inputValue }
                placeholder = {inputPlaceholder}
                className="form-control"
                onChange = {inputListener}
                step = {step}
                min = {min}
                max = {max}
              />
            </div>
            <div className="MetadataFormWidget__checkbox">
              <Translate component="p" content= {this.props.contentPrefix + ".retain"} />
              <Checkbox
                checked={disabled}
                onSelected ={onFieldDisabled}
                onDeselected ={onFieldEnabled}
              />
            </div>
          </div>
        </div>
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
      <button type="submit" ref="submitter" className="hidden"/>
      </form>
    );
  },
});
export default MetadataFormWidget;
