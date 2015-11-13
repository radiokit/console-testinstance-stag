import React from 'react';
import { Link } from 'react-router';


export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    attributeName: React.PropTypes.string.isRequired,
    linkFunc: React.PropTypes.func
  },


  render: function() {
    if(this.props.linkFunc) {
      return (<Link to={this.props.linkFunc(this.props.record)}><span>{this.props.children}</span></Link>);

    } else {
      return (<span>{this.props.children}</span>);
    }
  }
});
