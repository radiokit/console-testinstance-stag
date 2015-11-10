import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

export default React.createClass({
	propTypes: {
	  linkDest: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
	},

  render: function() {
   	return (
 	    <Link className="btn btn-primary btn-lg" to={this.props.linkDest}>
        <Translate content={this.props.label} />
      </Link>
  	);
  }
});