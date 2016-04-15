import React from 'react';
import _ from 'lodash';

import Translate from 'react-translate-component';

export default React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    onTagFilterUpdate: React.PropTypes.func.isRequired,
  },

  selectCategory(category) {
    this.props.onTagFilterUpdate(category.tag_items);
  },

  selectTag(tag) {
    this.props.onTagFilterUpdate([tag]);
  },

  onRestoreDefaults() {
    this.props.onTagFilterUpdate([]);
  },

  renderCategoryTags: function(category) {
      return (
        <div>
          <ul className="list">
            {category.tag_items && _.sortBy(category.tag_items,'name').map((tag) => {
                let onTagSelected = this.selectTag.bind(null, tag);
                return (
                  <li key={ tag.id }>
                    <div className="card-head card-head-sm" onClick={onTagSelected}>
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
      <div>
        <Translate component="div" content={this.props.contentPrefix + ".tags.all_tags"} className="card-head" onClick={this.onRestoreDefaults}/>
        { categories.length > 0 && _.sortBy(categories,'name').map((category) => {
            let onCategorySelected = this.selectCategory.bind(null, category);
            return (
              <div id={ category.name } key={category.name}>
                <div className="expanded">
                  <div className="card-head" aria-expanded="true">
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
                    className="collapse in"
                    aria-expanded="true">
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
