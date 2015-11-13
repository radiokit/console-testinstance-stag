import React from 'react';
import Translate from 'react-translate-component';


import '../../assets/stylesheets/widgets/vault/tag_selector.scss';


export default React.createClass({
  propTypes: {
    categories: React.PropTypes.object.isRequired
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
                  {category.get("tag_items").map((item) => {return <li key={item.get("id")} className="tag-item"><a>{item.get("name")}</a></li>; })}
                </ul>
              )
            }
          })}
        </div>
      );
    }
  },
});
