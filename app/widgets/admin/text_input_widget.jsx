import React from 'react';
import Translate from 'react-translate-component';


export default React.createClass({
  propTypes: {
    label: React.PropTypes.bool,
    labelTextKey: React.PropTypes.string,
    hint: React.PropTypes.bool,
    hintTextKey: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'large']),
    autofocus: React.PropTypes.bool,
    error: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
    type: React.PropTypes.oneOf(['text', 'email', 'password']),
  },


  getDefaultProps: function() {
    return {
      label: false,
      labelTextKey: null,
      hint: false,
      hintTextKey: null,
      size: null,
      autofocus: false,
      error: false,
      type: 'text',
      disabled: false,
    };
  },


  // public
  getValue: function() {
    return this.refs.input.value;
  },


  onChange: function(e) {
    if(this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  },


  renderInput: function() {
    switch(this.props.size) {
      case "large": var klass = "form-control input-lg"; break;
      case "small": var klass = "form-control input-sm"; break;
      default:      var klass = "form-control"; break;
    }

    return (<input ref="input" type={this.props.type} className={klass} autoFocus={this.props.autofocus} tabIndex={this.props.tabIndex} onChange={this.onChange} disabled={this.props.disabled} />);
  },


  renderLabel: function() {
    if(this.props.label && this.props.labelTextKey) {
      return (<Translate content={this.props.labelTextKey} component="label" />);
    }
  },


  renderHint: function() {
    if(this.props.hint && this.props.hintTextKey) {
      return (<Translate content={this.props.hintTextKey} component="p" className="help-block" />);
    }
  },


  render: function() {
    let klass;
    if(this.props.error) {
      klass = "form-group has-error";
    } else {
      klass = "form-group";
    }

    return (
      <div className={klass}>
        {this.renderInput()}
        {this.renderLabel()}
        {this.renderHint()}
      </div>
    );
  }
});
