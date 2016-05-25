import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import ProgressModal from '../../../../widgets/admin/modal_progress_widget.jsx';
import RadioKit from '../../../../services/RadioKit';
import FilePicker from './file_picker.jsx';

import './schedule_item_modal.scss';
const ScheduleItemModal = React.createClass({
  propTypes: {
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
      file: this.isUpdating() ? this.props.record : null,
      startDate: this.getInitialStartDate(),
      stopDate: this.getInitialStopDate(),
      name: null,
      duration: this.getInitialDuration(),
      expanded: false,
    };
  },

  getInitialStartDate() {
    return this.props.record
      ? this.props.record.get('start_at')
      : moment(this.props.defaultTimeOffset).add(1, 'hour').startOf('hour');
  },

  getInitialStopDate() {
    return this.props.record
      ? this.props.record.get('stop_at')
      : null;
  },

  getInitialDuration() {
    return this.props.record
      ? this.calculateDuration(this.props.record)
      : null;
  },


  createScheduleItem() {
    this.recordCall = RadioKit
    .record('plumber', 'Media.Input.File.RadioKit.Vault')
    .on('loading', () => this.changeStep('progress'))
    .on('loaded', () => this.changeStep('acknowledgement'))
    .on('error', () => this.changeStep('error'))
    .create(this.buildScheduleItem());
  },

  updateScheduleItem() {
    this.recordCall = RadioKit
    .record('plumber', 'Media.Input.File.RadioKit.Vault', this.props.record.get('id'))
    .on('loading', () => this.changeStep('progress'))
    .on('loaded', () => this.changeStep('acknowledgement'))
    .on('error', () => this.changeStep('error'))
    .update(this.buildScheduleItem());
  },

  buildScheduleItem() {
    const scheduleItem = {};
    scheduleItem.name = this.state.name;
    scheduleItem.start_at = moment(this.state.startDate).subtract(15, 'seconds').toISOString();
    scheduleItem.cue_in_at = moment(this.state.startDate).toISOString();
    scheduleItem.cue_out_at = moment(this.state.stoptDate).toISOString();
    scheduleItem.stop_at = moment(this.state.stoptDate).add(15, 'seconds').toISOString();
    if (!this.isUpdating()) {
      scheduleItem.file = this.state.file.get('id');
    }
    return scheduleItem;
  },

  handleCancel() {
    this.changeStep('cancelled');
  },

  handleConfirm() {
    if (this.isUpdating()) {
      this.updateScheduleItem();
    } else {
      this.createScheduleItem();
    }
  },

  isUpdating() {
    return this.props.record;
  },

  calculateDuration(file) {
    const duration = (
      file.get('stop_at')
      ? file.get('stop_at').diff(file.get('start_at'))
      : file.get('metadata_items')
          .find((metadataItem) => metadataItem.get('value_duration') !== null)
          .get('value_duration')
    );
    return duration;
  },

  changeStep(step) {
    this.setState({ step });
  },

  handleSelectedFile(file) {
    if (file) {
      // console.log("FILE: ");
      // console.log(file.toJS());
      const duration = this.calculateDuration(file);
      const stopDate = moment(this.state.startDate).add(duration, 'ms');
      this.setState({ file, duration, stopDate });
    } else {
      this.setState({ file: null });
    }
  },

  handleStartDateChange(startDate) {
    const stopDate = moment(startDate).add(this.state.duration, 'ms');
    this.setState({ startDate, stopDate });
  },

  handleNameChange(name) {
    this.setState({ name });
  },

  onClearInput() {
    this.setState({ file: null });
  },

  handleSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  show() {
    this.refs.modal.show();
    this.setState(this.getInitialState());
  },


  renderFileInput() {
    if (!this.isUpdating()) {
      return (
        <div className="form-group">
          <Translate
            component="label"
            content={ `${this.props.contentPrefix}.form.file.label` }
            htmlFor="fileNameInput"
          />
          <span className="twitter-typeahead">
            <FilePicker
              placeholder= {Counterpart.translate(`${this.props.contentPrefix}.form.file.hint`)}
              value={this.state.file}
              onChange={this.handleSelectedFile}
              onClearInput={this.onClearInput}
              id="fileNameInput"
              className="input-group-content"
            />
          </span>
        </div>
      );
    }
    return (
      <div className="form-group">
        <Translate
          component="label"
          content={ `${this.props.contentPrefix}.form.file.label` }
          htmlFor="fileNameInput"
        />
        <input
          id="fileNameInput"
          value={this.props.record.get('name')}
          readOnly="true"
          disabled
          type="text"
          className="form-control ScheduleItemModal__input--readOnly"
        />
      </div>
    );
  },

  toggleExpansion() {
    this.setState({ expanded: !this.state.expanded });
  },

  renderDateInputs() {
    if (this.state.file) {
      return (
        <div>
          <div className="form-group">
            <Translate
              component="label"
              content={ `${this.props.contentPrefix}.form.start_at.label` }
              htmlFor="startDate"
            />
            <input
              id="startDate"
              type="datetime-local"
              className="form-control"
              step={1}
              onChange={(e) => this.handleStartDateChange(e.target.value)}
              value={moment(this.state.startDate).format('YYYY-MM-DDTHH:mm:ss')}
            />
          </div>
          <div className="form-group">
            <Translate
              component="label"
              content={ `${this.props.contentPrefix}.form.stop_at.label` }
              htmlFor="stoptDate"
            />
            <input
              id="stopDate"
              type="datetime-local"
              className="form-control"
              step={1}
              readOnly
              disabled
              value={moment(this.state.stopDate).format('YYYY-MM-DDTHH:mm:ss')}
            />
          </div>
        </div>
      );
    }
    return null;
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
          {this.renderDescrptionFields()}
        </div>
      </div>
    );
  },

  renderDescrptionFields() {
    return (
      <div className="form-group">
        <Translate
          component="label"
          content={ `${this.props.contentPrefix}.form.name.label` }
          htmlFor="nameInput"
        />
        <input
          id="nameInput"
          type="text"
          className="form-control"
          onChange={(e) => this.handleNameChange(e.target.value)}
          value={this.state.name}
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
        disableProceed={!this.state.file}
      >
        <div className="ScheduleItemModal modal-body">
          {this.renderFileInput()}
          {
            (() => {
              if (this.state.file) {
                return (
                  <div>
                    {this.renderDateInputs()}
                    {this.renderOptionalFields()}
                  </div>
                );
              }
              return null;
            })()
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

  onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  onCancel() {
    if (this.recordCall) {
      this.recordCall.teardown();
    }
  },
});

export default ScheduleItemModal;
