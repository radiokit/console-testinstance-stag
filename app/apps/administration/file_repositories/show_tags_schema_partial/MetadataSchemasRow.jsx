import React from 'react';
import classnames from 'classnames';
import Translate from 'react-translate-component';
import { List } from 'immutable';
import DeleteModal from '../../../../widgets/admin/crud/delete_modal.jsx';
import MetadataSchemaFormModal from '../../../../widgets/metadata/metadata_schema_form_modal.jsx';


const MetadataSchemasRow = React.createClass({

  propTypes: {
    category: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onDataChanged: React.PropTypes.func.isRequired,
    onNewSchemaRequested: React.PropTypes.func.isRequired,
  },

  handleNewSchemaRequest() {
    this.props.onNewSchemaRequested(this.props.category);
  },

  render() {
    const plusIconClasses = classnames(
      'ShowTagsSchemaPartial__metadataSchemaPlusBtn',
      {
        'ShowTagsSchemaPartial__metadataSchemaPlusBtn--empty':
        this.props.category.get('metadata_schemas').count() < 1,
      }
    );
    return (
      <div>
        <span>
          <a
            className={plusIconClasses}
            onClick={ this.handleNewSchemaRequest }
          >
            <i className="mdi mdi-plus"></i>
          </a>
          {
            (this.props.category.get('metadata_schemas').count() < 1)
              ? (
                <Translate
                  content={ `${this.props.contentPrefix}.empty_metadata_schemas`}
                  component="small"
                />
              )
              : null
          }
        </span>
        {
          this.props.category
            .get('metadata_schemas')
            .sortBy(schema => schema.get('name'))
            .map(schema => {
              const deleteModalRef = `deleteMetadataSchema-${schema.get('id')}`;
              const updateModalRef = `updateMetadataSchema-${schema.get('id')}`;
              return (
                <span key={schema.get('id')}>
                  <DeleteModal
                    ref={deleteModalRef}
                    contentPrefix={ `${this.props.contentPrefix}.modals.delete_metadata_schema` }
                    app="vault" model="Data.Metadata.Schema"
                    selectedRecordIds={ List.of(schema.get('id')) }
                    onDismiss={ this.props.onDataChanged }
                  />
                  <MetadataSchemaFormModal
                    ref={updateModalRef}
                    app="vault" model="Data.Metadata.Schema"
                    selectedRecordIds={ List.of(schema.get('id')) }
                    onDismiss={ this.props.onDataChanged }
                    updateRecord={ schema }
                  />
                  <span className="ShowTagsSchemaPartial__metadataSchemaLabel">
                    <span className="ShowTagsSchemaPartial__metadataSchemaName">
                      {schema.get('name')}
                    </span>
                    <span className="ShowTagsSchemaPartial__metadataBtnGroup">
                      <a
                        className="ShowTagsSchemaPartial__smallBtn btn btn-icon"
                        onClick={ () => this.refs[updateModalRef].show() }
                      >
                        <i className="mdi mdi-border-color" />
                      </a>
                      <a className="ShowTagsSchemaPartial__smallBtn btn btn-icon"
                        onClick={ () => this.refs[deleteModalRef].show()}
                      >
                        <i className="mdi mdi-close-box" />
                      </a>
                    </span>
                  </span>
                </span>
              );
            })
        }
      </div>
    );
  },
});

export default MetadataSchemasRow;
