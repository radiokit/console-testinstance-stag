import React from 'react';
import Translate from 'react-translate-component';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    warning: React.PropTypes.oneOf(['irreversible'])
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

          <div className="modal-body">
            {this.props.children}
          </div>

          <div className="modal-footer">
            {() => {
              if(this.props.warning) {
                return (<Translate content={"widgets.admin.modal.warnings." + this.props.warning} className="pull-left text-danger"  />);
              }
            }()}

            <Translate component="button" content={this.props.contentPrefix + ".action.cancel"} role="button" className="btn btn-default" data-dismiss="modal" />
            <Translate component="button" content={this.props.contentPrefix + ".action.proceed"} role="button" className="btn btn-primary" />
          </div>
        </div>
      </div>
    </div>);
  }
});
