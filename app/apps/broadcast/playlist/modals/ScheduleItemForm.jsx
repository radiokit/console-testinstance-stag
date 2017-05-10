import React, { PropTypes } from 'react';
import moment from 'moment';
import Translate from 'react-translate-component';

import InputLocalDateTime from '../../../../widgets/time/input_local_date_time.jsx';
import './ScheduleItemForm.scss';

const ScheduleItemForm = React.createClass({
  propTypes: {
    timezone: PropTypes.string.isRequired,
    file: PropTypes.object.isRequired,
    schemas: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,

    initialName: PropTypes.string,
    initialStartDate: PropTypes.object,
    initialStopDate: PropTypes.object,
  },

  getInitialState() {
    const duration = this.getFileDuration();

    return {
      name: this.props.initialName || this.props.file.get('name'),
      startDate: this.props.initialStartDate || moment(),
      endDate: this.props.initialStopDate || moment().add(duration),
      optionalFieldsExpanded: false,
    };
  },

  onSave() {
    this.props.onSave({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      name: this.state.name,
    });
  },

  getFileDuration() {
    const schema = this.props.schemas
      .find(it => it.get('key') === 'duration');

    const metadata = this.props.file.get('metadata_items')
      .find(item => item.get('metadata_schema_id') === schema.get('id'));

    return metadata.get(`value_${schema.get('kind')}`);
  },

  toggleOptionalFields() {
    this.setState({
      optionalFieldsExpanded: !this.state.optionalFieldsExpanded,
    });
  },

  handleStartDateChange(startDate) {
    const duration = this.getFileDuration();

    this.setState({
      startDate: moment(startDate),
      endDate: moment(startDate).add(duration),
    });
  },

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value,
    });
  },

  renderOptionalFields() {
    if (!this.state.optionalFieldsExpanded) {
      return null;
    }

    return (
      <div className="ScheduleItemForm-optionalFields form-group">
        <input
          type="text"
          name="nameInput"
          className="form-control"
          onChange={this.handleNameChange}
          value={this.state.name}
        />
        <Translate
          component="label"
          content="apps.broadcast.playlist.form.name"
          htmlFor="nameInput"
        />
      </div>
    );
  },

  renderOptionalFieldsGroup() {
    const toggleIcon = this.state.optionalFieldsExpanded ? 'down' : 'right';

    return (
      <div className="ScheduleItemForm-optionalInputs">
        <div className="ScheduleItemForm-optionalInputs-label clearfix">
          <button className="btn btn-default" onClick={this.toggleOptionalFields}>
            <i className={`mdi mdi-chevron-${toggleIcon}`} />
            <Translate
              component="span"
              content="apps.broadcast.playlist.form.type_and_desc"
            />
          </button>
        </div>
        {this.renderOptionalFields()}
      </div>
    );
  },

  renderFormFooter() {
    return (
      <div className="ScheduleItemForm-footer clearfix">
        <Translate
          component="button"
          className="btn btn-default ScheduleItemForm-footer-cancelButton"
          content="apps.broadcast.playlist.form.cancel_button"
          onClick={this.props.onCancel}
        />
        <Translate
          component="button"
          className="btn btn-primary"
          content="apps.broadcast.playlist.form.save_button"
          onClick={this.onSave}
        />
      </div>
    );
  },

  render() {
    return (
      <div className="ScheduleItemForm">
        <div className="ScheduleItemForm-content">
          <div className="form-group">
            <Translate
              component="label"
              content="apps.broadcast.playlist.form.file_name"
            />
            <input
              disabled
              className="form-control"
              value={this.props.file.get('name')}
            />
          </div>
          <div className="form-group">
            <Translate
              component="label"
              content="apps.broadcast.playlist.form.start_at"
            />
            <InputLocalDateTime
              value={this.state.startDate.toISOString()}
              onChange={this.handleStartDateChange}
              tz={this.props.timezone}
            />
          </div>
          <div className="form-group">
            <Translate
              component="label"
              content="apps.broadcast.playlist.form.end_at"
            />
            <InputLocalDateTime
              disabled
              value={this.state.endDate.toISOString()}
              tz={this.props.timezone}
            />
          </div>
          {this.renderOptionalFieldsGroup()}
        </div>
        {this.renderFormFooter()}
      </div>
    );
  },
});

export default ScheduleItemForm;
