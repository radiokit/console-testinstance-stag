import React from 'react';
import { Link } from 'react-router';


export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    attributeName: React.PropTypes.string.isRequired,
    link: React.PropTypes.func,
  },


  contextTypes: {
    history: React.PropTypes.object
  },


  render: function() {
    if(this.props.link) {
      return (<Link to={this.props.link(this.props.context, this.props.record)}><span>{this.props.children}</span></Link>);

    } else {
      return (<span>{this.props.children}</span>);
    }
  }
});
