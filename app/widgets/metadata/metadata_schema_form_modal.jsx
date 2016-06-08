
import React from 'react';
import ModalForm from '../admin/modal_form_widget.jsx';
import Counterpart from 'counterpart';

Counterpart.registerTranslations('en', require('./metadata_schema_form_modal.locale.en.js'));
Counterpart.registerTranslations('pl', require('./metadata_schema_form_modal.locale.pl.js'));

const MetadataSchemaFormModal = React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    acknowledgementElement: React.PropTypes.oneOfType(
      [React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]
    ),
    afterFormSubmit: React.PropTypes.func,
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {
      step: 'form',
      record: null,
    };
  },


  buildMetadataSchemasForm() {
    return {
      name: {
        type: 'string',
        hint: true,
        validators: {
          presence: true,
        },
      },
      key: {
        type: 'string',
        hint: true,
        validators: {
          presence: true,
        },
      },
      kind: {
        type: 'enum',
        values: [
          'string', 'db', 'integer', 'text', 'float', 'date',
          'time', 'datetime', 'url', 'duration', 'waveform', 'image', 'file',
        ],
        hint: false,
        validators: {
          presence: true,
        },
      },
      record_repository_id: {
        type: 'hidden',
        value: this.props.record.get('id'),
      },
    };
  },

  show() {
    this.refs.modal.show();
  },

  handleFormSubmit(fieldValues) {
    this.recordCall = window.data
      .record(this.props.app, this.props.model)
      .on('loading', () => {
        this.setState({
          step: 'progress',
        });
      })
      .on('loaded', (_event, _record, data) => {
        this.setState({
          step: 'acknowledgement',
          record: data,
        });
        if (this.props.afterFormAccept) {
          this.props.afterFormAccept();
        }
      })
      .on('warning', () => {
        this.setState({
          step: 'error',
        });
      })
      .on('error', () => {
        this.setState({
          step: 'error',
        });
      })
      .create(fieldValues);
  },

  handleSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  handleCancel() {
    if (this.recordCall) {
      this.recordCall.teardown();
    }
  },

  handleShow() {
    this.setState(this.getInitialState());
  },

  handleDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  render() {
    return (
      <ModalForm
        ref="modal"
        acknowledgementElement={ this.props.acknowledgementElement }
        contentPrefix={ '' }
        onShow={ this.handleShow }
        step={ this.state.step }
        record={ this.state.record }
        form={ this.buildMetadataSchemasForm() }
        onFormSubmit={ this.handleFormSubmit }
        onCancel={ this.handleCancel }
        onHide={ this.handleDismiss }
        onSuccess={ this.handleSuccess }
      />
    );
  },
});

export default MetadataSchemaFormModal;
