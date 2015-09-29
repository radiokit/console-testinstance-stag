import React from 'react';


export default React.createClass({  
  propTypes: {
    header: React.PropTypes.bool,
    headerText: React.PropTypes.string
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
    return (<section>
      <div className="section-body">
        {this.renderHeader()}
        {this.props.children}
      </div>
    </section>);
  }
});