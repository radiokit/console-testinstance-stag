import React from 'react';
import Immutable from 'immutable';
import Moment from 'moment';
import { Data } from 'radiokit-api';

import CreateModal from './crud/create_modal.jsx';
import UpdateModal from './crud/update_modal.jsx';
import DeleteModal from './crud/delete_modal.jsx';
import ToolbarGroup from './toolbar_group_widget.jsx';
import ToolbarButtonModal from './toolbar_button_modal_widget.jsx';

const ScheduleDayCrudButtons = React.createClass({
  contextTypes: {
    data: React.PropTypes.object.isRequired
  },

  propTypes: {
    availablePlumberFiles: React.PropTypes.object.isRequired,
    afterFormSubmit: React.PropTypes.func,
    activeItem: React.PropTypes.object
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

  getDateValue: function(key) {
    if (this.props.activeItem) {
      return this.props.activeItem.get(key).toISOString()
    }
    return Moment.utc().toISOString()
  },

  buildUpdateForm: function() {
    return {
      name: {
        type: "string"
      },
      start_at: {
        type: "datetime",
        value: this.getDateValue("start_at")
      },
      stop_at: {
        type: "datetime",
        value: this.getDateValue("stop_at")
      }
    };
  },

  onDeleteSuccess: function() {
    this.forceUpdate();
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
              model: "Media.Input.File.Http",
              afterFormSubmit: this.props.afterFormSubmit
            }} />

        <ToolbarButtonModal
            icon="folder"
            labelTextKey="apps.broadcast.playlist.update_button"
            disabled={this.props.activeItem === null}
            modalElement={UpdateModal}
            modalProps={{
              contentPrefix: "apps.broadcast.playlist.edit_button",
              form: this.buildUpdateForm(),
              app: "plumber",
              model: "Media.Input.File.Http",
              recordId: (this.props.activeItem ? this.props.activeItem.get("id") : null),
              onSuccess: this.props.afterFormSubmit
            }} />

        <ToolbarButtonModal
            icon="delete"
            labelTextKey="apps.broadcast.playlist.delete_button"
            disabled={this.props.activeItem === null}
            modalElement={DeleteModal}
            modalProps={{
              contentPrefix: "apps.broadcast.playlist.delete_button",
              app: "plumber",
              model: "Media.Input.File.Http",
              selectedRecordIds: (this.props.activeItem ? Immutable.List.of(this.props.activeItem.get("id")) : Immutable.List.of(null)), // this.props.activeItem.get("id")
              // selectedRecordIds: this.props.availablePlumberFiles.map((entry) => {return entry.get("id")}),
              onSuccess: this.props.afterFormSubmit
            }} />
      </ToolbarGroup>
    );
  }
});

export default ScheduleDayCrudButtons;
