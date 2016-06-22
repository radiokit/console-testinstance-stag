import React from 'react';

import TagRow from './TagRow.jsx';

const TagList = React.createClass({

  propTypes: {
    category: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onDataChanged: React.PropTypes.func.isRequired,
  },

  render() {
    return (
      <div className="ShowTagsSchemaPartial">
        <ul className="list">
          {
            this.props.category
              .get('tag_items')
              .sortBy(item => item.get('name'))
              .map((tag) =>
                <TagRow
                  key={tag.get('id')}
                  tag={tag}
                  onDataChanged={this.props.onDataChanged}
                  contentPrefix={this.props.contentPrefix}
                />
              )
          }
        </ul>
      </div>
    );
  },
});

export default TagList;
