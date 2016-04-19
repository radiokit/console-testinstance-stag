import React from 'react';
import Translate from 'react-translate-component';

import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';

const DeleteModal = React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    selectedRecordIds: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func
  },

  getInitialState() {
    return {
      index: 0
    }
  },

  show() {
    this.refs.modal.show();
  },

  onDeleteSuccess(record) {
    this.setState({
      index: this.state.index + 1
    });

    if(this.props.selectedRecordIds.count() === this.state.index) {
      this.setState({
        index: 0
      });
    }
  },

  onSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  onPerform(index, recordId) {
    window.data.record(this.props.app, this.props.model, recordId)
      // .on("error", this.onDeleteError) // TODO
      .on("loaded", this.onDeleteSuccess)
      .destroy();
  },

  render() {
    return (
      <ModalForEach
        ref="modal"
        onPerform={ this.onPerform }
        contentPrefix={ this.props.contentPrefix }
        warning="irreversible"
        proceedType="danger"
        recordIds={ this.props.selectedRecordIds }
        index={ this.state.index }
        onSuccess={ this.onSuccess }>
        <div>
          <Translate
            component="p"
            content={ this.props.contentPrefix + ".message.confirmation" }
            count={ this.props.selectedRecordIds.count() } />
        </div>
        <div>
          <Translate
            component="p"
            content={ this.props.contentPrefix + ".message.progress" } />
        </div>
        <div>
          <Translate
            component="p"
            content={ this.props.contentPrefix + ".message.acknowledgement" }
            count={ this.props.selectedRecordIds.count() } />
        </div>
      </ModalForEach>
    );
  }
});

export default DeleteModal;
