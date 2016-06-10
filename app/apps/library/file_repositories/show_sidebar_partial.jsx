import React from 'react';
import classnames from 'classnames';
import { List } from 'immutable';
import RadioKit from '../../../services/RadioKit';
import Translate from 'react-translate-component';

import MetadataModal from './show_content_metadata_modal.jsx';


import './ShowSidebarPartial.scss';
const ShowSidebarPartial = React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    onTagFilterUpdate: React.PropTypes.func.isRequired,
    record: React.PropTypes.object.isRequired,
    tagFilter: React.PropTypes.object,
  },

  getInitialState() {
    return {
      categories: this.getCategories(),
      selectedTagCategories: List(),
      selectedTagItems: List(),
    };
  },

  componentDidMount() {
    RadioKit
      .query('vault', 'Data.Tag.Category')
      .select(
        'id',
        'name',
        'tag_items.id',
        'tag_items.name',
        'tag_items.tag_category_id',
        'metadata_schemas.id',
      )
      .joins('metadata_schemas')
      .joins('tag_items')
      .where('record_repository_id', 'eq', this.props.record.get('id'))
      .on('error', () => {
      })
      .on('fetch', (_event, _query, data) => {
        this.setState({
          categories: data.filterNot(category => category.get('tag_items').isEmpty()),
        });
      })
      .fetch();
  },

  getCategories() {
    const { record } = this.props;
    const tags = record.get('tag_items', List()).groupBy(item => item.get('tag_category_id'));
    return record
      .get('tag_categories', List())
      .map(
        category =>
          category.set(
            'tag_items',
            tags.get(category.get('id')) || List()
          )
      );
  },

  // <MetadataModal
  //   contentPrefix="widgets.vault.file_browser.modals.metadata"
  //   selectedRecordIds={this.state.selectedRecordIds}
  //   selectedRecords={this.state.selectedRecords}
  //   metadataSchemas={category.get('metadata_schemas')}
  //   onDismiss={this.reloadTable}
  // />

  updateFilter() {
    this.props.onTagFilterUpdate(this.state.selectedTagItems);
    this.state.selectedTagItems.forEach(tag => {
      if (!tag.get('metadata_items')) {
        this.fetchMetadataItems(tag);
      }
    });
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedTagItems.count() !== this.state.selectedTagItems.count()) {
      this.updateFilter();
    }
  },

  fetchMetadataItems(tag) {
    RadioKit
      .query('vault', 'Data.Tag.Item')
      .select(
        'id',
        'name',
        'tag_category_id',
        'metadata_items.id',
        'metadata_items.value_string',
        'metadata_items.value_db',
        'metadata_items.value_url',
        'metadata_items.value_text',
        'metadata_items.value_float',
        'metadata_items.value_integer',
        'metadata_items.value_duration',
        'metadata_items.value_date',
        'metadata_items.value_datetime',
        'metadata_items.value_time',
        'metadata_items.value_file',
        'metadata_items.value_waveform',
        'metadata_items.value_image',
        'metadata_items.metadata_schema_id',
      )
      .joins('metadata_items')
      .where('id', 'eq', tag.get('id'))
      .on('error', () => {
      })
      .on('fetch', (_event, _query, data) => {
        const tagIndex = this.state.selectedTagItems.indexOf(tag);
        if (tagIndex > -1) {
          this.setState({
            selectedTagItems: this.state.selectedTagItems.remove(tagIndex).push(data.first()),
          });
        }
      })
      .fetch();
  },

  toggleCategorySelection(category) {
    const isAdded = this.state.selectedTagCategories.includes(category);
    if (isAdded) {
      const selectedTagItems = this.state.selectedTagItems
        .filterNot(tag => tag.get('tag_category_id') === category.get('id'));
      const categoryIndex = this.state.selectedTagCategories.indexOf(category);
      this.setState({
        selectedTagCategories: this.state.selectedTagCategories.remove(categoryIndex),
        selectedTagItems,
      });
    } else {
      let tagsToAdd = List();
      category.get('tag_items').forEach(newTag => {
        if (!this.state.selectedTagItems.find(tag => tag.get('id') === newTag.get('id'))) {
          tagsToAdd = tagsToAdd.push(newTag);
        }
      });
      this.setState({
        selectedTagCategories: this.state.selectedTagCategories.push(category),
        selectedTagItems: this.state.selectedTagItems.concat(tagsToAdd),
      });
    }
  },

  toggleTagSelection(tag, category) {
    const isAdded = this.isTagSelected(tag);
    let selectedTagItems = this.state.selectedTagItems;
    if (isAdded) {
      const tagIndex = this.state.selectedTagItems.indexOf(tag);
      selectedTagItems = this.state.selectedTagItems.remove(tagIndex);
    } else {
      selectedTagItems = this.state.selectedTagItems.push(tag);
    }
    const selectedTagCategories = this.updateSelectedCategories(selectedTagItems, category);
    this.setState({
      selectedTagItems,
      selectedTagCategories,
    });
  },

  updateSelectedCategories(selectedTagItems, category) {
    const categorySelectedTagCount = selectedTagItems
      .filter(tagItem => tagItem.get('tag_category_id') === category.get('id')).count();
    if (category.get('tag_items').count() === categorySelectedTagCount) {
      return this.state.selectedTagCategories.push(category);
    } else if (this.isCategorySelected(category)) {
      const index = this.state.selectedTagCategories.indexOf(category);
      return this.state.selectedTagCategories.remove(index);
    }
    return this.state.selectedTagCategories;
  },

  onClearFilter() {
    this.setState({ ...this.getInitialState(), categories: this.state.categories });
  },

  isCategorySelected(category) {
    return this.state.selectedTagCategories.includes(category);
  },

  isTagSelected(tag) {
    return !!this.state.selectedTagItems.find(item => item.get('id') === tag.get('id'));
  },

  renderCategoryTags(category) {
    return (
      <div>
        <ul className="list">
          { category.get('tag_items').sortBy(item => item.get('name')).map((tag) => {
            const onTagSelected = () => this.toggleTagSelection(tag, category);
            const tagClassNames = classnames('card-head card-head-sm', {
              'Tag': !this.isTagSelected(tag),
              'Tag--selected': this.isTagSelected(tag),
            });
            return (
              <li key={ tag.get('id') }>
                <div className={tagClassNames} onClick={onTagSelected} >
                  <header>
                    { tag.get('name') }
                  </header>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },

  render() {
    const allTagsClassName = classnames('card-head', {
      'AllTags': !this.props.tagFilter.isEmpty(),
      'AllTags--selected': this.props.tagFilter.isEmpty(),
    });
    return (
      <div className="ShowSidebarPartial">
        <div className={ allTagsClassName }>
          <header onClick={this.onClearFilter}>
            <Translate content={ `${this.props.contentPrefix}.tags.all_tags` } />
          </header>
        </div>
        {
          this.state.categories.sortBy(category => category.get('name')).map((category) => {
            if (category.get('tag_items').isEmpty()) {
              return null;
            }
            const onCategorySelected = () => this.toggleCategorySelection(category);
            const toggleClasses = classnames('btn btn-flat btn-icon-toggle collapsed');
            const headerClasses = classnames('card-head Category', {
              'Category--selected': this.isCategorySelected(category),
            });
            return (
              <div id={category.get('id')} key={category.get('id')}>

                <div className="expanded">
                  <div className={headerClasses} aria-expanded="true" onClick={onCategorySelected}>
                    <a className={toggleClasses}
                      data-toggle="collapse" data-parent={ `#${category.get('id')}` }
                      data-target={ `#${category.get('id')}-tagList` }
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="mdi mdi-chevron-right" />
                    </a>
                    <header>
                      { category.get('name') }
                    </header>
                    <a className="btn btn-icon">
                      <i className="mdi mdi-border-color"></i>
                    </a>
                </div>
                <div
                  id={ `${category.get('id')}-tagList` }
                  className="collapse"
                  aria-expanded="false"
                >
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

export default ShowSidebarPartial;
