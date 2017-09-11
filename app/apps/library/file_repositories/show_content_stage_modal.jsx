import React, { PropTypes } from 'react';
import translate from 'counterpart';
import Translate from 'react-translate-component';

import RadioKit from '../../../services/RadioKit';
import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';

const ShowContentStageModal = React.createClass({
  propTypes: {
    selectedRecordIds: PropTypes.object.isRequired,
    currentStage: PropTypes.string.isRequired,
    toStage: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      index: 0,
    };
  },

  onMoveSuccess() {
    this.setState({ index: this.state.index + 1 });
  },

  onMovePerform(index, recordId) {
    const patch = { stage: this.props.toStage };

    if (this.props.currentStage === 'trash') {
      patch.destroy_at = null;
    }

    if (patch.stage === 'trash') {
      patch.destroy_in = 1000 * 60 * 60 * 24 * 30;
    }

    RadioKit
      .record('vault', 'Data.Record.File', recordId)
      .on('loaded', this.onMoveSuccess)
      .update(patch);
  },

  show() {
    this.refs.modal.show();
  },

  renderStep(key) {
    const toStageTranslation = translate(`widgets.vault.file_browser.modals.stage.names.${this.props.toStage}`);
    const currentStageTranslation = translate(`widgets.vault.file_browser.modals.stage.names.${this.props.currentStage}`);

    return (
      <div>
        <Translate
          component="p"
          content={`widgets.vault.file_browser.modals.stage.message.${key}`}
          count={this.props.selectedRecordIds.count()}
          toStage={toStageTranslation}
          currentStage={currentStageTranslation}
        />
      </div>
    );
  },

  render() {
    return (
      <ModalForEach
        ref="modal"
        onPerform={this.onMovePerform}
        contentPrefix="widgets.vault.file_browser.modals.stage"
        recordIds={this.props.selectedRecordIds}
        onDismiss={this.props.onDismiss}
        index={this.state.index}
        proceedType="info"
      >
        {this.renderStep('confirmation')}
        {this.renderStep('acknowledgement')}
        {this.renderStep('progress')}
        {this.renderStep('cancelled')}
      </ModalForEach>
    );
  },
});

export default ShowContentStageModal;
