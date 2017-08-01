import React, { PropTypes } from 'react';
import Translate from 'react-translate-component';
// import { List } from 'immutable';

import RadioKit from '../../../services/RadioKit';
import Modal from '../../../widgets/admin/modal_widget.jsx';
import Upload from '../../../widgets/admin/upload/upload_widget.jsx';
import MetadataFormWidget from './upload_metadata_form_widget.jsx';

const steps = {
  metadata: 'metadata',
  upload: 'upload',
};

export default React.createClass({
  propTypes: {
    contentPrefix: PropTypes.string.isRequired,
    repository: PropTypes.object.isRequired,
    metadataSchemas: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      step: steps.metadata,
      formSubmitted: false,
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

  onCancel() {
    this.refs.modal.hide();
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

  renderFooter() {
    return (
      <div className="modal-footer">
        <Translate
          component="button"
          role="button"
          content={`${this.props.contentPrefix}.action.cancel`}
          className="btn btn-default"
          onClick={this.onCancel}
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
  },

  renderContent() {
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
        <Upload repository={this.props.repository} multiple={false} />
      );
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
