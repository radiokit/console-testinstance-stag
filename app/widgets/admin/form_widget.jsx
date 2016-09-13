import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import clone from 'clone';
import DateTimePicker from './date_time_picker.jsx';
import Input from './form_input.jsx';

import './form_widget_slider.scss';
import './form_widget.scss';
const FormWidget = React.createClass({
  propTypes: {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
  },


  contextTypes: {
    availableBroadcastChannels: React.PropTypes.object,
    availableUserAccounts: React.PropTypes.object.isRequired,
  },


  getInitialState() {
    return {
      errors: {},
      deferredFieldsData: {},
    };
  },


  submit() {
    if (this.validate()) {
      this.props.onSubmit(this.buildFieldValues());
    }
  },


  isFieldRequired(fieldConfig) {
    return fieldConfig.hasOwnProperty('validators') &&
      fieldConfig.validators.hasOwnProperty('presence') &&
      fieldConfig.validators.presence === true;
  },


  validate() {
    const errors = {};

    Object.keys(this.props.form).map((fieldName) => {
      const fieldConfig = this.props.form[fieldName];
      if (fieldConfig.type !== 'hidden') {
        const required = this.isFieldRequired(fieldConfig);

        if (required &&
          (!this.refs[fieldName].value ||
            (typeof(this.refs[fieldName].value) === 'string' &&
              this.refs[fieldName].value.trim() === ''))) {
          if (errors.hasOwnProperty(fieldName)) {
            errors[fieldName].push('presence');
          } else {
            errors[fieldName] = ['presence'];
          }
        }
      }
    });

    if (Object.keys(errors).length === 0) {
      return true;
    }

    this.setState({ errors });
    return false;
  },


  componentDidMount() {
    if (this.formHasDeferredFields()) {
      Object.keys(this.props.form).map((fieldName) => {
        const fieldConfig = this.props.form[fieldName];

        switch (fieldConfig.type) {
          case 'query':
            let query = window.data
              .query(fieldConfig.appName, fieldConfig.model)
              .select("id", "name")
              .on("fetch", (_eventName, _query, data) => {
                if(this.isMounted()) {
                  let fieldsData = clone(this.state.deferredFieldsData);
                  fieldsData[fieldName] = data;

                  this.setState({
                    deferredFieldsData: fieldsData
                  });
                }
              });

            if (typeof(fieldConfig.modifyQueryFunc) === 'function') {
              query = fieldConfig.modifyQueryFunc(query);
            }

            query.fetch();

            break;
        }
      });
    }
  },

  buildFieldValues() {
    let params = {};
    Object.keys(this.props.form).map((fieldName) => {
      const fieldConfig = this.props.form[fieldName];

      if (fieldConfig.fieldValueFunc) {
        params = fieldConfig.fieldValueFunc(params, this.refs[fieldName].value);
      } else {
        switch (fieldConfig.type) {
          case 'scope-user-account':
            if (params.hasOwnProperty('references')) {
              params.references.user_account_id = this.refs[fieldName].value;
            } else {
              params.references = {
                user_account_id: this.refs[fieldName].value,
              };
            }
            break;

          case 'scope-broadcast-channel':
            if (params.hasOwnProperty('references')) {
              params.references.broadcast_channel_id = this.refs[fieldName].value;
            } else {
              params.references = {
                broadcast_channel_id: this.refs[fieldName].value,
              };
            }
            break;

          case 'hidden':
            params[fieldName] = fieldConfig.value;
            break;

          case 'set': {
            const values = [];
            const options = this.refs[fieldName].selectedOptions;
            for (let i = 0; i < options.length; i++) {
              values.push(options[i].value);
            }
            params[fieldName] = values;
            break;
          }

          case 'datetime':
            params[fieldName] = this.refs[fieldName].getInput();
            break;

          case 'skipped':
            break;

          case 'separator':
            break;

          case 'toggle':
            break;

          case 'slider':
            params[fieldName] = parseInt(this.refs[fieldName].value, 10);
            break;

          default:
            params[fieldName] = this.refs[fieldName].value;
            break;
        }
      }
    });

    return params;
  },

  onToggleClick(fieldName, toggleFields, e) {
    const that = this;
    const targetValue = e.target.textContent;
    this.refs[fieldName].value = targetValue;

    if (toggleFields) {
      toggleFields.forEach(function(field) {
        const showHide = targetValue === 'true' ? '' : 'none';
        ReactDOM.findDOMNode(that.refs[field]).parentElement.style.display = showHide;
      });
    }
  },

  onFormSubmit(e) {
    e.preventDefault();
    this.submit();
  },


  formHasDeferredFields() {
    let hasDeferredFields = false;

    Object.keys(this.props.form).map((fieldName) => {
      const fieldConfig = this.props.form[fieldName];

      switch (fieldConfig.type) {
        case 'query':
          hasDeferredFields = true;
          break;
      }
    });

    return hasDeferredFields;
  },


  formLoadedDeferredFields() {
    let loadedDeferredFields = true;

    Object.keys(this.props.form).map((fieldName) => {
      let fieldConfig = this.props.form[fieldName];

      switch (fieldConfig.type) {
        case 'query':
          if(!this.state.deferredFieldsData.hasOwnProperty(fieldName)) {
            loadedDeferredFields = false;
          }
          break;
      }
    });

    return loadedDeferredFields;
  },

  onSliderChange(e) {
    const fieldName = e.target.name;
    const valueField = document.getElementById(`${fieldName}_id`);

    valueField.value = e.target.value;
  },

  renderForm() {
    let fields = Object.keys(this.props.form).map((fieldName) => {
      let fieldConfig = this.props.form[fieldName];
      let input;
      let hint;
      let required = this.isFieldRequired(fieldConfig);
      let defaultVal = fieldConfig.value;
      let disabled = fieldConfig.disabled;
      let display = fieldConfig.visibility;

      switch (fieldConfig.type) {
        case "string":
          input = (<Input className="form-control" type="text" id={ fieldName } ref={ fieldName } required={ required } value={ defaultVal } disabled={ disabled } />);
          break;

        case "number":
          const minValue = fieldConfig.minValue;
          const maxValue = fieldConfig.maxValue;

          input = (<input className="form-control" type="number" id={ fieldName } ref={ fieldName } required={ required } min={ minValue } max={ maxValue } dafaultValue={ defaultVal }/>);
          break;

        case "decimal":
          input = (<input className="form-control" type="number" step="0.01" id={ fieldName } ref={ fieldName } required={ required } />);
          break;

        case "password":
          input = (<input className="form-control" type="password" id={ fieldName } ref={ fieldName } required={ required } />);
          break;

        case "tel":
          input = (<input className="form-control" type="tel" id={ fieldName } ref={ fieldName } required={ required } />);
          break;

        case "email":
          input = (<input className="form-control" type="email" id={ fieldName } ref={ fieldName } required={ required } />);
          break;

        case 'set':
          if(Array.isArray(fieldConfig.values)) {
            let setValuesSorted;
            if (!fieldConfig.hasOwnProperty("sorted") || fieldConfig.sorted === false) {
              setValuesSorted = fieldConfig.values.sort((a, b) => {
                let translatedA = Counterpart.translate(`${this.props.contentPrefix}.${fieldName}.values.${a}`);
                let translatedB = Counterpart.translate(`${this.props.contentPrefix}.${fieldName}.values.${b}`);
                return translatedA == translatedB ? 0 : (translatedA < translatedB ? -1 : 1);
              });
            } else {
              setValuesSorted = fieldConfig.values;
            }

            input = (
              <select className="form-control" id={ fieldName } ref={ fieldName } required={ required } multiple>
                { setValuesSorted.map((value) => {
                    return (<Translate key={ value } value={ value } component="option" content={ `${this.props.contentPrefix}.${fieldName}.values.${value}` } />);
                  }) }
              </select>
            );

          } else {
            input = (
              <select className="form-control" id={ fieldName } ref={ fieldName } required={ required } multiple>
                { Object.keys(fieldConfig.values).map((key) => {
                    let value = fieldConfig.values[key];
                    return (<option key={ key } value={ key }>{value}</option>);
                  }) }
              </select>
            );
          }

          break;

        case "enum":
          let enumValuesSorted;
          if (!fieldConfig.hasOwnProperty("sorted") || fieldConfig.sorted === false) {
            enumValuesSorted = fieldConfig.values.sort((a, b) => {
              let translatedA = Counterpart.translate(`${this.props.contentPrefix}.${fieldName}.values.${a}`);
              let translatedB = Counterpart.translate(`${this.props.contentPrefix}.${fieldName}.values.${b}`);
              return translatedA == translatedB ? 0 : (translatedA < translatedB ? -1 : 1);
            });
          } else {
            enumValuesSorted = fieldConfig.values;
          }

          input = (
            <select className="form-control" id={ fieldName } ref={ fieldName } required={ required }>
              { enumValuesSorted.map((value) => {
                  return (<Translate key={ value } value={ value } component="option" content={ `${this.props.contentPrefix}.${fieldName}.values.${value}` } />);
                }) }
            </select>
          );
          break;

        case 'query':
          input = (
            <select className="form-control" id={ fieldName } ref={ fieldName } required={ required }>
              { this.state.deferredFieldsData[fieldName].map((record) => {
                return (<option key={ record.get("id") } value={ record.get("id") }>
                          { record.get("name") }
                        </option>);
              })}
            </select>
          );
          break;

        case 'scope-user-account':
          input = (
            <select className="form-control" id={ fieldName } ref={ fieldName } required={ required }>
              { this.context.availableUserAccounts.map((userAccount) => {
                  return (<option key={ userAccount.get("id") } value={ userAccount.get("id") }>
                            { userAccount.get("name") }
                          </option>);
                }) }
            </select>
          );
          break;

        case "scope-broadcast-channel":
          input = (
            <select className="form-control" id={ fieldName } ref={ fieldName } required={ required }>
              { this.context.availableBroadcastChannels && this.context.availableBroadcastChannels.map((broadcastChannel) => {
                  return (<option key={ broadcastChannel.get("id") } value={ broadcastChannel.get("id") }>
                            { broadcastChannel.get("name") }
                          </option>);
                }) }
            </select>
          );
          break;

        case "object":
          let objectsSorted = fieldConfig.values.sort((a, b) => {
            return a.name == b.name ? 0 : (a.name < b.name ? -1 : 1);
          });

          input = (
            <select className="form-control" if={ fieldName } ref={ fieldName } required={ required }>
              { objectsSorted.map((value) => {
                  return (
                    <option key={value.id} value={value.id}>{value.name}</option>
                  );
                })
              }
            </select>
          );
          break;

        case "datetime":
          input = (
            <DateTimePicker ref={fieldName} required={required} defaultValue={fieldConfig.value} />
          );
          break;

        case 'hidden':
          // Render nothing
          break;

        case 'skipped':
          input = (<Input className="form-control" type="text" id={ fieldName } ref={ fieldName } required={ required } value={ defaultVal } disabled={ true }/>);
          break;

        case 'toggle':
          let toggleOptions = [];
          let optionalFields = [];
          const defaultValue = fieldConfig.value ? fieldConfig.value : '';

          for (const index in fieldConfig.toggleOptions) {
            const option = fieldConfig.toggleOptions[index];
            const className  = fieldConfig.checked === option.value ? "btn ink-reaction btn-primary active" : "btn ink-reaction btn-primary"
            const toggleFields = fieldConfig.toggleFields;

            const toggleOption = (
              <label key={index} className={className} onClick={(e) => this.onToggleClick(fieldName, toggleFields, e)}>
  							<input type="radio" name={fieldName} value={option.value} />
                {option.label}
  						</label>
            );

            toggleOptions.push(toggleOption);
          }

          input = (
            <div
              ref={ fieldName }
              className="btn-group"
              data-toggle="buttons"
              style={{ float: 'none' }}
              value={ defaultValue }
            >
              {toggleOptions}
            </div>
          );
          break;

        case 'slider':
          input = (
            <div style={{marginBottom: "10px", width: "100%", height: "15px"}}>
  					  <input name={fieldName} type="range" defaultValue={fieldConfig.value} min={fieldConfig.min} max={fieldConfig.max} style={{ cursor: "pointer", float: "left", width: "85%" }} onChange={this.onSliderChange} />
              <input type="number" id={fieldName + '_id'} ref={fieldName} defaultValue={fieldConfig.value} style={{ float: "left", width: "10%", marginLeft: "10px", position: "relative", bottom: "5px" }} />
            </div>
          );
          break;

        case 'separator':
          input = (<hr />);
          break;

        default:
          throw new Error("Unknown input type '" + fieldConfig.type + "'");
      }

      if (fieldConfig.hint) {
        hint = Counterpart.translate(`${this.props.contentPrefix}.${fieldName}.hint`);
      }

      if (required) {
        if (hint) {
          hint = hint + " " + Counterpart.translate("widgets.admin.form.hints.required");
        } else {
          hint = Counterpart.translate("widgets.admin.form.hints.required");
        }
      }

      if (hint) {
        hint = (<p className="help-block FormWidget__hint">
                  { hint }
                </p>);
      }

      let formGroupKlass;
      formGroupKlass = "form-group has-error";
      if (this.state.errors.hasOwnProperty(fieldName)) {
        formGroupKlass = "form-group has-error";
      } else {
        formGroupKlass = "form-group";
      }

      if (fieldConfig.type === 'separator') {
        return (
          <div className='separator'>
            { input }
          </div>
        );
      }

      if (fieldConfig.type !== 'hidden') {
        return (
          <div key={ fieldName } className={ formGroupKlass } style={{ display }}>
            { input }
            <Translate
              htmlFor={ fieldName }
              component="label"
              content={ `${this.props.contentPrefix}.${fieldName}.label` }
              className="FormWidget__label"
            />
            { hint }
          </div>
        );
      }
    });

    return (
      <form className="form FormWidget" role="form" ref="form" onSubmit={ this.onFormSubmit }>
        {fields}
      </form>
    );
  },


  render() {
    if (this.formHasDeferredFields()) {
      if (this.formLoadedDeferredFields()) {
        return this.renderForm();
      } else {
        return (<div>...</div>); // FIXME
      }
    } else {
      return this.renderForm();
    }
  },
});

export default FormWidget;
