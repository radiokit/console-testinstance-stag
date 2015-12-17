import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';


export default React.createClass({
  propTypes: {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    contentPrefix: React.PropTypes.string,
  },


  getInitialState: function() {
    return {
      errors: {},
    }
  },


  submit: function() {
    if(this.validate()) {
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

      let required = this.isFieldRequired(fieldConfig);

      if(required && this.refs[fieldName].value.trim() === "") {
        if(errors.hasOwnProperty(fieldName)) {
          errors[fieldName].push("presence");
        } else {
          errors[fieldName] = [ "presence" ];
        }
      }
    });

    if(Object.keys(errors).length === 0) {
      return true;

    } else {
      this.setState({ errors: errors });
      return false;
    }
  },


  buildFieldValues: function() {
    let values = {};

    Object.keys(this.props.form).map((fieldName) => {
      values[fieldName] = this.refs[fieldName].value
    });

    return values;
  },


  onFormSubmit: function(e) {
    e.preventDefault();
    this.submit();
  },


  renderForm: function() {
    return Object.keys(this.props.form).map((fieldName) => {
      let fieldConfig = this.props.form[fieldName];
      let input;
      let hint;
      let required = this.isFieldRequired(fieldConfig);


      switch(fieldConfig.type) {
        case "string":
          input = (<input className="form-control" type="text" id={fieldName} ref={fieldName} required={required} />);
          break;

        case "number":
          input = (<input className="form-control" type="number" id={fieldName} ref={fieldName} required={required} />);
          break;

        case "tel":
          input = (<input className="form-control" type="tel" id={fieldName} ref={fieldName} required={required} />);
          break;

        case "email":
          input = (<input className="form-control" type="email" id={fieldName} ref={fieldName} required={required} />);
          break;

        case "enum":
          input = (
            <select className="form-control" id={fieldName} ref={fieldName} required={required}>
            {fieldConfig.values.map((value) => {
              return (<Translate key={value} value={value} component="option" content={`${this.props.contentPrefix}.${fieldName}.values.${value}`}/>);
            })}
            </select>
          );
          break;

        default:
          throw new Error("Unknown input type '" + fieldConfig.type + "'");
      }

      if(fieldConfig.hint) {
        hint = Counterpart.translate(`${this.props.contentPrefix}.${fieldName}.hint`);
      }

      if(required) {
        if(hint) {
          hint = hint + " " + Counterpart.translate("widgets.admin.form.hints.required");
        } else {
          hint = Counterpart.translate("widgets.admin.form.hints.required");
        }
      }

      if(hint) {
        hint = (<p className="help-block">{hint}</p>);
      }

      let formGroupKlass;
      formGroupKlass = "form-group has-error";
      if(this.state.errors.hasOwnProperty(fieldName)) {
        formGroupKlass = "form-group has-error";
      } else {
        formGroupKlass = "form-group";
      }

      return (
        <div key={fieldName} className={formGroupKlass}>
          <Translate htmlFor={fieldName} component="label" content={`${this.props.contentPrefix}.${fieldName}.label`}/>
          {input}
          {hint}
        </div>
      );
    });
  },



  render: function() {
    return (
      <form className="form" role="form" ref="form" onSubmit={this.onFormSubmit}>
        {this.renderForm()}
      </form>
    );
  }
});
