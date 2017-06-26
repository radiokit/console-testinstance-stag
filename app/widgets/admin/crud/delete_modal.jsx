import React from 'react';
import Translate from 'react-translate-component';
import RadioKit from '../../../services/RadioKit.js';

import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';

const DeleteModal = React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    selectedRecordIds: React.PropTypes.object.isRequired,
    app: React.PropTypes.string,
    model: React.PropTypes.string,
    performFunc: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {
      index: 0,
    };
  },

  onDeleteSuccess() {
    this.setState({
      index: this.state.index + 1,
    });

    if (this.props.selectedRecordIds.count() === this.state.index) {
      this.setState({
        index: 0,
      });
    }

    this.props.afterFormAccept && this.props.afterFormAccept();
  },

  onSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  onPerform(index, recordId) {
    if(typeof(this.props.performFunc) === 'function') {
      this.props.performFunc(index, recordId); // FIXME no async/promise/error handling
      this.onDeleteSuccess();

    } else {
      RadioKit.record(this.props.app, this.props.model, recordId)
        // .on("error", this.onDeleteError) // TODO
        .on('loaded', this.onDeleteSuccess)
        .destroy();
    }
  },

  show() {
    this.setState({
      index: 0,
    });
    this.refs.modal.show();
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
        onSuccess={ this.onSuccess }
        onDismiss={ this.onDismiss }
      >
        <div>
          <Translate
            component="p"
            content={ `${this.props.contentPrefix}.message.confirmation` }
            count={ this.props.selectedRecordIds.count() }
          />
        </div>
        <div>
          <Translate
            component="p"
            content={ `${this.props.contentPrefix}.message.progress` }
          />
        </div>
        <div>
          <Translate
            component="p"
            content={ `${this.props.contentPrefix}.message.acknowledgement` }
            count={ this.props.selectedRecordIds.count() }
          />
        </div>
      </ModalForEach>
    );
  },
});

export default DeleteModal;
