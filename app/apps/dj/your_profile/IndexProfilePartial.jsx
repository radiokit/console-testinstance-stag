import React, { PropTypes } from 'react';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

import RadioKit from '../../../services/RadioKit.js';
import Loading from '../../../widgets/general/loading_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import MetadataInputField from '../your_library/metadata_input_field.jsx';
import MetadataTextareaField from '../your_library/metadata_textarea_field.jsx';

const allowedSchemas = [
  'about',
  'facebook_url',
  'twitter_url',
  'cover',
];

export default React.createClass({
  propTypes: {
    contentPrefix: PropTypes.string.isRequired,
  },

  contextTypes: {
    currentTagItemId: PropTypes.string.isRequired,
    currentTagCategoryId: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      loaded: false,
      error: false,
      form: {},
    };
  },

  componentDidMount() {
    this.dataQuery = RadioKit
      .query('vault', 'Data.Tag.Category')
      .select(
        'id',
        'metadata_schemas.id',
        'metadata_schemas.key',
        'metadata_schemas.kind',
        'metadata_schemas.name'
      )
      .joins('metadata_schemas')
      .where('id', 'eq', this.context.currentTagCategoryId)
      .on('fetch', this.onMetadataSchemaQuerySuccess)
      .on('error', this.onQueryFailure)
      .fetch();
  },

  componentWillUnmount() {
    if (!this.state.loaded && this.dataQuery) {
      this.dataQuery.teardown();
    }
  },

  onMetadataSchemaQuerySuccess(_eventName, _record, data) {
    if (!data.size) {
      this.setState({ loaded: true, error: true });
      return;
    }
    const metadataSchemas = data.first().get('metadata_schemas');

    this.setState({ metadataSchemas }, () => {
      this.dataQuery = RadioKit
        .query('vault', 'Data.Metadata.Item')
        .select(
          'id', 'metadata_schema_id', 'value_string', 'value_text',
          'value_float', 'value_integer', 'value_date', 'value_datetime',
          'value_time', 'value_file', 'value_image', 'value_url',
        )
        .where('tag_item_id', 'eq', this.context.currentTagItemId)
        .on('fetch', this.onMetadataItemsQuerySuccess)
        .on('error', this.onQueryFailure)
        .fetch();
    });
  },

  onMetadataItemsQuerySuccess(_eventName, _record, data) {
    this.buildForm(data);
  },

  onQueryFailure() {
    this.setState({ loaded: true, error: true });
  },


  onFieldChanged(fieldId, value) {
    const form = { ...this.state.form };

    form[fieldId].value = value;

    this.setState({ form });
  },

  onFormSubmit(event) {
    event.preventDefault();

    Object.keys(this.state.form).forEach(fieldId => {
      const fieldSummary = this.state.form[fieldId];

      if (fieldSummary.metadataItemId) {
        this.updateMetadataItem(fieldSummary);
      } else {
        this.createMetadataItem(fieldSummary);
      }
    });
  },

  getFilteredMetadataSchemas() {
    return this.state.metadataSchemas.filter(schema =>
      allowedSchemas.includes(schema.get('key'))
    );
  },

  getFieldComponentClass(fieldType) {
    switch (fieldType) {
      case 'text':
        return MetadataTextareaField;
      default:
        return MetadataInputField;
    }
  },

  updateMetadataItem(formRow) {
    const metadataItem = this.state.initialData.find(item =>
      item.get('id') === formRow.metadataItemId
    );
    const metadataSchema = this.state.metadataSchemas.find(schema =>
      schema.get('id') === formRow.metadataSchemaId
    );
    const valueKey = `value_${metadataSchema.get('kind')}`;

    if (formRow.value === metadataItem.get(valueKey)) {
      return;
    }

    RadioKit
      .record('vault', 'Data.Metadata.Item', formRow.metadataItemId)
      .update({
        [valueKey]: formRow.value,
      });
  },

  createMetadataItem(formRow) {
    const metadataSchema = this.state.metadataSchemas.find(schema =>
      schema.get('id') === formRow.metadataSchemaId
    );

    const valueKey = `value_${metadataSchema.get('kind')}`;

    const payload = {
      tag_item_id: this.context.currentTagItemId,
      metadata_schema_id: formRow.metadataSchemaId,
      [valueKey]: formRow.value,
    };

    RadioKit
      .record('vault', 'Data.Metadata.Item')
      .create(payload);
  },

  buildForm(data) {
    const form = {};

    this.getFilteredMetadataSchemas().forEach(schema => {
      const schemaId = schema.get('id');
      const metadataItem = data.find(item => item.get('metadata_schema_id') === schemaId);

      const row = {
        type: schema.get('kind'),
        name: counterpart(`${this.props.contentPrefix}.form.${schema.get('key')}.label`),
        value: metadataItem ? metadataItem.get(`value_${schema.get('kind')}`, '') : '',
        metadataItemId: metadataItem && metadataItem.get('id'),
        metadataSchemaId: schemaId,
        hasMultiValues: false,
      };

      form[schemaId] = row;
    });

    this.setState({ form, loaded: true, initialData: data });
  },

  renderField(fieldId) {
    const fieldSummary = this.state.form[fieldId];
    const FieldComponent = this.getFieldComponentClass(fieldSummary.type);

    return (
      <FieldComponent
        key={fieldId}
        contentPrefix={this.props.contentPrefix}
        fieldId={fieldId}
        fieldSummary={fieldSummary}
        value={fieldSummary.value}
        disabled={false}
        selectionToggable={false}
        onFieldChanged={this.onFieldChanged}
        showSavedImage
      />
    );
  },

  renderFields() {
    return Object.keys(this.state.form).map(this.renderField);
  },

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    if (this.state.error) {
      return <Alert type="error" infoTextKey="general.errors.communication.general" />;
    }

    return (
      <form
        ref="form"
        role="form"
        form={this.state.form}
        contentPrefix={`${this.props.contentPrefix}.form`}
        onSubmit={this.onFormSubmit}
      >
        {this.renderFields()}
        <Translate
          component="button"
          type="submit"
          ref="submitter"
          className="btn btn-primary"
          content={`${this.props.contentPrefix}.form.submit`}
        />
      </form>
    );
  },
});
