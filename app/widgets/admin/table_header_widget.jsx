import React from 'react';
import Translate from 'react-translate-component';


export default React.createClass({  
  propTypes: {
    attributes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    contentPrefix: React.PropTypes.string.isRequired
  },

  render: function() {
    return (<thead>
      {this.props.attributes.map((attribute) => {
        return <Translate key={attribute} component="th" content={this.props.contentPrefix + ".header." + attribute} />
      })}
    </thead>);
  }
});