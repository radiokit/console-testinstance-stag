import React from 'react';


export default React.createClass({  
  render: function() {
    return (<section>
      <div className="section-body">
        {this.props.children}
      </div>
    </section>);
  }
});