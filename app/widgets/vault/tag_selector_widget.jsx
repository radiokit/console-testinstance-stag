import React from 'react';
import { Link } from 'react-router';
import QueryString from 'query-string-object';

import '../../assets/stylesheets/widgets/vault/tag_selector.scss';


export default React.createClass({
  propTypes: {
    categories: React.PropTypes.object.isRequired,
    path: React.PropTypes.string.isRequired,
  },


  contextTypes: {
    location: React.PropTypes.object,
  },


  buildItemClassName: function(item) {
    return "tag-item" + (this.isItemSelected(item) ? " active" : "");
  },


  getSelectedItemIds: function() {
    let query = QueryString(this.context.location.search.substr(1));

    if(query.hasOwnProperty("tag_item_id") && typeof(query["tag_item_id"].slice) === "function") {
      return query["tag_item_id"];

    } else {
      return [];
    }
  },


  isItemSelected: function(item) {
    if(this.getSelectedItemIds().indexOf(item.get("id")) !== -1) {
      return true;

    } else {
      return false;

    }
  },


  encodeItemsToUri: function(items) {
    return this.props.path + "?" + QueryString.stringify({tag_item_id: items});
  },


  buildItemHref: function(item) {
    let selectedItemsIds = this.getSelectedItemIds();

    if(this.isItemSelected(item)) {
      selectedItemsIds.splice(selectedItemsIds.indexOf(item.get("id")), 1);
      return this.encodeItemsToUri(selectedItemsIds);

    } else {
      selectedItemsIds.push(item.get("id"));
      return this.encodeItemsToUri(selectedItemsIds);
    }
  },


  render: function() {
    if(this.props.categories.size !== 0) {
      return (
        <div className="widgets-vault-tag-selector--container small-padding style-default-light">
          {this.props.categories.map((category) => {
            if(category.get("tag_items").size !== 0) {
              return (
                <ul key={category.get("id")} className="nav nav-pills nav-stacked">
                  <li className="tag-category"><small>{category.get("name")}</small></li>
                  {category.get("tag_items").map((item) => {
                    return (<li key={item.get("id")} className={this.buildItemClassName(item)}>
                      <Link to={this.buildItemHref(item)}>
                        {item.get("name")}
                      </Link>
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
