import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import {
  fromJS,
  Map,
} from 'immutable';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import ProgressModal from '../../../../widgets/admin/modal_progress_widget.jsx';
import RadioKit from '../../../../services/RadioKit';
import FilePicker from './file_picker.jsx';
import InputLocalDateTime from '../../../../widgets/time/input_local_date_time.jsx';

import './schedule_item_modal.scss';
const ScheduleItemModal = React.createClass({
  propTypes: {
    availableUserAccounts: React.PropTypes.object.isRequired,
    currentBroadcastChannel: React.PropTypes.string.isRequired,
    currentBroadcastChannelEntity: React.PropTypes.object.isRequired,
    defaultTimeOffset: React.PropTypes.number.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    record: React.PropTypes.object,
    acknowledgementElement: React.PropTypes.oneOfType(
      [React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]
    ),
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {
      proceedType: 'primary',
      step: 'confirmation',
      expanded: false,
      model: this.getInitialModel(),
    };
  },

  getInitialModel() {
    const scheduleItemToEdit = this.getProvidedScheduleItem();
    if (scheduleItemToEdit) {
      return scheduleItemToModel(scheduleItemToEdit);
    }
    return getDefaultModel();
  },

  getProvidedScheduleItem() {
    return this.props.record;
  },

  getEditedModel() {
    return this.state.model || this.getInitialModel();
  },

  setEditedModel(model) {
    this.setState({ model });
  },

  getEditedScheduleItem() {
    const scheduleItem = modelToScheduleItem(this.getEditedModel());
    scheduleItem.references = {
      broadcast_channel_id: this.props.currentBroadcastChannel,
    };
    return scheduleItem;
  },

  getFile() {
    const model = this.getEditedModel();
    if (model.file) {
      return Map({ id: model.file });
    }
    return null;
  },

  onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  onCancel() {
  },

  saveModel() {
    if (this.getProvidedScheduleItem()) {
      this.updateScheduleItem();
    } else {
      this.createScheduleItem();
    }
  },

  createScheduleItem() {
    this.changeStep('progress');
    saveScheduleItem(this.getEditedScheduleItem())
      .then(() => this.changeStep('acknowledgement'))
      .catch(() => this.changeStep('error'));
  },

  updateScheduleItem() {
    this.changeStep('progress');
    deleteScheduleItem(this.getProvidedScheduleItem())
      .then(() => saveScheduleItem(this.getEditedScheduleItem()))
      .then(() => this.changeStep('acknowledgement'))
      .catch(() => this.changeStep('error'));
  },

  clearFile() {
    const model = this.getEditedModel();
    const newModel = { ...model, name: null, file: null, end: model.start };
    this.setEditedModel(newModel);
  },

  handleCancel() {
    this.changeStep('cancelled');
  },

  handleConfirm() {
    this.saveModel();
  },

  changeStep(step) {
    this.setState({ step });
  },

  handleSelectedFile(file) {
    const model = this.getEditedModel();
    if (file) {
      const newModel = {
        ...model,
        file: getFileId(file),
        end: model.start + getFileDuration(file),
        name: model.name || getFileName(file),
      };
      this.setEditedModel(newModel);
    } else {
      this.clearFile();
    }
  },

  handleStartDateChange(startDate) {
    const model = this.getEditedModel();
    const duration = model.end - model.start;
    const start = new Date(startDate).valueOf();
    const end = start + duration;
    const newModel = { ...model, start, end };
    this.setEditedModel(newModel);
  },

  handleNameChange(name) {
    const model = this.getEditedModel();
    const newModel = { ...model, name };
    this.setEditedModel(newModel);
  },

  handleClearInput() {
    this.clearFile();
  },

  handleSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  show() {
    this.refs.modal.show();
    this.setState(this.getInitialState());
  },

  toggleExpansion() {
    this.setState({ expanded: !this.state.expanded });
  },

  renderFileInput() {
    return (
      <div className="form-group">
        <Translate
          component="label"
          content={ `${this.props.contentPrefix}.form.file.label` }
          htmlFor="fileNameInput"
        />
        <span className="twitter-typeahead">
          <FilePicker
            availableUserAccounts={this.props.availableUserAccounts}
            placeholder={Counterpart.translate(`${this.props.contentPrefix}.form.file.hint`)}
            value={this.getFile()}
            onChange={this.handleSelectedFile}
            onClearInput={this.handleClearInput}
            id="fileNameInput"
            className="input-group-content"
          />
        </span>
      </div>
    );
  },

  renderDateInputs() {
    return (
      <div>
        <div className="form-group">
          <Translate
            component="label"
            content={ `${this.props.contentPrefix}.form.start_at.label` }
            htmlFor="startDate"
          />
          <InputLocalDateTime
            value={tsToIso(this.getEditedModel().start)}
            onChange={this.handleStartDateChange}
            tz={this.props.currentBroadcastChannelEntity.get('timezone')}
          />
        </div>
        <div className="form-group">
          <Translate
            component="label"
            content={ `${this.props.contentPrefix}.form.stop_at.label` }
            htmlFor="stoptDate"
          />
          <InputLocalDateTime
            disabled
            value={tsToIso(this.getEditedModel().end)}
            tz={this.props.currentBroadcastChannelEntity.get('timezone')}
          />
        </div>
      </div>
    );
  },

  renderOptionalFields() {
    const toggleClasses = classnames('btn btn-icon-toggle ScheduleItemModal__toggleButton', {
      collapsed: !this.state.expanded,
    });
    const hiddedClasses = classnames('collapse', {
      in: this.state.expanded,
    });
    return (
      <div className="expanded">
        <div
          className="ScheduleItemModal__optionalInputDivider"
          data-parent="toggle"
          data-target="optionalFields"
        >
          <a className={toggleClasses} onClick={this.toggleExpansion}>
            <i className="mdi mdi-chevron-right ScheduleItemModal__toggle" />
          </a>
          <Translate
            component="span"
            content={ `${this.props.contentPrefix}.info.type_and_desc` }
            htmlFor="startDate"
          />
        </div>
        <div id="optionalFields"
          className={hiddedClasses}
          aria-expanded={this.state.expanded}
        >
          {this.renderDescriptionFields()}
        </div>
      </div>
    );
  },

  renderDescriptionFields() {
    return (
      <div className="form-group">
        <input
          id="nameInput"
          type="text"
          className="form-control"
          onChange={(e) => this.handleNameChange(e.target.value)}
          value={this.getEditedModel().name}
        />
        <Translate
          component="label"
          content={ `${this.props.contentPrefix}.form.name.label` }
          htmlFor="nameInput"
        />
      </div>
    );
  },

  render() {
    return (
      <ProgressModal
        ref="modal"
        size="normal"
        step={this.state.step}
        proceedType={this.state.proceedType}
        contentPrefix={this.props.contentPrefix}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
        onSuccess={this.handleSuccess}
        disableProceed={!isModelValid(this.getEditedModel())}
      >
        <div className="ScheduleItemModal modal-body">
          {this.renderFileInput()}
          {
            this.getEditedModel().file
              ? (
                <div>
                  {this.renderDateInputs()}
                  {this.renderOptionalFields()}
                </div>
              )
              : null
          }
        </div>
        <div>
          <Translate
            component="p"
            content={ `${this.props.contentPrefix}.message.progress` }
          />
        </div>
        <div>
          <Translate
            component="p"
            content={ `${this.props.contentPrefix}.message.acknowledgement` }
          />
        </div>

      </ProgressModal>
    );
  },
});

export default ScheduleItemModal;

function saveScheduleItem(scheduleItem) {
  return new Promise((resolve, reject) => {
    RadioKit
      .record('plumber', 'Media.Input.File.RadioKit.Vault')
      .on('loaded', resolve)
      .on('error', reject)
      .create(scheduleItem);
  });
}

function deleteScheduleItem(scheduleItem) {
  return new Promise((resolve, reject) => {
    RadioKit
      .record('plumber', 'Media.Input.File.RadioKit.Vault', scheduleItem.get('id'))
      .on('loaded', resolve)
      .on('error', reject)
      .destroy();
  });
}

function isModelValid(model) {
  return (
    !!model.file &&
    !!model.start &&
    !!model.end
  );
}

function modelToScheduleItem(model) {
  return {
    file: model.file,
    cue_in_at: tsToIso(model.start),
    cue_out_at: tsToIso(model.end),
    start_at: tsToIso(model.start - 15 * 1000),
    stop_at: tsToIso(model.end + 15 * 1000),
    name: model.name,
  };
}

function getDefaultModel() {
  return {
    id: null,
    file: null,
    start: Date.now(),
    end: Date.now(),
    name: null,
  };
}

function scheduleItemToModel(scheduleItem) {
  return {
    file: scheduleItem.get('file'),
    start: scheduleItem.get('cue_in_at'),
    end: scheduleItem.get('cue_out_at'),
    name: scheduleItem.get('name'),
  };
}

function tsToIso(ts) {
  return new Date(ts).toISOString();
}

function getFileDuration(file) {
  return file.get('metadata_items')
    .find(
      metadataItem => metadataItem.getIn(['metadata_schema', 'key']) === 'duration'
    )
    .get('value_duration');
}

function getFileName(file) {
  return file.get('name');
}

function getFileId(file) {
  return file.get('id');
}
