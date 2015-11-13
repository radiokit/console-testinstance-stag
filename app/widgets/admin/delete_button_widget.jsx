import React from 'react';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';

export default React.createClass({
  propTypes: {
    repo: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    recordId: React.PropTypes.string.isRequired,
    onSuccessFunction: React.PropTypes.func.isRequired
  },

  onDeleteClicked: function() {
    var deleteButtonDiv = $(this.refs.delete_button);
    var confirmationDiv = $(this.refs.confirmation_buttons);

    $(deleteButtonDiv).hide();
    $(confirmationDiv).show();
  },

  onDeleteConfirmed: function() {
    var self = this;

    window.data.record(this.props.repo, this.props.model, this.props.recordId)
    .on("loaded", function(eventName, record) {
      self.props.onSuccessFunction();
    }).destroy();
  },

  onDeleteCanceled: function() {
    var deleteButtonDiv = $(this.refs.delete_button);
    var confirmationDiv = $(this.refs.confirmation_buttons);

    $(deleteButtonDiv).show();
    $(confirmationDiv).hide();
  },

  render: function() {
    if(this.props.deleteButtonLabel) {
      var deleteButtonLabel = counterpart.translate(this.props.deleteButtonLabel);
    } else {
      var deleteButtonLabel = counterpart.translate("apps.widgets.delete_button_widget.default_button_label");
    }

    if(this.props.confirmationButtonLabel) {
      var confirmationButtonLabel = counterpart.translate(this.props.confirmationButtonLabel);
    } else {
      var confirmationButtonLabel = counterpart.translate("apps.widgets.delete_button_widget.default_confirmation_button_label");
    }

    if(this.props.cancelButtonLabel) {
      var cancelButtonLabel = counterpart.translate(this.props.cancelButtonLabel);
    } else {
      var cancelButtonLabel = counterpart.translate("apps.widgets.delete_button_widget.default_cancel_button_label");
    }

    if(this.props.confirmationInfoText) {
      var confirmationInfoText = counterpart.translate(this.props.confirmationInfoText);
    } else {
      var confirmationInfoText = counterpart.translate("apps.widgets.delete_button_widget.default_confirmation_info_text");
    }

    return (
      <div>
        <div ref="delete_button" className="delete-button">
          <button type="button" className="btn btn-danger btn-block" onClick={this.onDeleteClicked}>
            {deleteButtonLabel}
          </button>
        </div>

        <div ref="confirmation_buttons" className="confirmation-buttons" style={{display: "none"}}>
          <div className="confirmation-info">
            {confirmationInfoText}
          </div>

          <button type="button" className="btn btn-danger" style={{width: "49%", display: "inline", marginRight: "1%"}} onClick={this.onDeleteConfirmed}>
            {confirmationButtonLabel}
          </button>

          <button type="button" className="btn btn-primary" style={{width: "49%", display: "inline", marginLeft: "1%"}} onClick={this.onDeleteCanceled}>
            {cancelButtonLabel}
          </button>
        </div>
      </div>
    );
  }
});