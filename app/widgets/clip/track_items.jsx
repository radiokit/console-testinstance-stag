import React from 'react';
import {
  OrderedSet,
  is,
} from 'immutable';
import TrackItem from './track_item.jsx';

import {
  mergeCollections,
  applyModificationToCollection,
  crossfadeCollection,
} from './track_items_utils';

const TrackItems = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    items: React.PropTypes.object.isRequired,
    offsetStart: React.PropTypes.number.isRequired,
    offsetLength: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    fadesOf: React.PropTypes.oneOf(['clip', 'item', null]),
    onClick: React.PropTypes.func,
    onItemChange: React.PropTypes.func,
    onItemSelect: React.PropTypes.func,
    onClipChange: React.PropTypes.func,
  },

  getInitialState() {
    return {
      selected: OrderedSet(),
    };
  },

  setSelected(selected, cb) {
    const { onItemSelect } = this.props;
    this.setState({ selected }, () => {
      if (selected && selected.count() === 1 && onItemSelect) {
        const itemID = selected.first();
        const item = this.props.items.find(
          trackItem => trackItem.get('id') === itemID
        );
        onItemSelect(item);
      }
      cb && cb(selected);
    });
  },

  handleItemClick(e, item) {
    if (e.shiftKey) {
      if (this.isItemSelected(item)) {
        this.deleteFromSelected(item);
      } else {
        this.addToSelected(item);
      }
    } else {
      this.replaceSelected(item);
      this.props.onClick && this.props.onClick(e);
    }
  },

  handleBoardClick(e) {
    (e.button === 0) && !this.mouseMoved && this.clearSelected();
  },

  handleMouseMove() {
    this.mouseMoved = true;
  },

  handleMouseDown(e) {
    (e.button === 0) && (this.mouseMoved = false);
  },

  handleItemModification(modification, item) {
    const applyModificationToSelected = () => {
      const selectedItems = this.props.items.filter(this.isItemSelected);

      const modifiedItems = applyModificationToCollection(selectedItems, modification);

      const itemsMergedWithModified = mergeCollections(this.props.items, modifiedItems);

      const itemsCrossfaded = crossfadeCollection(itemsMergedWithModified);

      itemsCrossfaded.forEach((mergedItem, key) => {
        if (!is(mergedItem, this.props.items.get(key))) {
          this.props.onItemChange && this.props.onItemChange(mergedItem, this.props.items.get(key));
        }
      });
    };

    if (this.isItemSelected(item)) {
      applyModificationToSelected();
    } else {
      this.replaceSelected(item, applyModificationToSelected);
    }
  },

  isItemSelected(contextItem) {
    return !!this.state.selected.find(id => id === contextItem.get('id'));
  },

  addToSelected(contextItem, cb) {
    this.setSelected(this.state.selected.add(contextItem.get('id')), cb);
  },

  deleteFromSelected(contextItem, cb) {
    this.setSelected(this.state.selected.filter(id => id !== contextItem.get('id')), cb);
  },

  clearSelected(cb) {
    this.setSelected(this.state.selected.clear(), cb);
  },

  replaceSelected(contextItem, cb) {
    this.setSelected(this.state.selected.clear().add(contextItem.get('id')), cb);
  },

  render() {
    const {
      items,
      offsetStart,
      offsetLength,
      width,
      height,
      fadesOf,
      onClipChange,
      style,
    } = this.props;

    return (
      <div style={style}
        onClick={this.handleBoardClick}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
      >
        { items.toArray().map((item, key) => {
          if (
            item.get('position') < offsetStart + offsetLength ||
            item.get('position') + item.get('offsetLength') > offsetStart
          ) {
            return (
              <TrackItem key={item.get('id') || key}
                selected={this.isItemSelected(item)}
                offsetStart={offsetStart}
                offsetLength={offsetLength}
                width={width}
                height={height}
                item={item}
                fadesOf={fadesOf}
                onItemModification={this.handleItemModification}
                onClipChange={onClipChange}
                onClick={this.handleItemClick}
              />
            );
          }
          return null;
        }).filter(v => !!v) }
      </div>
    );
  },
});

export default TrackItems;
