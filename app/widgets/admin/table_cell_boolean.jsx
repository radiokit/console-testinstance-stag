import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.bool,
    attribute: React.PropTypes.string.isRequired,
    selectable: React.PropTypes.bool.isRequired,
  },


  getDefaultProps() {
    return {
      selectable: false,
    };
  },


  render() {
    let icon;

    if (this.props.value) {
      icon = 'checkbox-marked-circle-outline';
    } else {
      icon = 'checkbox-blank-circle-outline';
    }

    return (<span><i className={`mdi mdi-${icon}`} /></span>);
  },
});
