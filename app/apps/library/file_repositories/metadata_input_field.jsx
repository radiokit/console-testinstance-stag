import React from 'react';
import Translate from 'react-translate-component';
import moment from 'moment';
import Checkbox from '../../../widgets/general/indeterminate_checkbox_widget.jsx';

const MetadataInputField = React.createClass({
  propTypes: {
    fieldSummary: React.PropTypes.object.isRequired,
    fieldId: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onFieldEnabled: React.PropTypes.func.isRequired,
    onFieldDisabled: React.PropTypes.func.isRequired,
    onFieldChanged: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    placeholder: React.PropTypes.string,
  },

  getInitialState() {
    return {
      imagePreviewUrl: null,
    };
  },

  onFieldChanged(e) {
    const value = e.target.value;
    const type = this.props.fieldSummary.type;

    if (type === 'datetime') {
      // convert local time to utc
      this.props.onFieldChanged(this.props.fieldId, moment(value).utc().toISOString());
    } else if (type === 'image') {
      const image = e.target.files[0];
      this.handleImageChange(image);
    } else {
      this.props.onFieldChanged(this.props.fieldId, value);
    }
  },

  handleImageChange(imageFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
      this.props.onFieldChanged(this.props.fieldId, reader.result);
    };
    reader.readAsDataURL(imageFile);
  },

  toggleSelection(isSelected) {
    this.props.onFieldChanged(this.props.fieldId, isSelected ? undefined : this.props.value);
  },

  render() {
    const fieldId = this.props.fieldId;
    let inputValue = this.props.value;
    let inputType = this.props.fieldSummary.type;
    let step = null;
    let min = null;
    let max = null;
    const { imagePreviewUrl } = this.state;
    switch (this.props.fieldSummary.type) {
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
        step = 1;
        inputValue = moment(inputValue).format('YYYY-MM-DDTHH:mm:ss'); // converts utc to local time
        break;
      case 'time':
        step = 1;
        break;
      case 'image':
        inputValue = '';
        inputType = 'file';
        break;
      default:
    }
    return (
      <div key={ fieldId } className="form-group">
        <div className="MetadataFormWidget__inputGroup">
          <div>
            <img src={imagePreviewUrl} role="presentation" />
          </div>
          <div className="input-group-content">
            <label
              htmlFor={ fieldId }
            >
              {this.props.fieldSummary.name}
            </label>
            <input
              type= {inputType}
              id={ fieldId }
              ref={ fieldId }
              required={ this.props.fieldSummary.required }
              disabled = { this.props.disabled }
              value={ inputValue }
              placeholder = {this.props.placeholder}
              className="form-control"
              onChange = {this.onFieldChanged}
              step = {step}
              min = {min}
              max = {max}
            />
          </div>
          <div className="MetadataFormWidget__checkbox">
            <Translate component="p" content={`${this.props.contentPrefix}.retain`} />
            <Checkbox
              checked={this.props.disabled}
              onSelected ={() => this.toggleSelection(true)}
              onDeselected ={() => this.toggleSelection(false)}
            />
          </div>
        </div>
      </div>
    );
  },
});
export default MetadataInputField;
