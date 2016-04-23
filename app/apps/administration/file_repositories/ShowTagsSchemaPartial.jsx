import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import classnames from 'classnames';
import Counterpart from 'counterpart';

import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';

import Loading from '../../../widgets/general/loading_widget.jsx';
import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import UpdateModal from '../../../widgets/admin/crud/update_modal.jsx';

Counterpart.registerTranslations("en", require('./ShowTagsSchemaPartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowTagsSchemaPartial.locale.pl.js'));


import './ShowTagsSchemaPartial.scss';
const ShowTagsSchemaPartial = React.createClass({

  propTypes: {
    app: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      categories: []
    }
  },

  componentDidMount() {
    this.queryTagCategories();
  },

  queryTagCategories() {
    window.data
      .query("vault", "Data.Tag.Category")
      .select("id", "name", "tag_items")
      .joins("tag_items")
      .where("record_repository_id", "eq", this.props.record.get("id"))
      .on("fetch", (_eventName, _record, data) => {
        if (this.isMounted()) {
          this.setState({
            categories: data,
            loaded: true,
          });
        }
      })
      .on("error", () => {
        if (this.isMounted()) {
          this.setState({
            loaded: true,
            error: true,
          });
        }
      })
      .fetch();
  },

  buildNewCategoryForm() {
    return {
      name: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      record_repository_id: {
        type: "hidden",
        value: this.props.record.get("id"),
      }
    }
  },

  buildNewTagForm(category) {
    return {
      name: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      tag_category_id: {
        type: "hidden",
        value: category.id,
      }
    }
  },

  buildEditCategoryForm(category) {
    return {
      name: {
        type: "string",
        hint: true,
        value: category.name,
        validators: {
          presence: true,
        }
      }
    }
  },

  buildEditTagForm(tag) {
    return {
      name: {
        type: "string",
        hint: true,
        value: tag.name,
        validators: {
          presence: true,
        }
      }
    }
  },

  refreshData() {
    this.queryTagCategories();
    this.setState(this.state);
  },

  renderCategoryTags(category) {
    return (
      <div className="ShowTagsSchemaPartial">
        <ul className="list">
          { _.sortBy(category.tag_items,'name').map((tag) => {
            const onDeleteTagListener = () => this.showDeleteTagModal(tag);
            const onEditTagListener = () => this.showEditTagModal(tag);
            return (
              <li key={ tag.id } className="">
                <DeleteModal
                  ref={ "deleteTagModal-" + tag.name }
                  contentPrefix={ this.props.contentPrefix + ".modals.delete_tag" }
                  app="vault" model="Data.Tag.Item"
                  selectedRecordIds={ Immutable.List.of(tag.id) }
                  onDismiss={ this.refreshData }/>
                <UpdateModal
                  ref={ "editTagModal-" + tag.name }
                  contentPrefix={ this.props.contentPrefix + ".modals.edit_tag" }
                  app="vault"
                  model="Data.Tag.Item"
                  recordId={ tag.id }
                  form={ this.buildEditTagForm(tag) }
                  onDismiss={ this.refreshData } />
                <div className="card-head card-head-sm">
                  <header>
                    { tag.name }
                  </header>
                  <div className="tools">
                    <a className="btn btn-icon" onClick={ onEditTagListener }>
                      <i className="mdi mdi-border-color" />
                    </a>
                    <a className="btn btn-flat ink-reaction btn-default" onClick={ onDeleteTagListener }>
                      <i className="mdi mdi-delete" />
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },

  showDeleteTagModal(tag) {
    this.refs["deleteTagModal-" + tag.name].show();
  },

  showDeleteCategoryModal(category) {
    this.refs["deleteCategoryModal-" + category.name].show();
  },

  showNewTagModal(category) {
    this.refs["newTagModal-" + category.name].show();
  },

  showEditTagModal(tag) {
    this.refs["editTagModal-" + tag.name].show();
  },

  showEditCategoryModal(category) {
    this.refs["editCategoryModal-" + category.name].show();
  },

  render() {
    return (
      <div className="ShowTagsSchemaPartial">
        <ToolbarGroup>
          <ToolbarButtonModal
            icon="plus"
            labelTextKey={ this.props.contentPrefix + ".actions.add_category" }
            modalElement={ CreateModal }
            modalProps={ {  contentPrefix: this.props.contentPrefix + ".modals.create_category",
                            onDismiss: this.refreshData,
                            form: this.buildNewCategoryForm(),
                            app: "vault",
                            model: "Data.Tag.Category" } } />
        </ToolbarGroup>
        { this.state.categories.size > 0 && _.sortBy(this.state.categories.toJS(),'name').map((category) => {
          const onNewTagListener = () => this.showNewTagModal(category);
          const onDeleteCategoryListener = () => this.showDeleteCategoryModal(category);
          const onEditCategoryListener = () => this.showEditCategoryModal(category);
          const toggleClassNames = classnames('btn', 'btn-flat', 'btn-icon-toggle', {'disabled' : category.tag_items.length === 0 });
          return (
            <div id={ category.name } key={category.id}>
              <CreateModal
                ref={ "newTagModal-" + category.name }
                contentPrefix={ this.props.contentPrefix + ".modals.create_tag" }
                app="vault"
                model="Data.Tag.Item"
                form={ this.buildNewTagForm(category) }
                onDismiss={ this.refreshData }/>
              <DeleteModal
                ref={ "deleteCategoryModal-" + category.name }
                contentPrefix={ this.props.contentPrefix + ".modals.delete_category" }
                app="vault" model="Data.Tag.Category"
                selectedRecordIds={ Immutable.List.of(category.id) }
                onDismiss={ this.refreshData }/>
              <UpdateModal
                ref={ "editCategoryModal-" + category.name }
                contentPrefix={ this.props.contentPrefix + ".modals.edit_category" }
                app="vault"
                model="Data.Tag.Category"
                recordId={ category.id }
                form={ this.buildEditCategoryForm(category) }
                onDismiss={ this.refreshData } />
              <div className="expanded">
                <div className="card-head" aria-expanded="true">
                  <a className={ toggleClassNames }
                     data-toggle="collapse" data-parent={ "#" + category.name }
                     data-target={ "#" + category.name + "-tagList" }>
                    <i className="mdi mdi-chevron-right" />
                  </a>
                  <header>
                    { category.name }
                  </header>
                  <div className="tools">
                    <a className="btn btn-icon" onClick={ onNewTagListener }>
                      <i className="mdi mdi-library-plus"></i>
                    </a>
                    <a className="btn btn-icon" onClick={ onEditCategoryListener }>
                      <i className="mdi mdi-border-color"></i>
                    </a>
                    <a className="btn btn-icon" onClick={ onDeleteCategoryListener }>
                      <i className="mdi mdi-delete"></i>
                    </a>
                  </div>
                </div>
                <div id={ category.name + "-tagList" } className="collapse in" aria-expanded="true">
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
