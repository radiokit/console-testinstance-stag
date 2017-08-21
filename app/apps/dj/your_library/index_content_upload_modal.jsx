import React, { PropTypes } from 'react';
import Translate from 'react-translate-component';

import RadioKit from '../../../services/RadioKit';
import Modal from '../../../widgets/admin/modal_widget.jsx';
import Upload from '../../../widgets/admin/upload/upload_widget.jsx';
import MetadataFormWidget from './upload_metadata_form_widget.jsx';
import UploadDomain from '../../../services/UploadDomain';

const steps = {
  metadata: 'metadata',
  upload: 'upload',
  finished: 'finished',
};

export default React.createClass({
  propTypes: {
    contentPrefix: PropTypes.string.isRequired,
    repository: PropTypes.object.isRequired,
    metadataSchemas: PropTypes.object.isRequired,
    onDismiss: PropTypes.func,
  },

  contextTypes: {
    currentTagItemId: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      step: steps.metadata,
      formSubmitted: false,
      error: false,
      formFilled: {},
      form: this.getForm(),
    };
  },

  onFormSubmit(formFilled) {
    this.setState({
      formFilled,
      step: steps.upload,
    });
  },

  onConfirm() {
    this.refs.metadataForm.submit();
  },

  onClose() {
    this.setState(this.getInitialState(), () => {
      // clear upload queue to be able to upload new file
      UploadDomain.clear();
      this.refs.modal.hide();

      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    });
  },

  onUploadProgress(newFilesState, currentFilesState) {
    const newFileState = newFilesState.first();
    const currentFileState = currentFilesState.first();

    if (newFileState && newFileState.get('completed') && !currentFileState.get('completed')) {
      this.getRealFileId(newFileState.get('id'));
    }
  },

  onUploadFailure() {
    this.setState({ error: true, step: steps.finished });
  },

  onMetadataItemCreated(metadataSchemaId) {
    const uploadedItems = [
      ...this.state.uploadedItems,
      metadataSchemaId,
    ];

    if (uploadedItems.length === Object.keys(this.state.formFilled).length) {
      this.setState({ uploadedItems, step: steps.finished });
    }

    this.setState({ uploadedItems });
  },

  getRealFileId(clientUploadToken) {
    RadioKit
      .query('vault', 'Data.Record.File')
      .select('id')
      .where('client_upload_token', 'eq', clientUploadToken)
      .on('fetch', this.assignAuthorTagItem)
      .on('error', this.onUploadFailure)
      .fetch();
  },

  getFilteredMetadataSchemas() {
    return this.props.metadataSchemas.filter(schema => ([
      'podcast_title',
      'podcast_content',
      'podcast_description',
    ]).includes(schema.get('key')));
  },

  getForm() {
    const form = {};

    this.getFilteredMetadataSchemas().forEach((metadataSchema) => {
      const row = {
        type: metadataSchema.get('kind'),
        name: metadataSchema.get('name'),
        value: '',
        hasMultiValues: false,
        required: true,
      };

      form[metadataSchema.get('id')] = row;
    });

    return form;
  },

  assignAuthorTagItem(_event, _record, data) {
    const recordFileId = data.first().get('id');

    RadioKit
      .record('vault', 'Data.Tag.Association')
      .on('loaded', this.createMetadataItems)
      .on('error', this.onUploadFailure)
      .create({
        tag_item_id: this.context.currentTagItemId,
        record_file_id: recordFileId,
      });
  },

  createMetadataItems(_event, _record, data) {
    const recordFileId = data.get('record_file_id');

    this.setState({
      uploadedItems: [],
    }, () => {
      Object.keys(this.state.formFilled).forEach(metadataSchemaId => {
        const value = this.state.formFilled[metadataSchemaId];
        const metadataSchema = this.props.metadataSchemas.find(schema =>
          schema.get('id') === metadataSchemaId
        );
        const valueKey = `value_${metadataSchema.get('kind')}`;

        const payload = {
          record_file_id: recordFileId,
          metadata_schema_id: metadataSchemaId,
          [valueKey]: value,
        };

        RadioKit
          .record('vault', 'Data.Metadata.Item')
          .on('loaded', () => { this.onMetadataItemCreated(metadataSchemaId); })
          .create(payload);
      });
    });
  },

  renderFooter() {
    if (this.state.step === steps.metadata) {
      return (
        <div className="modal-footer">
          <Translate
            component="button"
            role="button"
            content={`${this.props.contentPrefix}.action.cancel`}
            className="btn btn-default"
            onClick={this.onClose}
          />
          <Translate
            component="button"
            role="button"
            content={`${this.props.contentPrefix}.action.upload`}
            className="btn btn-primary"
            onClick={this.onConfirm}
          />
        </div>
      );
    }

    if (this.state.step === steps.finished) {
      return (
        <div className="modal-footer">
          <Translate
            component="button"
            role="button"
            content={`${this.props.contentPrefix}.action.finish`}
            className="btn btn-primary"
            onClick={this.onClose}
          />
        </div>
      );
    }

    return null;
  },

  renderContent() {
    if (this.state.error) {
      return <Translate content="general.errors.communication.general" />;
    }

    if (this.state.step === steps.metadata) {
      return (
        <MetadataFormWidget
          ref="metadataForm"
          form={this.state.form}
          contentPrefix={`${this.props.contentPrefix}.form`}
          onSubmit={this.onFormSubmit}
        />
      );
    }

    if (this.state.step === steps.upload) {
      return (
        <Upload
          repository={this.props.repository}
          multiple={false}
          onUploadProgress={this.onUploadProgress}
        />
      );
    }

    if (this.state.step === steps.finished) {
      return <Translate content={`${this.props.contentPrefix}.finishedInfo`} />;
    }

    return null;
  },

  render() {
    return (
      <Modal
        ref="modal"
        size="large"
        contentPrefix="widgets.vault.file_browser.modals.upload"
      >
        <div className="modal-body">
          {this.renderContent()}
        </div>
        {this.renderFooter()}
      </Modal>
    );
  },
});
