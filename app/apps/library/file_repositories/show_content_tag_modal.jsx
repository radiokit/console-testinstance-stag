import React from 'react';
import Translate from 'react-translate-component';
import _ from 'lodash';
import ReactDOM from 'react-dom';

import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';

const ShowContentTagModal = React.createClass({

  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
    tagCategories: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      index: 0,
      selectedTagIds:[],
      deselectedTagIds:[],
      filesData: null
    }
  },

  selectTagId(tagId) {
    console.log("selected tag " + tagId);
    let selectedTagIds = this.state.selectedTagIds;
    selectedTagIds.push(tagId);
    this.setState({
      selectedTagIds: selectedTagIds,
      deselectedTagIds: _.pull(this.state.deselectedTagIds, tagId),
    });
  },

  deselectTagId(tagId) {
    console.log("deselected tag " + tagId);
    let deselectedTagIds = this.state.deselectedTagIds;
    deselectedTagIds.push(tagId);
    this.setState({
      selectedTagIds: _.pull(this.state.selectedTagIds, tagId),
      deselectedTagIds: deselectedTagIds,
    });
  },

  resetTagId(tagId) {
    console.log("reseted tag " + tagId);
    this.setState({
      selectedTagIds: _.pull(this.state.selectedTagIds, tagId),
      deselectedTagIds: _.pull(this.state.deselectedTagIds, tagId),
    });
  },

  show() {
    this.refs.modal.show();
  },

  getTagStatus(tagId) {
    return {
      selected: true,
      indeterminate: true,
    };
  },

  onTagAppliedSucess(record) {
    this.setState({
      index: this.state.index + 1
    });
  },

  onPerform(index, recordId) {
    this.onTagAppliedSucess();
  },

  renderCategoryTags: function(category) {
      return (
        <div>
          <ul className="list">
            {category.tag_items && _.sortBy(category.tag_items,'name').map((tag) => {

                let onTagSelected = this.selectTagId.bind(null, tag.id);
                let onTagDeselected = this.deselectTagId.bind(null, tag.id);
                let onTagRestored = this.resetTagId.bind(null, tag.id);
                return (
                  <li key={ tag.id }>
                    <div className="card-head card-head-xs">
                      <header>
                        { tag.name }
                      </header>
                      <div className="tools">
                        <Checkbox
                          onSelected={onTagSelected}
                          onDeselected={onTagDeselected}
                          onRestore={onTagRestored}
                          indeterminate={this.getTagStatus(tag.id).indeterminate} />
                      </div>
                    </div>
                  </li>
                );
              }) }
          </ul>
        </div>
      );
  },

  render() {
    let categories = this.props.tagCategories.toJS();
    return (
      <ModalForEach
        ref="modal"
        onPerform={this.onPerform}
        contentPrefix="widgets.vault.file_browser.modals.tag"
        recordIds={this.props.selectedRecordIds}
        index={this.state.index}>
        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.tag.message.confirmation"
            count={this.props.selectedRecordIds.count()} />
          {categories.length > 0 && _.sortBy(categories,'name').map((category) => {
            if(category.tag_items.length === 0){
              return null;
            } else return (
              <div id={ category.name + "-modal"}>
                <div className="expanded">
                  <div className="card-head" aria-expanded="true">
                    <a className={ "btn btn-flat ink-reaction btn-icon-toggle " + (category.tag_items.length === 0 ? "disabled" : "") }
                      data-toggle="collapse" data-parent={ "#" + category.name + "-modal" }
                      data-target={ "#" + category.name + "-tagList-modal" }>
                      <i className="mdi mdi-chevron-right" />
                    </a>
                    <header>
                      { category.name }
                    </header>
                  </div>
                  <div id={ category.name + "-tagList-modal" }
                    className="collapse in"
                    aria-expanded="true">
                    { this.renderCategoryTags(category) }
                  </div>
                </div>
              </div>
            )
          }) }
        </div>
        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.tag.message.progress" />
        </div>
        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.tag.message.acknowledgement"
            count={this.props.selectedRecordIds.count()} />
        </div>
        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.tag.message.cancelled" />
        </div>
      </ModalForEach>
    );
  }
});

const Checkbox = React.createClass({

  propTypes: {
    checked: React.PropTypes.bool,
    indeterminate: React.PropTypes.bool,
    onSelected: React.PropTypes.func,
    onDeselected: React.PropTypes.func,
    onRestore: React.PropTypes.func
  },

  getInitialState() {
    return {
      checked: false,
      indeterminate: false,
    }
  },

  onChange(e) {
    if(this.state.checked){
      this.props.onDeselected();
      this.setState({
        checked: false,
        indeterminate: false
      });
    }
    else{
      if(this.props.indeterminate && !this.state.indeterminate){
        this.props.onRestore();
        this.setState({
          checked: false,
          indeterminate: true,
        });
      } else {
        this.props.onSelected();
        this.setState({
          checked: true,
          indeterminate: false
        });
      }
    }
  },

  componentDidMount() {
    if (this.state.indeterminate) {
      this.setIndeterminate(true);
    }
  },

  componentDidUpdate(previousProps) {
    this.setIndeterminate(this.state.indeterminate);
  },

  setIndeterminate(indeterminate) {
    const node = ReactDOM.findDOMNode(this);
    node.indeterminate = indeterminate;
  },

  render() {
    return <input type="checkbox" checked={this.state.checked} onChange={this.onChange}/>;
  }
});

export default ShowContentTagModal;
