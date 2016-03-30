import React from 'react';
import Translate from 'react-translate-component';

import ProgressBar from '../../widgets/admin/progress_bar_widget.jsx';
import Modal from '../../widgets/admin/modal_widget.jsx';
import Form from '../../widgets/admin/form_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
    proceedType: React.PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    step: React.PropTypes.oneOf(['form', 'progress', 'acknowledgement', 'cancelled', 'error']).isRequired,
    size: React.PropTypes.oneOf(['normal', 'large']),
    form: React.PropTypes.object.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
    onSuccess:React.PropTypes.func,
    onCancel: React.PropTypes.func.isRequired,
    acknowledgementElement: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]),
    record: React.PropTypes.object,
  },


  getDefaultProps: function() {
    return {
      proceedType: "primary",
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onShow: function() {
    if(this.props.onShow) {
      this.props.onShow(this);
    }
  },

  onSuccess: function(){
    this.props.onSuccess && this.props.onSuccess();
  },

  onHide: function() {
    if(this.props.onHide) {
      this.props.onHide(this);
    }
  },


  onProceed: function() {
    this.refs.form.submit();
  },


  onFormSubmit: function(fieldValues) {
    this.props.onFormSubmit(fieldValues);
  },


  onCancel: function() {
    this.props.onCancel();
  },


  render: function() {
    return (
        <Modal ref="modal" size={this.props.size} contentPrefix={this.props.contentPrefix} onShow={this.onShow} onHide={this.onHide}>
          <div className="modal-body">
            {() => {
              switch(this.props.step) {
                case "form":
                  return (
                    <Form ref="form" form={this.props.form} contentPrefix={this.props.contentPrefix + ".form"} onSubmit={this.onFormSubmit} />
                  );


                case "progress":
                  return (
                    <div style={{height: "200px"}}>
                      <Loading />
                    </div>
                  );


                case "acknowledgement":
                  return (
                    <div>
                    {() => {
                      if(this.props.acknowledgementElement) {
                        return React.createElement(this.props.acknowledgementElement, {contentPrefix: this.props.contentPrefix, record: this.props.record});

                      } else {
                        return <div>OK</div>; // FIXME <Translate component="p" className="text-center" content={this.props.contentPrefix + ".acknowledgement.info"} />;
                      }
                    }()}
                    </div>
                  );


                case "cancelled":
                  return <Translate content="general.errors.operation.cancelled.unsure" component="p" />;


                case "error":
                  return <Translate content="general.errors.communication.general" component="p" />;
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
                case "form":
                  return (
                    <div>
                      <Translate component="button" content={this.props.contentPrefix + ".action.cancel"} role="button" className="btn btn-default" data-dismiss="modal" />
                      <Translate component="button" content={this.props.contentPrefix + ".action.proceed"} role="button" className={"btn btn-" + this.props.proceedType} onClick={this.onProceed} />
                    </div>
                  );

                case "progress":
                  return (
                    <div>
                      <Translate component="button" content={this.props.contentPrefix + ".action.cancel"} role="button" className="btn btn-default" onClick={this.onCancel} />
                      <Translate component="button" content={this.props.contentPrefix + ".action.proceed"} role="button" className={"btn btn-" + this.props.proceedType} disabled={true} />
                    </div>
                  );

                case "acknowledgement":
                  return (
                    <div>
                      <Translate component="button" content={this.props.contentPrefix + ".action.close"} role="button" className={"btn btn-" + this.props.proceedType} data-dismiss="modal"  onClick={this.onSuccess}/>
                    </div>
                  );

                case "cancelled":
                  return (
                    <div>
                      <Translate component="button" content={this.props.contentPrefix + ".action.close"} role="button" className={"btn btn-" + this.props.proceedType} data-dismiss="modal" />
                    </div>
                  );


                case "error":
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
