import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    lambda: React.PropTypes.func.isRequired,
    attribute: React.PropTypes.string.isRequired,
  },


  getInitialState: function() {
    return {
      value: null,
    }
  },


  onLambdaDone: function(value) {
    if(this.isMounted()) {
      this.setState({ value: value });
    }
  },


  componentDidMount: function() {
    this.props.lambda(this.props.record, this.props.attribute, this.onLambdaDone);
  },


  render: function() {
    return (<span>{this.state.value}</span>);
  }
});
