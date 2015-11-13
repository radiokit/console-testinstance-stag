import React from 'react';
import Translate from 'react-translate-component';



export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
  },


  getDefaultProps: function() {
    return {
      actions: []
    }
  },


  render: function() {
    return (<thead>
      <tr>
        {Object.keys(this.props.attributes).map((attribute) => {
          if(this.props.attributes[attribute].headerText) {
            return (<th key={"cell-" + attribute}>{this.props.attributes[attribute].headerText}</th>);

          // FIXME fix determining automatic name
          // } else if(this.props.attributes[attribute].headerTextKey) {
          //   return <Translate key={"cell-" + attribute} component="th" content={this.props.attributes[attribute].headerTextKey} />

          } else {
            return (<th key={"cell-" + attribute}>{attribute}</th>);
          }
        })}

        {this.props.actions.map((action) => {
          return <th key={"action-" + action} />
        })}
      </tr>
    </thead>);
  }
});
