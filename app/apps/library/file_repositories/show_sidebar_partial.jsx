import React from 'react';
import _ from 'lodash';

import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import Translate from 'react-translate-component';


export default React.createClass({

  propTypes: {
    record: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    categories: React.PropTypes.object.isRequired,
    filter: React.PropTypes.object,
    onFilterUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      categories: []
    };
  },

  onTagCategorySelected(tag) {
    this.props.onTagFilterUpdate(tag);
  },

  onRestoreDefaults() {
    this.props.onTagFilterUpdate(null);
  },

  renderCategoryTags: function(category) {
      return (
        <div>
          <ul className="list">
            {category.tag_items && _.sortBy(category.tag_items,'name').map((tag) => {
                return (
                  <li key={ tag.id }>
                    <div className="card-head card-head-sm">
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
        { categories.length > 0 && _.sortBy(categories,'name').map((category) => {
            return (
              <div id={ category.name }>
                <div className="expanded">
                  <div className="card-head" aria-expanded="true">
                    <a className={ "btn btn-flat ink-reaction btn-icon-toggle " + (category.tag_items.length === 0 ? "disabled" : "") }
                      data-toggle="collapse" data-parent={ "#" + category.name }
                      data-target={ "#" + category.name + "-tagList" }>
                      <i className="mdi mdi-chevron-right" />
                    </a>
                    <header>
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
