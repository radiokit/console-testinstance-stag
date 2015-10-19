import React from 'react';
import Translate from 'react-translate-component';


export default React.createClass({  
  propTypes: {
    labelTextKey: React.PropTypes.string.isRequired
  },

  render: function() {
    return (<Translate content={this.props.labelTextKey} component="button" type="submit" className="btn btn-primary" />);
  }
});