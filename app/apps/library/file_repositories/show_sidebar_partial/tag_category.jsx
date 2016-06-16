import React from 'react';
import classnames from 'classnames';
import Counterpart from 'counterpart';
import MetadataModal from '../show_content_metadata_modal.jsx';
import { List } from 'immutable';

import TagItemList from './tag_item_list.jsx';

import './show_sidebar_partial.scss';
const TagCategory = React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    category: React.PropTypes.object.isRequired,
    selectedTagItems: React.PropTypes.object.isRequired,
    onCategorySelected: React.PropTypes.func.isRequired,
    onTagSelected: React.PropTypes.func.isRequired,
    canEditMetadata: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    onDataChanged: React.PropTypes.func.isRequired,
  },

  render() {
    const onCategorySelected = () => this.props.onCategorySelected(this.props.category);
    const toggleClasses = classnames(
      'btn btn-flat btn-icon-toggle collapsed',
      'ShowSidebarPartial__expandToggle'
    );
    const headerClasses = classnames(
      'card-head ShowSidebarPartial__category',
      { 'ShowSidebarPartial__category--selected': this.props.selected },
    );
    const metadataIconClasses = classnames(
      'btn btn-icon',
      'ShowSidebarPartial__editMetadataButton',
      { 'hidden': !this.props.canEditMetadata }
    );
    const metadataModalRef = `metadataModal-${this.props.category.get('id')}`;
    if (this.props.category.get('tag_items').isEmpty()) {
      return null;
    }
    return (
        <div id={this.props.category.get('id')}>
          <MetadataModal
            ref={metadataModalRef}
            contentPrefix="widgets.vault.file_browser.modals.metadata_tag"
            selectedRecords={this.props.selectedTagItems}
            metadataSchemas={this.props.category.get('metadata_schemas') || List()}
            onDismiss={ this.props.onDataChanged }
            recordKey="tag_item_id"
          />
          <div className="expanded">
            <div className={headerClasses} aria-expanded="true" onClick={onCategorySelected}>
              <a className={toggleClasses}
                data-toggle="collapse" data-parent={ `#${this.props.category.get('id')}` }
                data-target={ `#${this.props.category.get('id')}-tagList` }
                onClick={(e) => e.stopPropagation()}
              >
              <i className="mdi mdi-chevron-right" />
              </a>
                <header>
                  { this.props.category.get('name') }
                </header>
              <a
                className={ metadataIconClasses }
                title={ Counterpart.translate( `${this.props.contentPrefix}.sidebar.edit_tag_metadata`) }
                onClick = {
                  (e) => {
                    e.stopPropagation();
                    this.refs[metadataModalRef].show();
                  }
                }
              >
                <i className="mdi mdi-border-color"></i>
              </a>
              </div>
              <div
                id={ `${this.props.category.get('id')}-tagList` }
                className="collapse"
                aria-expanded="false"
              >
              <TagItemList
                category={this.props.category}
                selectedTagItems={this.props.selectedTagItems}
                onTagSelected={this.props.onTagSelected}
              />
            </div>
          </div>
        </div>
      );
  },
});

export default TagCategory;
