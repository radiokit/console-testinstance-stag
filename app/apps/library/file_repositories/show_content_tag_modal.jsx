import React from 'react';
import Translate from 'react-translate-component';
import RadioKit from '../../../services/RadioKit';
import {
  includes,
  pull,
  some,
  sortBy,
  get as getValue,
} from 'lodash';
import classnames from 'classnames';

import Checkbox from '../../../widgets/general/indeterminate_checkbox_widget.jsx';
import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';

import './ShowContentTagModal.scss';
const ShowContentTagModal = React.createClass({

  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
    tagCategories: React.PropTypes.object.isRequired,
    initialAssociations: React.PropTypes.object,
    onDismiss: React.PropTypes.func,
  },

  getInitialState() {
    return {
      index: 0,
      shouldUpdate: true,
      selectedTagIds: [],
      deselectedTagIds: [],
    };
  },

  componentDidMount() {
    this.calculateTagFrequencies(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.calculateTagFrequencies(nextProps);
    this.setState({
      shouldUpdate: true,
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.shouldUpdate;
  },

  getTagStatus(tagId) {
    const occuranceCount = (this.tagFrequencies && this.tagFrequencies[tagId]) || 0;
    if (occuranceCount === 0) {
      return {
        checked: false,
        indeterminate: false,
      };
    }
    const tagForAll = occuranceCount === this.props.selectedRecordIds.count();
    return {
      checked: tagForAll,
      indeterminate: !tagForAll,
    };
  },

  calculateTagFrequencies(props) {
    this.categoryFrequencies = new Set();
    this.tagFrequencies = {};
    props.initialAssociations.forEach((record) => {
      const tagItemId = record.get('tag_item_id');
      this.tagFrequencies[tagItemId] = this.tagFrequencies[tagItemId] + 1 || 1;
    });
    Object.keys(this.tagFrequencies).forEach((tagId) => {
      this.props.tagCategories.toJS().forEach((category) => {
        if (includes(category.tag_items.map((tag) => tag.id), tagId)) {
          this.categoryFrequencies.add(category.id);
        }
      });
    });
  },

  selectTagId(tagId) {
    const selectedTagIds = this.state.selectedTagIds;
    selectedTagIds.push(tagId);
    this.setState({
      shouldUpdate: false,
      selectedTagIds,
      deselectedTagIds: pull(this.state.deselectedTagIds, tagId),
    });
  },

  deselectTagId(tagId) {
    const deselectedTagIds = this.state.deselectedTagIds;
    deselectedTagIds.push(tagId);
    this.setState({
      shouldUpdate: false,
      selectedTagIds: pull(this.state.selectedTagIds, tagId),
      deselectedTagIds,
    });
  },

  resetTagId(tagId) {
    this.setState({
      shouldUpdate: false,
      selectedTagIds: pull(this.state.selectedTagIds, tagId),
      deselectedTagIds: pull(this.state.deselectedTagIds, tagId),
    });
  },

  show() {
    this.setState({
      shouldUpdate: true,
      index: 0,
      selectedTagIds: [],
      deselectedTagIds: [],
    });
    this.refs.modal.show();
  },

  handleDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  createAssociation(association) {
    RadioKit
      .record('vault', 'Data.Tag.Association')
      .on('loaded', () => {
        if (this.state.insertCount === 0) {
          if (this.state.deleteCompleted) {
            this.recordIdUpdateComplete(association.record_file_id);
          } else {
            this.setState({
              insertCompleted: true,
            });
          }
        } else {
          this.setState({
            insertCount: this.state.insertCount - 1,
          });
        }
      })
      .create({
        tag_item_id: association.tag_item_id,
        record_file_id: association.record_file_id,
      });
  },

  recordIdUpdateComplete() {
    this.setState({
      index: this.state.index + 1,
    });
  },

  isCategoryExpanded(category) {
    return this.categoryFrequencies && this.categoryFrequencies.has(category.id);
  },

  deleteAssociation(association) {
    RadioKit.record('vault', 'Data.Tag.Association', association.id)
      .on('loaded', () => {
        if (this.state.deleteCount === 0) {
          if (this.state.insertCompleted) {
            this.recordIdUpdateComplete(association.record_file_id);
          } else {
            this.setState({
              deleteCompleted: true,
            });
          }
        } else {
          this.setState({
            deleteCount: this.state.deleteCount - 1,
          });
        }
      })
      .destroy();
  },

  handlePerform(index, recordId) {
    this.setState({
      shouldUpdate: true,
    });
    const newAssociations = this.state.selectedTagIds
      .map(
        tagId => ({
          tag_item_id: tagId,
          record_file_id: recordId,
        })
      )
      .filter(
        association =>
          !(some(this.props.initialAssociations.toJS(), association))
      );
    const unwantedAssociations = this.props.initialAssociations.toJS()
      .filter((a) => a.record_file_id === recordId)
      .filter((a) => includes(this.state.deselectedTagIds, a.tag_item_id));
    const insertCompleted = newAssociations.length === 0;
    const deleteCompleted = unwantedAssociations.length === 0;
    if (insertCompleted && deleteCompleted) {
      this.recordIdUpdateComplete(recordId);
    } else {
      this.setState({
        insertCount: newAssociations.length - 1,
        deleteCount: unwantedAssociations.length - 1,
        insertCompleted,
        deleteCompleted,
      });
      newAssociations.forEach(this.createAssociation);
      unwantedAssociations.forEach(this.deleteAssociation);
    }
  },

  renderCategoryTags(category) {
    return (
      <div>
        <ul className="list">
          { category.tag_items && sortBy(category.tag_items, 'name').map((tag) => {
            const onTagSelected = () => this.selectTagId(tag.id);
            const onTagDeselected = () => this.deselectTagId(tag.id);
            const onTagRestored = () => this.resetTagId(tag.id);
            const tagStatus = this.getTagStatus(tag.id);
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
                      indeterminate={tagStatus.indeterminate}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },

  render() {
    const categories = this.props.tagCategories.toJS();
    return (
      <ModalForEach
        ref="modal"
        onPerform={this.handlePerform}
        contentPrefix="widgets.vault.file_browser.modals.tag"
        recordIds={this.props.selectedRecordIds}
        onDismiss={this.handleDismiss}
        index={this.state.index}
      >
        <div className="ShowContentTagModal">
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.tag.message.confirmation"
            count={this.props.selectedRecordIds.count()}
          />
          {categories.length > 0 && sortBy(categories, 'name').map((category) => {
            if (getValue(category, ['tag_items', 'length'], 0) === 0) {
              return null;
            }

            let expanded = this.isCategoryExpanded(category);
            let toggleClasses = classnames('btn btn-icon-toggle', {
              disabled: getValue(category, ['tag_items', 'length'], 0) === 0,
              collapsed: !expanded,
            });
            return (
              <div key={category.id} id={ `${category.id}-modal` }>
                <div className="expanded">
                  <div
                    className="card-head"
                    aria-expanded="true"
                    data-toggle="collapse"
                    data-parent={ `#${category.id}-modal` }
                    data-target={ `#${category.id}-tagList-modal` }
                  >
                    <a className={toggleClasses} >
                      <i className="mdi mdi-chevron-right" />
                    </a>
                    <header>
                      { category.name }
                    </header>
                  </div>
                  <div
                    id={ `${category.id}-tagList-modal` }
                    className={ expanded ? 'collapse in' : 'collapse'}
                    aria-expanded={expanded}
                  >
                    { this.renderCategoryTags(category) }
                  </div>
                </div>
              </div>
            );
          }) }
        </div>
        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.tag.message.progress"
          />
        </div>
        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.tag.message.acknowledgement"
            count={this.props.selectedRecordIds.count()}
          />
        </div>
        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.tag.message.cancelled"
          />
        </div>
      </ModalForEach>
    );
  },
});

export default ShowContentTagModal;
