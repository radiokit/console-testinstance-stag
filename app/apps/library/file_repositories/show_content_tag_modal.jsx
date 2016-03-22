import React from 'react';
import Translate from 'react-translate-component';

import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';


export default React.createClass({
  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
    tagCategories: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      index: 0
    }
  },

  show: function() {
    this.refs.modal.show();
  },

  onTagAppliedSucess: function(record) {
    this.setState({
      index: this.state.index + 1
    });
  },

  onPerform: function(index, recordId) {
    this.onTagAppliedSucess();
  },


  render: function() {
    return (
      <ModalForEach ref="modal" onPerform={this.onPerform} contentPrefix="widgets.vault.file_browser.modals.tag" recordIds={this.props.selectedRecordIds} index={this.state.index}>
        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.tag.message.confirmation" count={this.props.selectedRecordIds.count()} />

          {this.props.tagCategories.map((tag) => {
              return (
                <div key={tag.get("id")} className="form-group">
                    <label>
                      <input type="checkbox" />
                      test
                    </label>
                  </div>
              );
            })}
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.tag.message.progress" />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.tag.message.acknowledgement" count={this.props.selectedRecordIds.count()} />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.tag.message.cancelled" />
        </div>
      </ModalForEach>
    );
  }
});
