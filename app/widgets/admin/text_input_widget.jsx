import React from 'react';
import Translate from 'react-translate-component';


export default React.createClass({  
  propTypes: {
    label: React.PropTypes.bool,
    labelTextKey: React.PropTypes.string,
    hint: React.PropTypes.bool,
    hintTextKey: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'large']),
    autofocus: React.PropTypes.bool
  },


  getDefaultProps: function() {
    return { 
      label: false, 
      labelTextKey: null, 
      hint: false, 
      hintTextKey: null, 
      size: null,
      autofocus: false
    };
  },


  // public
  getValue: function() {
    return this.refs.input.value;
  },


  renderInput: function() {
    switch(this.props.size) {
      case "large": var klass = "form-control input-lg"; break;
      case "small": var klass = "form-control input-sm"; break;
      default:      var klass = "form-control"; break;
    }

    return (<input ref="input" type="text" className={klass} autoFocus={this.props.autofocus} />);
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

    return (
      <div className="form-group">
        {this.renderInput()}
        {this.renderLabel()}
        {this.renderHint()}
      </div>
    );
  }
});