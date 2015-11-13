import React from 'react';
import Translate from 'react-translate-component';

export default React.createClass({
  propTypes: {
    repo: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    recordId: React.PropTypes.string.isRequired,
    attribute: React.PropTypes.string.isRequired,
    fieldType: React.PropTypes.string.isRequired,
    labelContent: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return { fieldType: "text" };
  },

  getInitialState: function() {
    return { updateState: "idle" };
  },

  getCurrentValue: function() {
    return this.refs.input.value;
  },

  setUpdateTimeout: function() {
    this.setState({ updateState: "idle" });
    this.clearUpdateTimeout();
    this.updateObserverTimeout = setTimeout(this.onInputChangeDelayed, 500);
  },

  clearUpdateTimeout: function() {
    if(this.updateObserverTimeout != null) {
      clearTimeout(this.updateObserverTimeout);
      this.updateObserverTimeout = null;
    }
  },

  onInputChange: function(event) {
    this.setUpdateTimeout();
  },

  onDataRequestLoading: function() {
    this.setState({ updateState: "saving" });
  },

  onDataRequestLoaded: function() {
    this.setState({ updateState: "ok" });
  },

  onDataRequestWarning: function() {
    this.setState({ updateState: "warning" });
  },

  onDataRequestError: function() {
    this.setState({ updateState: "error" });
  },

  onDataRequestAbort: function() {
    this.setState({ updateState: "idle" });
  },

  onInputChangeDelayed: function() {
    var currentValue = this.getCurrentValue();
    if(this.previousValue != currentValue) {
      if(this.props.attribute.indexOf("password") != -1 || this.props.attribute.indexOf("token") != -1) {
        var currentValueFiltered = "[**FILTERED**]";
      } else {
        var currentValueFiltered = currentValue;
      }
      console.debug("[AutoUpdateTextFieldWidget] Field for " + this.props.model + "#" + this.props.recordId +
                    "." + this.props.attribute + " has changed value to '" + currentValueFiltered + "'");
      var updatedAttributes = {};
      updatedAttributes[this.props.attribute] = currentValue;
      this.dataRequest.update(updatedAttributes);
    }
    this.previousValue = this.getCurrentValue();
  },

  componentDidMount: function() {
    this.previousValue = this.getCurrentValue();

    this.dataRequest = window.data.record(this.props.repo, this.props.model, this.props.recordId);
    this.dataRequest.on("loading", this.onDataRequestLoading);
    this.dataRequest.on("loaded",  this.onDataRequestLoaded);
    this.dataRequest.on("error",   this.onDataRequestError);
    this.dataRequest.on("warning", this.onDataRequestWarning);
    this.dataRequest.on("abort",   this.onDataRequestAbort);

    this.clearUpdateTimeout();
  },

  componentWillUnmount: function() {
    this.clearUpdateTimeout();

    this.dataRequest.off("loading", this.onDataRequestLoading);
    this.dataRequest.off("loaded",  this.onDataRequestLoaded);
    this.dataRequest.off("error",   this.onDataRequestError);
    this.dataRequest.off("warning", this.onDataRequestWarning);
    this.dataRequest.off("abort",   this.onDataRequestAbort);
  },

  renderStateIcon: function() {
    switch(this.state.updateState) {
      case "saving":  var iconClassName = "form-control-feedback md md-import-export"; break;
      case "ok":      var iconClassName = "form-control-feedback md md-check";         break;
      case "warning": var iconClassName = "form-control-feedback md md-close";         break;
      case "error":   var iconClassName = "form-control-feedback md md-fire";          break;
    }

    if(this.state.updateState != "idle") {
      return (<span className={iconClassName} />);
    }
  },

  renderHelpBlock: function() {
    if(this.props.helpBlockContent) {
      return(<p className="help-block">{this.props.helpBlockContent}</p>);
    };
  },

  render: function() {
    var inputHtmlId = "autoupdate-input-" + this.props.model + "-" + this.props.recordId + "-" + this.props.attribute;

    switch(this.state.updateState) {
      case "idle":    var formGroupClassName = "form-group";                          break;
      case "saving":  var formGroupClassName = "form-group has-feedback";             break;
      case "ok":      var formGroupClassName = "form-group has-feedback has-success"; break;
      case "warning": var formGroupClassName = "form-group has-feedback has-warning"; break;
      case "error":   var formGroupClassName = "form-group has-feedback has-error";   break;
    }

    return (
      <div className={formGroupClassName}>
        <input {...this.props} id={inputHtmlId} ref="input" className="form-control" type={this.props.fieldType} onChange={this.onInputChange} />
        <Translate content={this.props.labelContent} component="label" htmlFor={inputHtmlId} />
        {this.renderHelpBlock()}
        {this.renderStateIcon()}
      </div>
    );
  }
});