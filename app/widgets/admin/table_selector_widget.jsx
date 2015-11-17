import React from 'react';

export default React.createClass({
  propTypes: {
    selected: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
  },


  getDefaultProps: function() {
    return {
      selected: false
    }
  },


  render: function() {
    return (<td className="selector"><input type="checkbox" checked={this.props.selected} onChange={(e) => { if(this.props.onSelect) { this.props.onSelect(e.target.checked); } }} /></td>);
  },
});
