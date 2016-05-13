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
        <a href={this.props.value}>
          <i className="mdi mdi-file" />
        </a>
      </span>
    );
  }
});
