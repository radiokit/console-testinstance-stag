import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
    attribute: React.PropTypes.string.isRequired,
  },


  render: function() {
    return (
      <span>
        <img src={this.props.value} alt="" style={{height: "24px", width: "24px"}}/>
      </span>
    );
  }
});
