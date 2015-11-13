import React from 'react';

import '../../assets/stylesheets/widgets/vault/tag_selector.scss';


export default React.createClass({
  propTypes: {
    tagCategoriesWithItems: React.PropTypes.object.isRequired,
    selectedTagItemIds: React.PropTypes.arrayOf(React.PropTypes.string),
    onTagItemChange: React.PropTypes.func
  },


  buildItemClassName: function(item) {
    return "tag-item" + (this.props.selectedTagItemIds.indexOf(item.get("id")) !== -1 ? " active" : "");
  },


  isItemSelected: function(itemId) {
    if(this.props.selectedTagItemIds.indexOf(itemId) !== -1) {
      return true;

    } else {
      return false;

    }
  },


  onItemClick: function(e) {
    e.preventDefault();
    if(this.props.onTagItemChange) {
      this.props.onTagItemChange(e.target.dataset.categoryItemId, this.props.selectedTagItemIds.indexOf(e.target.dataset.categoryItemId) === -1);
    }
  },


  render: function() {
    if(this.props.tagCategoriesWithItems.size !== 0) {
      return (
        <div className="widgets-vault-tag-selector--container small-padding style-default-light">
          {this.props.tagCategoriesWithItems.map((category) => {
            if(category.get("tag_items").size !== 0) {
              return (
                <ul key={category.get("id")} className="nav nav-pills nav-stacked">
                  <li className="tag-category"><small>{category.get("name")}</small></li>
                  {category.get("tag_items").map((item) => {
                    return (<li key={item.get("id")} className={this.buildItemClassName(item)}>
                      <a onClick={this.onItemClick} data-category-item-id={item.get("id")}>
                        {item.get("name")}
                      </a>
                    </li>);
                  })}
                </ul>
              )
            }
          })}
        </div>
      );
    }
  },
});
