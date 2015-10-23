import React from 'react';
import { Link } from 'react-router';
import Counterpart from 'counterpart';


export default React.createClass({
  propTypes: {
    path: React.PropTypes.string.isRequired,
    hintTooltipKey: React.PropTypes.string
  },


  render: function() {
    return (
      <Link className="btn btn-icon-toggle" to={this.props.path} title={(this.props.hintTooltipKey ? Counterpart.translate(this.props.hintTooltipKey) : "")}>
        <i className="mdi mdi-plus-box" />
      </Link>
    );
  }
});