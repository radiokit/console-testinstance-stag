import React from 'react';
import Translate from 'react-translate-component';

import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';


export default React.createClass({
  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
    metadataSchemas: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      index: 0
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onDeleteSuccess: function(record) {
    this.setState({
      index: this.state.index + 1
    });
  },


  onPerform: function(index, recordId) {

  },


  render: function() {
    return (
      <ModalForEach ref="modal" size="large" onPerform={this.onPerform} contentPrefix="widgets.vault.file_browser.modals.metadata" recordIds={this.props.selectedRecordIds} index={this.state.index}>
        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.metadata.message.confirmation" count={this.props.selectedRecordIds.count()} />

          <form className="form-horizontal" role="form">
            {this.props.metadataSchemas.map((metadataSchema) => {
              return (
                <div key={metadataSchema.get("id")} className="form-group">
                  <label className="col-sm-3 control-label">
                    {metadataSchema.get("key")}
                  </label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-3">
                    <label>
                      <input type="checkbox" />
                      <Translate component="p" content="widgets.vault.file_browser.modals.metadata.immutable" />
                    </label>
                  </div>
                </div>
              );
            })}
          </form>

        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.metadata.message.progress" />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.metadata.message.acknowledgement" count={this.props.selectedRecordIds.count()} />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.metadata.message.cancelled" />
        </div>
      </ModalForEach>
    );
  }
});
