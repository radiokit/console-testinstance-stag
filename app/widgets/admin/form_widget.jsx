import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import clone from 'clone';
import Moment from 'moment';
import DateTimePicker from './date_time_picker.jsx';

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


  getInitialState: function() {
    return {
      errors: {},
      deferredFieldsData: {},
    }
  },

  // FIXME
  shouldComponentUpdate: function () {
    return false;
  },


  submit: function() {
    if (this.validate()) {
      this.props.onSubmit(this.buildFieldValues());
    }
  },


  isFieldRequired: function(fieldConfig) {
    return fieldConfig.hasOwnProperty("validators") && fieldConfig.validators.hasOwnProperty("presence") && fieldConfig.validators.presence === true;
  },


  validate: function() {
    let errors = {};

    Object.keys(this.props.form).map((fieldName) => {
      let fieldConfig = this.props.form[fieldName];
      if (fieldConfig.type !== "hidden") {
        let required = this.isFieldRequired(fieldConfig);

        if (required && this.refs[fieldName].value.trim() === "") {
          if (errors.hasOwnProperty(fieldName)) {
            errors[fieldName].push("presence");
          } else {
            errors[fieldName] = ["presence"];
          }
        }
      }
    });

    if (Object.keys(errors).length === 0) {
      return true;

    } else {
      this.setState({
        errors: errors
      });
      return false;
    }
  },


  componentDidMount: function() {
    if(this.formHasDeferredFields()) {
      Object.keys(this.props.form).map((fieldName) => {
        let fieldConfig = this.props.form[fieldName];

        switch (fieldConfig.type) {
          case "query":
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

            if(typeof(fieldConfig.modifyQueryFunc) === "function") {
              query = fieldConfig.modifyQueryFunc(query);
            }

            query.fetch();

            break;
        }
      });
    }
  },


  buildFieldValues: function() {
    let values = {};

    Object.keys(this.props.form).map((fieldName) => {
      let fieldConfig = this.props.form[fieldName];

      switch (fieldConfig.type) {
      case "scope-user-account":
        if (values.hasOwnProperty("references")) {
          values.references["user_account_id"] = this.refs[fieldName].value;
        } else {
          values.references = {
            user_account_id: this.refs[fieldName].value
          };
        }
        break;

      case "scope-broadcast-channel":
        if (values.hasOwnProperty("references")) {
          values.references["broadcast_channel_id"] = this.refs[fieldName].value;
        } else {
          values.references = {
            broadcast_channel_id: this.refs[fieldName].value
          };
        }
        break;

      case "hidden":
        values[fieldName] = fieldConfig.value;
        break;

      case "datetime":
        values[fieldName] = this.refs[fieldName].getInput();
        break;

      default:
        values[fieldName] = this.refs[fieldName].value
        break;
      }
    });

    return values;
  },


  onFormSubmit: function(e) {
    e.preventDefault();
    this.submit();
  },


  formHasDeferredFields: function() {
    let hasDeferredFields = false;

    Object.keys(this.props.form).map((fieldName) => {
      let fieldConfig = this.props.form[fieldName];

      switch (fieldConfig.type) {
        case "query":
          hasDeferredFields = true;
          break;
      }
    });

    return hasDeferredFields;
  },


  formLoadedDeferredFields: function() {
    let loadedDeferredFields = true;

    Object.keys(this.props.form).map((fieldName) => {
      let fieldConfig = this.props.form[fieldName];

      switch (fieldConfig.type) {
        case "query":
          if(!this.state.deferredFieldsData.hasOwnProperty(fieldName)) {
            loadedDeferredFields = false;
          }
          break;
      }
    });

    return loadedDeferredFields;
  },


  renderForm: function() {
    let fields = Object.keys(this.props.form).map((fieldName) => {
      let fieldConfig = this.props.form[fieldName];
      let input;
      let hint;
      let required = this.isFieldRequired(fieldConfig);
      let defaultVal = fieldConfig.value;

      switch (fieldConfig.type) {
      case "string":
        input = (<Input className="form-control" type="text" id={ fieldName } ref={ fieldName } required={ required } value={ defaultVal } />);
        break;

      case "number":
        input = (<input className="form-control" type="number" id={ fieldName } ref={ fieldName } required={ required } />);
        break;

      case "tel":
        input = (<input className="form-control" type="tel" id={ fieldName } ref={ fieldName } required={ required } />);
        break;

      case "email":
        input = (<input className="form-control" type="email" id={ fieldName } ref={ fieldName } required={ required } />);
        break;

      case "enum":
        let valuesSorted;
        if (!fieldConfig.hasOwnProperty("sorted") || fieldConfig.sorted === false) {
          valuesSorted = fieldConfig.values.sort((a, b) => {
            let translatedA = Counterpart.translate(`${this.props.contentPrefix}.${fieldName}.values.${a}`);
            let translatedB = Counterpart.translate(`${this.props.contentPrefix}.${fieldName}.values.${b}`);
            return translatedA == translatedB ? 0 : (translatedA < translatedB ? -1 : 1);
          });
        } else {
          valuesSorted = fieldConfig.values;
        }

        input = (
          <select className="form-control" id={ fieldName } ref={ fieldName } required={ required }>
            { valuesSorted.map((value) => {
                return (<Translate key={ value } value={ value } component="option" content={ `${this.props.contentPrefix}.${fieldName}.values.${value}` } />);
              }) }
          </select>
        );
        break;

      case "query":
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

      case "scope-user-account":
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

      case "hidden":
        // Render nothing
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
        hint = (<p className="help-block">
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

      if (fieldConfig.type !== "hidden") {
        return (
          <div key={ fieldName } className={ formGroupKlass }>
            <Translate htmlFor={ fieldName } component="label" content={ `${this.props.contentPrefix}.${fieldName}.label` } />
            { input }
            { hint }
          </div>
        );
      }
    });

    return (
      <form className="form" role="form" ref="form" onSubmit={ this.onFormSubmit }>
        {fields}
      </form>
    );
  },



  render: function() {
    if(this.formHasDeferredFields()) {
      if(this.formLoadedDeferredFields()) {
        return this.renderForm();
      } else {
        return (<div>...</div>); // FIXME
      }

    } else {
      return this.renderForm();
    }
  }
});

const Input = React.createClass({

  propTypes: {
    className: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
  },
  value: "",
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },

  componentWillReceiveProps: function() {
    this.value = this.props.value;
    this.setState({
      value: this.props.value
    });
  },

  onFieldChange: function(e) {
    this.value = e.target.value;
    this.setState({
      value: e.target.value
    });
  },
  render: function() {
    return <input className={ this.props.className } type={ this.props.type } id={ this.props.id } ref={ this.props.id } required={ this.props.required } value={ this.state.value }
             onChange={ this.onFieldChange } />;
  }
});

export default FormWidget;
