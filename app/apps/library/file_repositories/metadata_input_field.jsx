import React from 'react';
import Translate from 'react-translate-component';
import Checkbox from '../../../widgets/general/indeterminate_checkbox_widget.jsx';

const MetadataInputField = React.createClass({
  propTypes: {
    fieldConfig: React.PropTypes.object.isRequired,
    fieldId: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onFieldEnabled: React.PropTypes.func.isRequired,
    onFieldDisabled: React.PropTypes.func.isRequired,
    onFieldChanged: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
  },

  render() {
    const fieldId = this.props.fieldId;
    let inputValue = this.props.value;
    let inputType = this.props.fieldConfig.type;
    let step = null;
    let min = null;
    let max = null;
    switch (this.props.fieldConfig.type) {
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
        inputValue = inputValue && inputValue.slice(-1) === 'Z' ?
          inputValue.slice(0, -1) : inputValue;
        break;
      case 'time':
        step = 1;
        break;
      default:
    }
    return (
      <div key={ fieldId } className="form-group">
        <div className="MetadataFormWidget__inputGroup">
          <div className="input-group-content">
            <label
              htmlFor={ fieldId }
            >
              {this.props.fieldConfig.name}
            </label>
            <input
              type= {inputType}
              id={ fieldId }
              ref={ fieldId }
              required={ this.props.fieldConfig.required }
              disabled = { this.props.disabled }
              value={ inputValue }
              placeholder = {this.props.placeholder}
              className="form-control"
              onChange = {this.props.onFieldChanged}
              step = {step}
              min = {min}
              max = {max}
            />
          </div>
          <div className="MetadataFormWidget__checkbox">
            <Translate component="p" content= {this.props.contentPrefix + '.retain'} />
            <Checkbox
              checked={this.props.disabled}
              onSelected ={this.props.onFieldDisabled}
              onDeselected ={this.props.onFieldEnabled}
            />
          </div>
        </div>
      </div>
    );
  },
});
export default MetadataInputField;
