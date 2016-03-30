import React from 'react';
import Immutable from 'immutable';
import Moment from 'moment';
import { Data } from 'radiokit-api';

import CreateModal from './crud/create_modal.jsx';
import DeleteModalWithSelect from './crud/delete_modal_with_select.jsx';
import ToolbarGroup from './toolbar_group_widget.jsx';
import ToolbarButtonModal from './toolbar_button_modal_widget.jsx';

const ScheduleDayCrudButtons = React.createClass({
  contextTypes: {
    data: React.PropTypes.object.isRequired
  },

  propTypes: {
    availablePlumberFiles: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      loadedFiles: false,
      availableVaultFiles: new Immutable.Seq().toIndexedSeq(),
      now: Moment.utc()
    }
  },

  componentDidMount: function() {
    this.context.data
      .query("vault", "Data.Record.File")
      .select("id", "name")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          });
        }
      }).on("fetch", (_event, _query, data) => {
        if (this.isMounted()) {
          if (data.count() != 0) {
            this.setState({
              availableVaultFiles: data.toIndexedSeq()
            });
          }
        }
      }).fetch();
  },

  getFilesData: function() {
    return this.state.availableVaultFiles.toList().map(file => {
      return {
        id: Data.buildRecordGlobalID("vault", "Data.Record.File", file.get("id")),
        name: file.get("name")
      };
    });
  },

  preparePlumberFiles: function(plumberFiles) {
    return plumberFiles.map(file => {
      return {
        id: file.get("id"),
        name: file.get("id") + " : " + file.get("start_at").toISOString() + " - " + file.get("stop_at").toISOString()
      };
    });
  },

  buildNewForm: function() {
    return {
      location: {
        type: "object",
        values: this.getFilesData()
      },
      name: {
        type: "string"
      },
      start_at: {
        type: "datetime",
        value: Moment.utc().toISOString()
      },
      stop_at: {
        type: "datetime",
        value: Moment.utc().clone().add(1, "minute").toISOString()
      },
    };
  },

  buildEditForm: function() {
    // TODO: returning proper form
    return this.buildNewForm();
  },

  buildDeleteForm: function() {
    return {
      recordId: {
        type: "object",
        values: this.preparePlumberFiles(this.props.availablePlumberFiles)
      }
    }
  },

  render: function() {
    return (
      <ToolbarGroup position="right">
        <ToolbarButtonModal
            icon="plus"
            labelTextKey="apps.broadcast.playlist.add_button"
            modalElement={CreateModal}
            modalProps={{
              contentPrefix: "apps.broadcast.playlist.add_button",
              form: this.buildNewForm(),
              app: "plumber",
              model: "Media.Input.File.Http"
            }} />

        <ToolbarButtonModal
            icon="folder"
            labelTextKey="apps.broadcast.playlist.update_button"
            modalElement={CreateModal}
            modalProps={{
              contentPrefix: "apps.broadcast.playlist.edit_button",
              form: this.buildEditForm(),
              app: "plumber",
              model: "Media.Input.File.Http"
            }} />

        <ToolbarButtonModal
            icon="delete"
            labelTextKey="apps.broadcast.playlist.delete_button"
            modalElement={DeleteModalWithSelect}
            modalProps={{
              contentPrefix: "apps.broadcast.playlist.delete_button",
              form: this.buildDeleteForm(),
              app: "plumber",
              model: "Media.Input.File.Http",
            }} />
      </ToolbarGroup>
    );
  }
});

module.exports = ScheduleDayCrudButtons;
