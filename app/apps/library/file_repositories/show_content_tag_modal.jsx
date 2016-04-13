import React from 'react';
import Translate from 'react-translate-component';
import _ from 'lodash';
import ReactDOM from 'react-dom';

import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';

const ShowContentTagModal = React.createClass({

  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
    tagCategories: React.PropTypes.object.isRequired,
    initialAssociations: React.PropTypes.object,
  },

  getInitialState() {
    return {
      index: 0,
      shouldUpdate: true,
      selectedTagIds:[],
      deselectedTagIds:[],
    }
  },

  calculateTagFrequencies(props) {
    // console.log(props.initialAssociations);
    // console.log(props.initialAssociations.toJS());
    this.tagFrequencies = {};
    props.initialAssociations.forEach((record) => {
      this.tagFrequencies[record.get("tag_item_id")] = this.tagFrequencies[record.get("tag_item_id")] + 1 || 1;
    });
  },

  componentDidMount() {
   this.calculateTagFrequencies(this.props);
  },

  componentWillReceiveProps(nextProps) {
      this.calculateTagFrequencies(nextProps);
      this.setState({
        shouldUpdate: true
      });
  },

  selectTagId(tagId) {
    console.log("selected tag " + tagId);
    let selectedTagIds = this.state.selectedTagIds;
    selectedTagIds.push(tagId);
    this.setState({
      shouldUpdate: false,
      selectedTagIds: selectedTagIds,
      deselectedTagIds: _.pull(this.state.deselectedTagIds, tagId),
    });
  },

  deselectTagId(tagId) {
    console.log("deselected tag " + tagId);
    let deselectedTagIds = this.state.deselectedTagIds;
    deselectedTagIds.push(tagId);
    this.setState({
      shouldUpdate: false,
      selectedTagIds: _.pull(this.state.selectedTagIds, tagId),
      deselectedTagIds: deselectedTagIds,
    });
  },

  resetTagId(tagId) {
    console.log("reset tag " + tagId);
    this.setState({
      shouldUpdate: false,
      selectedTagIds: _.pull(this.state.selectedTagIds, tagId),
      deselectedTagIds: _.pull(this.state.deselectedTagIds, tagId),
    });
  },

  show() {
    this.setState({
      shouldUpdate:true
    })
    this.refs.modal.show();
  },

  getTagStatus(tagId) {
    let occuranceCount = (this.tagFrequencies && this.tagFrequencies[tagId]) || 0;
    if (occuranceCount === 0) {
      return {
        checked: false,
        indeterminate: false
      }
    }
    else {
      let tagForAll = occuranceCount === this.props.selectedRecordIds.count();
      return {
        checked: tagForAll,
        indeterminate: !tagForAll,
      };
    }
  },

  createAssociation(association) {

    console.log("creating association file " + association.recordId + " ->  tag " + association.tagId);
    // this.recordIdUpdateComplete(association.recordId);
    window.data
      .record("vault", "Data.Tag.Association")
      .on("error", () => {
        //FIXME
        console.log("error on file " + association.recordId);
      })
      .on("loaded", () => {
        console.log("loaded file " + association.recordId);
        if (this.isMounted()) {
          console.log("is mounted");
          if (this.state.insertCount === 0) {
            console.log("inserCount is 0");
            if (this.state.deleteCompleted) {
              this.recordIdUpdateComplete(association.recordId);
            } else {
              this.setState({
                insertCompleted: true
              });
            }
          } else {
            console.log("decrement inserts to " + this.state.insertCount - 1);
            this.setState({
              insertCount: this.state.insertCount - 1
            })
          }
        }
      })
      .create({
       tag_item_id: association.tagId,
       record_file_id: association.recordId
      });
  },

  recordIdUpdateComplete(recordId) {
    this.setState({
      index : this.state.index  + 1
    });
  },

  deleteAssociation(tagId) {

  },

  onPerform(index, recordId) {
    this.setState({
      shouldUpdate: true,
    });
    console.log("FILE ID: " + recordId);
    let newAssociations = this.state.selectedTagIds
      .map((tagId) =>{return {tagId: tagId, recordId: recordId}})
      .filter((association) => {return !_.some(this.props.initialAssociations.toJS(), association)});
    console.log("NEWASS.. " + newAssociations);
    if(newAssociations.length > 0){
      this.setState({
        insertCount: newAssociations.length - 1,
        insertCompleted: false,
        deleteCompleted: true,
      });
      newAssociations.forEach(this.createAssociation);
    }else{
      console.log("no new ass..");
      this.recordIdUpdateComplete(recordId);
    }
  },

  renderCategoryTags: function(category) {
      return (
        <div>
          <ul className="list">
            {category.tag_items && _.sortBy(category.tag_items,'name').map((tag) => {

                let onTagSelected = this.selectTagId.bind(null, tag.id);
                let onTagDeselected = this.deselectTagId.bind(null, tag.id);
                let onTagRestored = this.resetTagId.bind(null, tag.id);
                let tagStatus = this.getTagStatus(tag.id);
                // console.log("rendering tag: " + tag.name + " with status " + JSON.stringify(tagStatus));
                return (
                  <li key={ tag.id }>
                    <div className="card-head card-head-xs">
                      <header>
                        { tag.name }
                      </header>
                      <div className="tools">
                        <Checkbox
                          checked={tagStatus.checked}
                          onSelected={onTagSelected}
                          onDeselected={onTagDeselected}
                          onRestore={onTagRestored}
                          indeterminate={tagStatus.indeterminate} />
                      </div>
                    </div>
                  </li>
                );
              }) }
          </ul>
        </div>
      );
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.shouldUpdate;
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
      checked: this.props.checked,
      indeterminate: this.props.indeterminate,
    }
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        checked: nextProps.checked,
        indeterminate: nextProps.indeterminate,
      });
  },

  onChange(e) {
    if (this.state.checked) {
      this.props.onDeselected();
      this.setState({
        checked: false,
        indeterminate: false
      });
    } else {
      if (this.props.indeterminate && !this.state.indeterminate) {
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
