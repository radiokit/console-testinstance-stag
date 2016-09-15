import React from 'react';
import classnames from 'classnames';

const TagItemList = React.createClass({

  propTypes: {
    selectedTagItems: React.PropTypes.object.isRequired,
    category: React.PropTypes.object.isRequired,
    onTagSelected: React.PropTypes.func.isRequired,
  },

  isTagSelected(tag) {
    return !!this.props.selectedTagItems.find(item => item.get('id') === tag.get('id'));
  },

  handleTagSelection(tag) {
    this.props.onTagSelected(tag, this.props.category);
  },

  render() {
    return (
      <div>
        <ul className="list">
          { this.props.category
              .get('tag_items')
              .sortBy(item => item.get('name'))
              .map((tag) => {
                const onTagSelected = () => this.handleTagSelection(tag);
                const tagClassNames = classnames('card-head card-head-sm', {
                  'ShowSidebarPartial__tag': !this.isTagSelected(tag),
                  'ShowSidebarPartial__tag--selected': this.isTagSelected(tag),
                });
                return (
                  <li key={ tag.get('id') }>
                    <div className={tagClassNames} onClick={onTagSelected} >
                      <header>
                        { tag.get('name') }
                      </header>
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    );
  },
});

export default TagItemList;
