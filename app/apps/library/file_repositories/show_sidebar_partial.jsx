import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import Immutable from 'immutable';

import Translate from 'react-translate-component';

import './ShowSidebarPartial.scss';
const ShowSidebarPartial = React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    onTagFilterUpdate: React.PropTypes.func.isRequired,
    record: React.PropTypes.object.isRequired,
    tagFilter: React.PropTypes.array,
  },

  getInitialState() {
    return {
      selectedCategoriesIds: [],
    };
  },

  selectCategory(category) {
    let newFilter = [...this.props.tagFilter];
    let selectedCategoriesIds = this.state.selectedCategoriesIds;
    if (this.isCategorySelected(category)) {
      newFilter = _.differenceBy(newFilter, category.tag_items, 'id');
      selectedCategoriesIds = _.pull(selectedCategoriesIds, category.id);
    } else {
      newFilter = _.uniqBy(_.concat(newFilter, category.tag_items), 'id');
      selectedCategoriesIds.push(category.id);
    }
    this.props.onTagFilterUpdate(newFilter);
    this.setState({ selectedCategoriesIds });
  },

  selectTag(tag) {
    let newFilter = [...this.props.tagFilter];
    if (this.isTagSelected(tag)) {
      newFilter = _.differenceBy(newFilter, [tag], 'id');
    } else {
      newFilter.push(tag);
    }
    const category = this.props.record.get('tag_categories', new Immutable.List())
      .filter((cat) => cat.get('id') === tag.tag_category_id).first().toJS();
    const usedTags = newFilter.filter((tagItem) => tagItem.tag_category_id === category.id);
    let selectedCategoriesIds = this.state.selectedCategoriesIds;
    if (usedTags.length === category.tag_items.length) {
      selectedCategoriesIds.push(category.id);
    }
    else {
      selectedCategoriesIds = _.pull(selectedCategoriesIds, category.id);
    }
    this.props.onTagFilterUpdate(newFilter);
    this.setState({ selectedCategoriesIds });
  },

  onClearFilter() {
    this.setState({
      selectedCategoriesIds: [],
    });
    this.props.onTagFilterUpdate([]);
  },

  isCategorySelected(category) {
    return _.includes(this.state.selectedCategoriesIds, category.id);
  },

  isTagSelected(tag) {
    return _.some(this.props.tagFilter, tag);
  },

  renderCategoryTags(category) {
    return (
      <div>
        <ul className="list">
          { category.tag_items && _.sortBy(category.tag_items,'name').map((tag) => {
            const onTagSelected = () => this.selectTag(tag);
            return (
              <li key={ tag.id }>
                <div className={"card-head card-head-sm Tag" + (this.isTagSelected(tag) ? "--selected" : "")} onClick={onTagSelected}>
                  <header>
                    { tag.name }
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
    const categories = this.props.record.get("tag_categories", new Immutable.List()).toJS();
    return (
      <div className="ShowSidebarPartial">
        <div className={"card-head AllTags" + (!this.props.tagFilter.length > 0 ? "--selected" : "")}>
          <header onClick={this.onClearFilter}>
            <Translate content={this.props.contentPrefix + ".tags.all_tags"} />
          </header>
        </div>
        { categories.length > 0 && _.sortBy(categories,'name').map((category) => {
          const onCategorySelected = () => this.selectCategory(category);
          let toggleClasses = classnames('btn btn-flat btn-icon-toggle collapsed', {
            'disabled': category.tag_items.length === 0,
          });
          let headerClasses = classnames('card-head Category', {
            'Category--selected': this.isCategorySelected(category),
          });
          if (category.tag_items.length === 0) {
            return null;
          } else return (
            <div id={ category.id } key={category.id}>
              <div className="expanded">
                <div className={headerClasses} aria-expanded="true" onClick={onCategorySelected}>
                  <a className={toggleClasses}
                    data-toggle="collapse" data-parent={ "#" + category.id }
                    data-target={ "#" + category.id + "-tagList"}
                    onClick ={(e) => e.stopPropagation()}
                  >
                    <i className="mdi mdi-chevron-right" />
                  </a>
                  <header>
                    { category.name }
                  </header>
                </div>
                <div id={ category.id + "-tagList" }
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
