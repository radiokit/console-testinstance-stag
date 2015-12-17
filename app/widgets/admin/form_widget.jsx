import React from 'react';
import Translate from 'react-translate-component';


export default React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func,
    formFunc: React.PropTypes.func,
    contentPrefix: React.PropTypes.string,
  },


  onSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit(e);
  },


  renderForm: function() {
    let fields = this.props.formFunc();

    return Object.keys(fields).map((fieldName) => {
      let fieldConfig = fields[fieldName];
      let input;
      let hint;
      let required = fieldConfig.hasOwnProperty("validators") && fieldConfig.validators.hasOwnProperty("presence") && fieldConfig.validators.presence === true;


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
        hint = (<Translate content={`${this.props.contentPrefix}.${fieldName}.hint`} component="p" className="help-block" />);
      }

      return (
        <div key={fieldName} className="form-group">
          <Translate htmlFor={fieldName} component="label" content={`${this.props.contentPrefix}.${fieldName}.label`}/>
          {input}
          {hint}
        </div>
      );
    });
  },


  render: function() {
    if(this.props.formFunc) {
      return (<form className="form" role="form" onSubmit={this.onSubmit}>
        {this.renderForm()}
      </form>);
    } else {
      return (<form className="form" role="form" onSubmit={this.onSubmit}>
        {this.props.children}
      </form>);
    }
  }
});
