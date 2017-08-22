import React, { PropTypes } from 'react';

import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';

/* eslint react/no-multi-comp:0 */
const TagItemScopeElement = React.createClass({
  propTypes: {
    onClick: PropTypes.func.isRequired,
    tagItemMetadata: PropTypes.object.isRequired,
  },

  onClick() {
    this.props.onClick(this.props.tagItemMetadata);
  },

  render() {
    const item = this.props.tagItemMetadata;

    return (
      <li className="tile">
        <a onClick={this.onClick} className="tile-content">
          <div className="tile-text">
            {item.getIn(['tag_item', 'name'])}
          </div>
        </a>
      </li>
    );
  },
});

export default React.createClass({
  propTypes: {
    availableTagMetadatas: PropTypes.object.isRequired,
    onChooseTagItem: PropTypes.func.isRequired,
  },

  renderTagItem(tagItemMetadata) {
    return (
      <TagItemScopeElement
        key={tagItemMetadata.get('id')}
        tagItemMetadata={tagItemMetadata}
        onClick={this.props.onChooseTagItem}
      />
    );
  },

  renderList() {
    const tagItems = this.props.availableTagMetadatas.toArray().map(this.renderTagItem);

    return (
      <ul className="list divider-full-bleed">
        {tagItems}
      </ul>
    );
  },

  render() {
    return (
      <Section>
        <GridRow>
          <GridCell size="small" center>
            <Card
              contentPrefix="apps.dj.tag_scope"
              cardPadding={false}
              contentElement={this.renderList()}
            />
          </GridCell>
        </GridRow>
      </Section>
    );
  },
});
