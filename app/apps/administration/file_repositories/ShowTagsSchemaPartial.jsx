import React from 'react';
import { List } from 'immutable';
import classnames from 'classnames';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import RadioKit from '../../../services/RadioKit';

import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';

import Loading from '../../../widgets/general/loading_widget.jsx';
import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import UpdateModal from '../../../widgets/admin/crud/update_modal.jsx';
import MetadataSchemaFormModal from '../../../widgets/metadata/metadata_schema_form_modal.jsx';

Counterpart.registerTranslations('en', require('./ShowTagsSchemaPartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./ShowTagsSchemaPartial.locale.pl.js'));


import './ShowTagsSchemaPartial.scss';
const ShowTagsSchemaPartial = React.createClass({
  propTypes: {
    app: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      categories: List(),
    }
  },

  componentDidMount() {
    this.queryTagCategories();
  },

  queryTagCategories() {
    RadioKit
      .query('vault', 'Data.Tag.Category')
      .select('id', 'name', 'tag_items.id', 'tag_items.name', 'metadata_schemas.id', 'metadata_schemas.name')
      .joins('tag_items')
      .joins('metadata_schemas')
      .where('record_repository_id', 'eq', this.props.record.get('id'))
      .on('fetch', (_eventName, _record, data) => {
        this.setState({
          categories: data,
          loaded: true,
        });
      })
      .on('error', () => {
        this.setState({
          loaded: true,
          error: true,
        });
      })
      .fetch();
  },

  buildNewCategoryForm() {
    return {
      name: {
        type: 'string',
        hint: true,
        validators: {
          presence: true,
        }
      },
      key: {
        type: 'string',
        hint: true,
      },
      record_repository_id: {
        type: 'hidden',
        value: this.props.record.get('id'),
      }
    }
  },

  buildNewTagForm(category) {
    return {
      name: {
        type: 'string',
        hint: true,
        validators: {
          presence: true,
        }
      },
      tag_category_id: {
        type: 'hidden',
        value: category.get('id'),
      }
    }
  },

  buildEditCategoryForm(category) {
    return {
      name: {
        type: 'string',
        hint: true,
        value: category.get('name'),
        validators: {
          presence: true,
        },
      },
      key: {
        type: 'string',
        hint: true,
        value: category.key,
      }
    }
  },

  buildEditTagForm(tag) {
    return {
      name: {
        type: 'string',
        hint: true,
        value: tag.get('name'),
        validators: {
          presence: true,
        }
      },
    }
  },

  refreshData() {
    this.queryTagCategories();
    this.setState(this.state);
  },

  renderMetadataSchemas(category) {
    const plusIconClasses = classnames(
      'ShowTagsSchemaPartial__metadataSchemaLabel',
      { 'ShowTagsSchemaPartial__metadataSchemaLabel--empty' : category.get('metadata_schemas').count() < 1}
    );
    return (
      <div>
        <span>
          <a className={plusIconClasses} onClick={ () => this.showEditMetadataSchemas(category) }>
            <i className="mdi mdi-plus"></i>
          </a>
          {(() => {
            if(category.get('metadata_schemas').count() < 1){
              return (
                <Translate
                  content={this.props.contentPrefix + ".empty_metadata_schemas"}
                  component="small"
                />
              );
            }
          })()}
        </span>
        {category.get('metadata_schemas').sortBy(schema => schema.get('name')).map(schema => {
          const deleteModalRef = "deleteMetadataSchema-" + schema.get('id');
          const updateModalRef = "updateMetadataSchema-" + schema.get('id');
          return (
            <span>
              <DeleteModal
                ref={deleteModalRef}
                contentPrefix={ this.props.contentPrefix + ".modals.delete_metadata_schema" }
                app="vault" model="Data.Metadata.Schema"
                selectedRecordIds={ List.of(schema.get('id')) }
                onDismiss={ this.refreshData }
              />
              <MetadataSchemaFormModal
                ref={updateModalRef}
                app="vault" model="Data.Metadata.Schema"
                selectedRecordIds={ List.of(schema.get('id')) }
                onDismiss={ this.refreshData }
                updateRecord={ schema }
              />
              <span className="ShowTagsSchemaPartial__metadataSchemaLabel">
                {schema.get('name')}
                <span className="ShowTagsSchemaPartial__metadataBtnGroup">
                  <a className="ShowTagsSchemaPartial__smallBtn btn btn-icon" onClick={ () => this.refs[updateModalRef].show() }>
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
        })}
      </div>
    );
  },

  renderCategoryTags(category) {
    return (
      <div className="ShowTagsSchemaPartial">
        <ul className="list">
          { category.get('tag_items').sortBy(item => item.get('name')).map((tag) => {
              return (
                <li key={ tag.get('id') } className="">
                  <DeleteModal
                    ref={ "deleteTagModal-" + tag.get('id') }
                    contentPrefix={ this.props.contentPrefix + ".modals.delete_tag" }
                    app="vault" model="Data.Tag.Item"
                    selectedRecordIds={ List.of(tag.get('id')) }
                    onDismiss={ this.refreshData }/>
                  <UpdateModal
                    ref={ "editTagModal-" + tag.get('id') }
                    contentPrefix={ this.props.contentPrefix + ".modals.edit_tag" }
                    app="vault"
                    model="Data.Tag.Item"
                    recordId={ tag.get('id') }
                    form={ this.buildEditTagForm(tag) }
                    onDismiss={ this.refreshData } />
                  <div className="ShowTagsSchemaPartial__tagName card-head card-head-sm">
                    <header className="ShowTagsSchemaPartial__listHeader">
                      { tag.get('name') }
                    </header>
                    <div className="tools">
                      <a className="btn btn-icon" onClick={ () => this.showEditTagModal(tag) }>
                        <i className="mdi mdi-border-color" />
                      </a>
                      <a
                        className="btn btn-flat ink-reaction btn-default"
                        onClick={ () => this.showDeleteTagModal(tag) }
                      >
                        <i className="mdi mdi-delete" />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  },

  showDeleteTagModal(tag) {
    this.refs["deleteTagModal-" + tag.get('id')].show();
  },

  showDeleteCategoryModal(category) {
    this.refs["deleteCategoryModal-" + category.get('id')].show();
  },

  showNewTagModal(category) {
    this.refs["newTagModal-" + category.get('id')].show();
  },

  showEditTagModal(tag) {
    this.refs["editTagModal-" + tag.get('id')].show();
  },

  showEditCategoryModal(category) {
    this.refs["editCategoryModal-" + category.get('id')].show();
  },

  showEditMetadataSchemas(category) {
    this.refs["editMetadataSchemasModal-" + category.get('id')].show();
  },

  renderCrudModals(category) {
    return (
      <div>
        <CreateModal
          ref={ "newTagModal-" + category.get('id') }
          contentPrefix={ this.props.contentPrefix + ".modals.create_tag" }
          app="vault"
          model="Data.Tag.Item"
          form={ this.buildNewTagForm(category) }
          onDismiss={ this.refreshData }
        />
        <DeleteModal
          ref={ "deleteCategoryModal-" + category.get('id') }
          contentPrefix={ this.props.contentPrefix + ".modals.delete_category" }
          app="vault" model="Data.Tag.Category"
          selectedRecordIds={ List.of(category.get('id')) }
          onDismiss={ this.refreshData }
        />
        <UpdateModal
          ref={ "editCategoryModal-" + category.get('id') }
          contentPrefix={ this.props.contentPrefix + ".modals.edit_category" }
          app="vault"
          model="Data.Tag.Category"
          recordId={ category.get('id') }
          form={ this.buildEditCategoryForm(category) }
          onDismiss={ this.refreshData }
        />
        <MetadataSchemaFormModal
          ref={ "editMetadataSchemasModal-" + category.get('id') }
          app="vault"
          model="Data.Tag.Category"
          recordKey={ 'tag_category_id' }
          recordId={ category.get('id') }
          repositoryId={this.props.record.get('id')}
          onDismiss={ this.refreshData }
        />
      </div>
    );
  },

  render() {
    return (
      <div className="ShowTagsSchemaPartial">
        <ToolbarGroup>
          <ToolbarButtonModal
            icon="plus"
            labelTextKey={ this.props.contentPrefix + ".actions.add_category" }
            modalElement={ CreateModal }
            modalProps={
              {
                contentPrefix: this.props.contentPrefix + ".modals.create_category",
                onDismiss: this.refreshData,
                form: this.buildNewCategoryForm(),
                app: "vault",
                model: "Data.Tag.Category"
              }
           }
        />
        </ToolbarGroup>
        { this.state.categories.size > 0 &&
          this.state.categories.sortBy(category => category.get('name')).map((category) => {
          const toggleClassNames = classnames(
            'btn', 'btn-flat', 'btn-icon-toggle',
            { 'disabled' : category.get('tag_items').count() < 1 }
          );
          const newTagIconClassNames = classnames(
            'btn', 'btn-icon',
            { 'ShowTagsSchemaPartial__emptyCategory' : category.get('tag_items').count() < 1 }
          );
          return (
            <div id={ category.get('id') } key={category.get('id')}>
              {this.renderCrudModals(category)}
              <div className="expanded">
                <div className="card-head" aria-expanded="true">
                  <a className={ toggleClassNames }
                     data-toggle="collapse" data-parent={ "#" + category.get('id') }
                     data-target={ "#" + category.get('id') + "-tagList" }>
                    <i className="mdi mdi-chevron-right" />
                  </a>
                  <header className="ShowTagsSchemaPartial__listHeader">
                    { category.get('name') }
                  </header>
                  <div>
                    {this.renderMetadataSchemas(category)}
                  </div>
                  <div className="tools">
                    {() => {
                      if(category.get('tag_items').count() < 1){
                        return (
                          <Translate
                            content={this.props.contentPrefix + ".modals.create_category.empty_warning"}
                            component="small"
                            className="ShowTagsSchemaPartial__emptyCategory"
                          />
                        );
                      }
                    }()}

                    <a className={newTagIconClassNames} onClick={ () => this.showNewTagModal(category) }>
                      <i className="mdi mdi-library-plus"></i>
                    </a>
                    <a className="btn btn-icon" onClick={ () => this.showEditCategoryModal(category) }>
                      <i className="mdi mdi-border-color"></i>
                    </a>
                    <a className="btn btn-icon" onClick={ () => this.showDeleteCategoryModal(category) }>
                      <i className="mdi mdi-delete"></i>
                    </a>
                  </div>
                </div>
                <div id={ category.get('id') + "-tagList" } className="collapse in" aria-expanded="true">
                  { this.renderCategoryTags(category) }
                </div>
              </div>
            </div>
          );
          })}
      </div>
    );
  },
});

export default ShowTagsSchemaPartial;
