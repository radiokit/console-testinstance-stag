import React from 'react';
import Translate from 'react-translate-component';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(['normal', 'large']),
  },


  getDefaultProps: function() {
    return {
      size: "normal",
    }
  },


  show: function() {
    $(this.refs.modal).modal("show");
  },


  render: function() {
    let klass;
    if(this.props.size === "large") {
      klass = "modal-dialog modal-lg";
    } else {
      klass = "modal-dialog";
    }

    return (<div ref="modal" className="modal fade in" role="dialog">
      <div className={klass}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
            <Translate component="h4" content={this.props.contentPrefix + ".header"} className="modal-title" />
          </div>

          {this.props.children}

        </div>
      </div>
    </div>);
  }
});
