import React from 'react';

import AdminHelper from '../../helpers/admin_helper.js';


export default React.createClass({
  propTypes: {
    header: React.PropTypes.bool,
    headerText: React.PropTypes.string,
  },


  getDefaultProps: function() {
    return { header: false, headerText: null }
  },


  renderHeader: function() {
    if(this.props.header) {
      return (<div className="row"><div className="col-lg-12"><h1 className="text-primary">{this.props.headerText}</h1></div></div>);
    }
  },


  render: function() {
    return (<section {...this.props} onMouseOver={AdminHelper.hideMenuBar}>
      <div className="section-body">
        {this.renderHeader()}
        {this.props.children}
      </div>
    </section>);
  }
});
