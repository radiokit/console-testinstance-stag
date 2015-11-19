import React from 'react';

export default React.createClass({
  propTypes: {
    position: React.PropTypes.oneOf(['left', 'right']).isRequired,
  },


  getDefaultProps: function() {
    return {
      position: "left"
    }
  },


  render: function() {
    switch(this.props.position) {
      case "left":
        return (<div className="btn-group">{this.props.children}</div>);

      case "right":
        return (<div className="btn-group pull-right">{this.props.children}</div>);
    }
  }
});
