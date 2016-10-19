import React from 'react';
import classnames from 'classnames';
import { List } from 'immutable';
import RadioKit from '../../../../services/RadioKit';
import Translate from 'react-translate-component';

import TagCategory from './tag_category.jsx';

import './show_sidebar_partial.scss';
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
        'id', 'name', 'tag_items.id', 'tag_items.name', 'tag_items.tag_category_id',
        'metadata_schemas.id', 'metadata_schemas.key', 'metadata_schemas.kind',
        'metadata_schemas.name',
      )
      .joins('metadata_schemas')
      .joins('tag_items')
      .where('record_repository_id', 'eq', this.props.record.get('id'))
      .on('fetch', (_event, _query, data) => {
        this.setState({
          categories: data.filterNot(category => category.get('tag_items').isEmpty()),
        });
      })
      .fetch();
  },

  onClearFilter() {
    this.setState({ ...this.getInitialState(), categories: this.state.categories });
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

  updateFilter() {
    this.props.onTagFilterUpdate(this.state.selectedTagItems);
    this.state.selectedTagItems.forEach(tag => {
      if (!tag.get('metadata_items')) {
        this.fetchMetadataItems(tag);
      }
    });
  },

  updateTagData() {
    this.state.selectedTagItems.forEach(tag => this.fetchMetadataItems(tag));
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
        'id', 'name', 'tag_category_id', 'metadata_items.id', 'metadata_items.value_string',
        'metadata_items.value_db', 'metadata_items.value_url', 'metadata_items.value_text',
        'metadata_items.value_date', 'metadata_items.value_datetime', 'metadata_items.value_time',
        'metadata_items.value_file', 'metadata_items.value_image',
        'metadata_items.value_float', 'metadata_items.value_integer',
        'metadata_items.metadata_schema_id', 'metadata_items.value_duration',
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
      const tagIndex = this.state.selectedTagItems
        .findIndex((matchingTag) => matchingTag.get('id') === tag.get('id'));
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

  isCategorySelected(category) {
    return this.state.selectedTagCategories.includes(category);
  },

  isTagSelected(tag) {
    return !!this.state.selectedTagItems.find(item => item.get('id') === tag.get('id'));
  },

  canEditMetadata(category) {
    return category.get('metadata_schemas')
      && category.get('metadata_schemas').count() > 0
      && this.state.selectedTagItems.count() > 0
      && this.state.selectedTagItems.reduce((isSameGroup, item) =>
        isSameGroup && item.get('tag_category_id') === category.get('id')
      , true);
  },

  render() {
    const allTagsClassName = classnames('card-head', {
      'ShowSidebarPartial__allTags': !this.props.tagFilter.isEmpty(),
      'ShowSidebarPartial__allTags--selected': this.props.tagFilter.isEmpty(),
    });
    return (
      <div className="ShowSidebarPartial">
        <div className={ allTagsClassName }>
          <header onClick={this.onClearFilter}>
            <Translate content={ `${this.props.contentPrefix}.sidebar.all_tags` } />
          </header>
        </div>
        {
          this.state.categories.sortBy(category => category.get('name')).map((category) => {
            if (category.get('tag_items').isEmpty()) {
              return null;
            }
            return (
              <TagCategory
                key={category.get('id')}
                contentPrefix={this.props.contentPrefix}
                category={category}
                selectedTagItems={this.state.selectedTagItems}
                selected={this.isCategorySelected(category)}
                onCategorySelected={this.toggleCategorySelection}
                onTagSelected={this.toggleTagSelection}
                canEditMetadata={this.canEditMetadata(category)}
                onDataChanged={this.updateTagData}
              />
            );
          })}
      </div>
    );
  },
});

export default ShowSidebarPartial;
