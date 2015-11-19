import React from 'react';
import Translate from 'react-translate-component';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    onProceed: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    inProgress: React.PropTypes.bool,
    warning: React.PropTypes.oneOf(['irreversible']),
    proceedType: React.PropTypes.oneOf(['primary', 'danger']),
  },


  getDefaultProps: function() {
    return {
      proceedType: "primary",
      inProgress: false,
    }
  },


  show: function() {
    $(this.refs.modal).modal("show");
  },


  onProceed: function() {
    this.props.onProceed();
  },


  onCancel: function() {
    this.props.onCancel();
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

            <Translate component="button" content={this.props.contentPrefix + ".action.cancel"} role="button" className="btn btn-default" data-dismiss="modal" onClick={this.onCancel} />
            <Translate component="button" content={this.props.contentPrefix + ".action.proceed"} role="button" className={"btn btn-" + this.props.proceedType} onClick={this.onProceed} disabled={this.props.inProgress} />
          </div>
        </div>
      </div>
    </div>);
  }
});
