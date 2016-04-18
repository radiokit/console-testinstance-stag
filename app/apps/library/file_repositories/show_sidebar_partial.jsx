import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

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
                let onTagSelected = this.selectTag.bind(null, tag);
                return (
                  <li key={ tag.id }>
                    <div className={"card-head card-head-sm tag" + (this.isTagSelected(tag) ? "--selected" : "")} onClick={onTagSelected}>
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
    let categories = this.props.record.toJS().tag_categories;
    return (
      <div className="ShowSidebarPartial">
        <div className={"card-head allTags" + (!this.props.tagFilter.length > 0 ? "--selected" : "")}>
          <header onClick={this.onClearFilter}>
            <Translate content={this.props.contentPrefix + ".tags.all_tags"} />
          </header>
        </div>
        { categories.length > 0 && _.sortBy(categories,'name').map((category) => {
            let onCategorySelected = this.selectCategory.bind(null, category);
            return (
              <div id={ category.name } key={category.name}>
                <div className="expanded">
                  <div className={"card-head category" + (this.isCategorySelected(category) ? "--selected" : "")} aria-expanded="true">
                    <a className={ "btn btn-flat ink-reaction btn-icon-toggle " + (category.tag_items.length === 0 ? "disabled" : "") }
                      data-toggle="collapse" data-parent={ "#" + category.name }
                      data-target={ "#" + category.name + "-tagList" }>
                      <i className="mdi mdi-chevron-right" />
                    </a>
                    <header onClick={onCategorySelected} >
                      { category.name }
                    </header>
                  </div>
                  <div id={ category.name + "-tagList" }
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
