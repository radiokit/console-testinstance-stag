import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
   	return (
   	  <button className="btn btn-primary btn-lg" params={this.props.linkParams} {...this.props}>
   	    {this.props.label}
   	  </button>
   	);
  }
});