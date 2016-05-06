import React from 'react';
import _ from 'lodash';
import Counterpart from 'counterpart';
import Translate from 'react-translate-component';

import Input from '../../../widgets/admin/form_input.jsx';
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
    this.setState({ enabledFields: [] });
  },

  submit() {
    this.props.onSubmit(this.buildFieldValues());
  },

  buildFieldValues() {
    const values = {};
    Object.keys(this.props.form).forEach((fieldId) => {
      if (this.state.enabledFields.includes(fieldId)) {
        values[fieldId] = this.refs[fieldId].value;
      }
    });
    return values;
  },

  onFormSubmit(e) {
    e.preventDefault();
    this.submit();
  },

  render() {
    const fields = Object.keys(this.props.form).map((fieldId) => {
      const fieldConfig = this.props.form[fieldId];
      const onFieldEnabled = () => {
        const enabledFields = this.state.enabledFields;
        enabledFields.push(fieldId);
        this.setState({ enabledFields });
      };
      const onFieldDisabled = () => {
        this.setState({ enabledFields: _.pull(this.state.enabledFields, fieldId) });
      };
      const disabled = !this.state.enabledFields.includes(fieldId);
      const inputValue = fieldConfig.hasMultiValues ? '' : fieldConfig.value;
      const inputPlaceholder = fieldConfig.hasMultiValues ? Counterpart.translate(`${this.props.contentPrefix}.multiple_val`) : '';

      return (
        <div key={ fieldId } className="form-group">
          <div className="input-group">
            <div className="input-group-content">
              <label
                htmlFor={ fieldId }
              >
                {fieldConfig.name}
              </label>
              <Input
                type= {fieldConfig.type}
                id={ fieldId }
                ref={ fieldId }
                required={ fieldConfig.required }
                disabled = { disabled }
                value={ inputValue }
                placeholder = {inputPlaceholder}
                className="form-control"
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
        role="form"
        ref="form"
        onSubmit={ this.onFormSubmit }
      >
        {fields}
      </form>
    );
  },
});
export default MetadataFormWidget;
