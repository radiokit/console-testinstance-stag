import React from 'react';

import Duration from '../general/duration_widget.jsx';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.number,
    attribute: React.PropTypes.string.isRequired,
  },


  render: function() {
    if(this.props.value) {
      return (<span><Duration duration={this.props.value} /></span>);
    } else {
      return (<span/>);
    }
  }
});
