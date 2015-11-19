import React from 'react';
import Translate from 'react-translate-component';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },


  show: function() {
    $(this.refs.modal).modal("show");
  },


  render: function() {
    return (<div ref="modal" className="modal fade in" role="dialog">
      <div className="modal-dialog">
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
