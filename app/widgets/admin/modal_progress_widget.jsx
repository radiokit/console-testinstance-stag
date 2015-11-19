import React from 'react';
import Translate from 'react-translate-component';

import ProgressBar from '../../widgets/admin/progress_bar_widget.jsx';
import Modal from '../../widgets/admin/modal_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    onConfirm: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    warning: React.PropTypes.oneOf(['irreversible']),
    proceedType: React.PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    progressCurrent: React.PropTypes.number,
    progressMax: React.PropTypes.number,
    step: React.PropTypes.oneOf(['confirmation', 'progress', 'acknowledgement', 'cancelled']).isRequired,
  },


  getDefaultProps: function() {
    return {
      proceedType: "primary",
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onConfirm: function() {
    this.props.onConfirm();
  },


  onCancel: function() {
    this.props.onCancel();
  },


  render: function() {
    return (
        <Modal ref="modal" contentPrefix={this.props.contentPrefix} onConfirm={this.onConfirm} onCancel={this.onCancel} warning={this.props.warning} proceedType={this.props.proceedType}>
          <div className="modal-body">
            {() => {
              switch(this.props.step) {
                case "confirmation":
                  return React.Children.toArray(this.props.children)[0];

                case "progress":
                  if(this.props.progressCurrent && this.props.progressMax) {
                    return (
                      <div>
                        {React.Children.toArray(this.props.children)[1]}
                        <ProgressBar position={this.props.progressCurrent} max={this.props.progressMax} type={this.props.proceedType} />
                      </div>
                    );

                  } else {
                    return (
                      <div>
                        {React.Children.toArray(this.props.children)[1]}
                      </div>
                    );
                  }

                case "acknowledgement":
                  if(this.props.progressCurrent && this.props.progressMax) {
                    return (
                      <div>
                        {React.Children.toArray(this.props.children)[2]}
                        <ProgressBar position={this.props.progressMax} max={this.props.progressMax} type={this.props.proceedType} />
                      </div>
                    );

                  } else {
                    return (
                      <div>
                        {React.Children.toArray(this.props.children)[2]}
                      </div>
                    );
                  }

                case "cancelled":
                  return React.Children.toArray(this.props.children)[3];
              }
            }()}
          </div>

          <div className="modal-footer">
            {() => {
              if(this.props.warning && this.props.step === "confirmation") {
                return (<Translate content={"widgets.admin.modal.warnings." + this.props.warning} className={"pull-left text-" + this.props.proceedType}  />);
              }
            }()}

            {() => {
              switch(this.props.step) {
                case "confirmation":
                  return (
                    <div>
                      <Translate component="button" content={this.props.contentPrefix + ".action.cancel"} role="button" className="btn btn-default" data-dismiss="modal" />
                      <Translate component="button" content={this.props.contentPrefix + ".action.proceed"} role="button" className={"btn btn-" + this.props.proceedType} onClick={this.onConfirm} />
                    </div>
                  );

                case "progress":
                  return (
                    <div>
                      <Translate component="button" content={this.props.contentPrefix + ".action.cancel"} role="button" className="btn btn-default" data-dismiss="modal" onClick={this.onCancel} />
                      <Translate component="button" content={this.props.contentPrefix + ".action.proceed"} role="button" className={"btn btn-" + this.props.proceedType} disabled={true} />
                    </div>
                  );

                case "acknowledgement":
                  return (
                    <div>
                      <Translate component="button" content={this.props.contentPrefix + ".action.close"} role="button" className={"btn btn-" + this.props.proceedType} data-dismiss="modal" />
                    </div>
                  );

                case "cancelled":
                  return (
                    <div>
                      <Translate component="button" content={this.props.contentPrefix + ".action.close"} role="button" className={"btn btn-" + this.props.proceedType} data-dismiss="modal" />
                    </div>
                  );
              }
            }()}
          </div>
        </Modal>
      );
    }
});
