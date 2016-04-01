import React from 'react';
import Translate from 'react-translate-component';

import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';

export default React.createClass({

  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
    tagCategories: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      index: 0,
      selectedTagIds:[],
    }
  },

  show() {
    this.refs.modal.show();
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
                return (
                  <li key={ tag.id }>
                    <div className="card-head card-head-xs">
                      <header>
                        { tag.name }
                      </header>
                      <div className="tools">
                        <input type="checkbox" />
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
