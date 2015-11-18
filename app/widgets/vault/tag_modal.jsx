import React from 'react';

import Modal from '../../widgets/admin/modal_widget.jsx';
import IndeterminateCheckBox from '../../widgets/general/indeterminate_checkbox_widget.jsx';


export default React.createClass({
  propTypes: {
    tagCategoriesWithItems: React.PropTypes.object.isRequired,
    selectedRecords: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      targetItemStates: {},
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  getInitialItemState: function(item) {
    let selectedRecordsWithThatTagItem = this.props.selectedRecords.filter((record) => {
      return record.get("tag_items").map((x) => { return x.get("id"); }).includes(item.get("id"));
    }).count();

    if(selectedRecordsWithThatTagItem === 0) {
      return "unchecked";

    } else if(recordsWithThatItem === this.props.selectedRecords.count()) {
      return "checked";

    } else {
      return "indeterminate";
    }
  },


  getCurrentItemState: function(item) {
    if(this.state.targetItemStates.hasOwnProperty(item.get("id"))) {
      console.log("RETURNING " + this.state.targetItemStates[item.get("id")]);
      return this.state.targetItemStates[item.get("id")];
    } else {
      return this.getInitialItemState(item);
    }
  },


  onItemChange: function(e) {
    e.preventDefault();

    let newState;

    console.log(e.target.checked);
    console.log(e.target.indeterminate);

    if(e.target.checked === false && e.target.indeterminate === false) {
      newState = "indeterminate";

    } else if(e.target.checked === true) {
      newState = "indeterminate";

    } else if(e.target.indeterminate === true) {
      newState = "checked";
    }

    let newTargetItemStates = this.state.targetItemStates;
    newTargetItemStates[e.target.dataset.categoryItemId] = newState;

    this.setState({
      targetItemStates: newTargetItemStates
    });
  },


  render: function() {
    return (
      <Modal ref="modal" headerTextKey="widgets.vault.file_browser.modals.tag.title">
        {this.props.tagCategoriesWithItems.map((category) => {
          if(category.get("tag_items").size !== 0) {
            return (
              category.get("tag_items").map((item) => {
                return (
                  <div className="row small-padding" key={item.get("id")}>
                    <div className="col-md-6">
                      {item.get("name")}
                    </div>
                    <div class="col-md-6">
                      <input type="radio" />
                      <input type="radio" />
                      <input type="radio" />
                    </div>
                  </div>);
              })
            )
          }
        })}
      </Modal>
    );
  }
});
