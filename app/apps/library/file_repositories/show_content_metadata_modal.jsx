import React from 'react';
import Translate from 'react-translate-component';
import { head, intersection, isEmpty, difference } from 'lodash';
import { List } from 'immutable';
import RadioKit from '../../../services/RadioKit';
import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';
import MetadataFormWidget from './metadata_form_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    metadataSchemas: React.PropTypes.object.isRequired,
    selectedRecords: React.PropTypes.object.isRequired,
    recordKey: React.PropTypes.string.isRequired,
    onDismiss: React.PropTypes.func,
  },

  getInitialState() {
    return {
      index: 0,
      formSubmitted: false,
      form: {},
      formFilled: {},
      selectedRecordIds: List(),
    };
  },

  componentWillReceiveProps(nextProps) {
    this.buildForm(nextProps.selectedRecords);
    this.setState({
      selectedRecordIds: this.props.selectedRecords.map(record => record.get('id')),
    });
  },

  getFieldTypeForSchema(schemaId) {
    return this.state.form[schemaId].type;
  },

  onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  onFormSubmit(formFilled) {
    this.setState({
      formFilled,
      formSubmitted: true,
    });
    this.refs.modal.startBatchOperation();
  },

  onConfirm() {
    if (this.state.formSubmitted === false) {
      this.refs.form.submit();
    }
  },

  onPerform(index, recordId) {
    const existingMetadataItems = this.props.selectedRecords
      .filter((record) => record.get('id') === recordId)
      .first().get('metadata_items');
    const filledMetadataSchemasIds = Object.keys(this.state.formFilled);
    const uniqueMetadataItemsIds = [];
    const uniqueMetadataItems = [];
    existingMetadataItems.forEach((metadata) => {
      if (!uniqueMetadataItemsIds.includes(metadata.get('metadata_schema_id'))) {
        uniqueMetadataItemsIds.push(metadata.get('metadata_schema_id'));
        uniqueMetadataItems.push(metadata.toJS());
      }
    });
    const allSchemasIds = this.props.metadataSchemas.map((schema) => schema.get('id')).toJS();
    const usedSchemasIds = uniqueMetadataItems.map((metadataItem) => metadataItem.metadata_schema_id);
    const updatedSchemasIds = intersection(usedSchemasIds, filledMetadataSchemasIds);
    const unusedSchemasIds = difference(allSchemasIds, usedSchemasIds);
    const newSchemasIds = intersection(unusedSchemasIds, filledMetadataSchemasIds);
    if (isEmpty(updatedSchemasIds) && isEmpty(newSchemasIds)) {
      this.finishUpdatingRecord();
    }
    this.setState({
      updatingSchemas: updatedSchemasIds.length,
      creatingSchemas: newSchemasIds.length,
    });
    // update or remove existing metadata fields for particular record
    uniqueMetadataItems.filter(
      (metadataItem) => filledMetadataSchemasIds
        .includes(metadataItem.metadata_schema_id)
    ).forEach((metadataItem) => {
      const schemaId = metadataItem.metadata_schema_id;
      const value = this.state.formFilled[schemaId];
      const valueKey = `value_${this.getFieldTypeForSchema(schemaId)}`;
      const payload = {};
      payload[valueKey] = value;
      this.updateMetadataItem(metadataItem, payload, !value || value === '');
    });
    // create new metadata item for particular record and schema
    newSchemasIds.forEach((schemaId) => {
      const value = this.state.formFilled[schemaId];
      const valueKey = `value_${this.getFieldTypeForSchema(schemaId)}`;
      const payload = {
        [this.props.recordKey]: recordId,
        metadata_schema_id: schemaId,
      };
      payload[valueKey] = value;
      this.createMetadataItem(payload);
    });
  },

  show() {
    this.refs.modal.show();
    this.setState({
      index: 0,
      formSubmitted: false,
      formFilled: {},
    });
  },

  buildForm(selectedRecords) {
    const form = {};
    this.props.metadataSchemas && this.props.metadataSchemas.forEach((metadataSchema) => {
      const multiValues = selectedRecords.map((record) => {
        const metadataItems = record.get('metadata_items') || List();
        const metadata = metadataItems
          .filter((schema) => schema.get('metadata_schema_id') === metadataSchema.get('id'))
          .first();
        return metadata ? metadata.get(`value_${metadataSchema.get('kind')}`) : '';
      }).toJS();
      const flattenedValues = multiValues.filter((val, pos) => multiValues.indexOf(val) === pos);
      const hasMultiValues = flattenedValues.length > 1;
      const value = hasMultiValues ? null : head(flattenedValues);
      const row = {
        type: metadataSchema.get('kind'),
        name: metadataSchema.get('name'),
        value,
        hasMultiValues,
      };
      form[metadataSchema.get('id')] = row;
    });
    this.setState({ form });
  },

  decrementMetadataUpdate() {
    if (this.state.updatingSchemas === 1) {
      if (this.state.creatingSchemas === 0) {
        this.finishUpdatingRecord();
      } else {
        this.setState({ updatingSchemas: 0 });
      }
    } else {
      this.setState({ updatingSchemas: this.state.updatingSchemas - 1 });
    }
  },

  updateMetadataItem(metadataItem, values, emptyValue) {
    if (emptyValue) {
      RadioKit
      .record('vault', 'Data.Metadata.Item', metadataItem.id)
      .on('loaded', () => {
        this.decrementMetadataUpdate();
      })
      .destroy();
    } else {
      RadioKit
      .record('vault', 'Data.Metadata.Item', metadataItem.id)
      .on('loaded', () => {
        this.decrementMetadataUpdate();
      })
      .update(values);
    }
  },

  createMetadataItem(fields) {
    RadioKit
    .record('vault', 'Data.Metadata.Item')
    .on('loaded', () => {
      if (this.state.creatingSchemas === 1) {
        if (this.state.updatingSchemas === 0) {
          this.finishUpdatingRecord();
        } else {
          this.setState({ creatingSchemas: 0 });
        }
      } else {
        this.setState({ creatingSchemas: this.state.creatingSchemas - 1 });
      }
    })
    .create(fields);
  },

  finishUpdatingRecord() {
    this.setState({
      index: this.state.index + 1,
    });
  },

  render() {
    return (
      <ModalForEach
        ref="modal"
        size="large"
        onPerform={this.onPerform}
        onConfirm={this.onConfirm}
        onDismiss={this.onDismiss}
        contentPrefix={this.props.contentPrefix}
        recordIds={this.state.selectedRecordIds}
        index={this.state.index}
        waitForConfirmationAcknowledgement
      >
        <div>
          <Translate
            component="p"
            content={`${this.props.contentPrefix}.message.confirmation`}
            count={this.state.selectedRecordIds.count()}
          />
          <MetadataFormWidget
            ref="form"
            form={this.state.form}
            contentPrefix={this.props.contentPrefix + '.form'}
            onSubmit={this.onFormSubmit}
          />
        </div>

        <div>
          <Translate
            component="p"
            content={`${this.props.contentPrefix}.message.progress`}
          />
        </div>

        <div>
          <Translate
            component="p"
            content={`${this.props.contentPrefix}.message.acknowledgement`}
            count={this.state.selectedRecordIds.count()}
          />
        </div>

        <div>
          <Translate
            component="p"
            content={`${this.props.contentPrefix}.message.cancelled`}
          />
        </div>
      </ModalForEach>
    );
  },
});
