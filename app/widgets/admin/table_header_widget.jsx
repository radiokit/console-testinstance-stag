import React from 'react';
import Translate from 'react-translate-component';



export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
    contentPrefix: React.PropTypes.string.isRequired
  },


  getDefaultProps: function() {
    return {
      actions: []
    }
  },


  render: function() {
    return (<thead>
      {Object.keys(this.props.attributes).map((attribute) => {
        return <Translate key={"cell-" + attribute} component="th" content={this.props.contentPrefix + ".header." + attribute} />
      })}
      {this.props.actions.map((action) => {
        return <th key={"action-" + action} />
      })}
    </thead>);
  }
});
