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
    tagFilter: React.PropTypes.array,
  },

  getInitialState() {
    return {
      selectedCategoryId: null,
    };
  },

  selectCategory(category) {
    this.props.onTagFilterUpdate(category.tag_items);
    this.setState({
      selectedCategoryId: category.id,
    });
  },

  selectTag(tag) {
    this.props.onTagFilterUpdate([tag]);
    this.setState({
      selectedCategoryId: null,
    });
  },

  onClearFilter() {
    this.props.onTagFilterUpdate([]);
    this.setState({
      selectedCategoryId: null,
    });
  },

  isCategorySelected(category) {
    return this.state.selectedCategoryId === category.id;
  },

  isTagSelected(tag){
    return _.some(this.props.tagFilter, tag);
  },

  renderCategoryTags: function(category) {
      return (
        <div>
          <ul className="list">
            {category.tag_items && _.sortBy(category.tag_items,'name').map((tag) => {
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
              }) }
          </ul>
        </div>
      );
  },

  render: function () {
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
            return (
              <div id={ category.id } key={category.id}>
                <div className="expanded">
                  <div className={headerClasses} aria-expanded="true">
                    <a className={toggleClasses}
                      data-toggle="collapse" data-parent={ "#" + category.id }
                      data-target={ "#" + category.id + "-tagList" }>
                      <i className="mdi mdi-chevron-right" />
                    </a>
                    <header onClick={onCategorySelected} >
                      { category.name }
                    </header>
                  </div>
                  <div id={ category.id + "-tagList" }
                    className="collapse"
                    aria-expanded="false">
                    { this.renderCategoryTags(category) }
                  </div>
                </div>
              </div>
            )
          }) }
      </div>
    );
  }
});

export default ShowSidebarPartial;
