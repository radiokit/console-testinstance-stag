import React from 'react';
import ProgressModal from '../../../widgets/admin/modal_progress_widget.jsx';
import FileAutosuggestInput from '../../../widgets/admin/schedule/file_autosuggest_input.jsx';
import moment from 'moment';
import classnames from 'classnames';

import './schedule_item_modal.scss';
const ScheduleItemModal = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
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
      file: this.props.record,
      startDate: this.props.record ? this.props.record.get('start_at') : moment(),
      stopDate: '',
      expanded: false,
    };
  },

  handleCancel() {
    this.changeStep('cancelled');
  },

  handleConfirm() {
    // TODO do stuff
    this.changeStep('progress');
  },

  changeStep(step) {
    this.setState({ step });
  },

  handleSelectedFile(file) {
    this.setState({ file });
  },

  handleStartDateChange(startDate){
    this.setState({ startDate });
  },

  onSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  show() {
    this.refs.modal.show();
    this.setState(this.getInitialState());
  },

  renderFileInput() {
    if (!this.props.record) {
      return (
        <div className="form-group">
          <label htmlFor="fileNameInput"> File name </label>
          <FileAutosuggestInput
            data={this.props.data}
            placeholder="Search file name"
            searchKey="name"
            limit={15}
            className="input-group-content"
            id="fileNameInput"
            onFileSelected= {this.handleSelectedFile}
          />
        </div>
      );
    }
    else {
      return (
        <div className="form-group">
          <label htmlFor="fileNameInput"> File name </label>
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
    }
  },

  toggleExpansion(){
    this.setState({expanded: !this.state.expanded});
  },

  renderDateInputs() {
    if (this.state.file) {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="startDate"> Start at </label>
            <input
              id="startDate"
              type="datetime-local"
              className="form-control"
              onChange={(e) => this.handleStartDateChange(e.target.value)}
              value={moment(this.state.startDate).format('YYYY-MM-DDTHH:mm:ss')}
            />
            </div>
        </div>
      );
    }
    return null;
  },

  renderOptionalFields(){

    const toggleClasses = classnames('btn btn-icon-toggle', {
      collapsed: !this.state.expanded,
    });
    const hiddedClasses = classnames('collapse', {
      in: this.state.expanded,
    });
    return (
      <div className="expanded">
        <div
          data-parent="toggle"
          data-target="optionalFields"
        >
          <a className={toggleClasses} onClick={this.toggleExpansion}>
            <i className="mdi mdi-chevron-right ScheduleItemModal__toggle" />
          </a>
          <span>
            Typ i opis
          </span>
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

  renderDescrptionFields(){
    return (
      <div>
        I am hidden!
      </div>
    );
  },

  render() {
    // todo translate stuff
    return (
      <ProgressModal
        ref="modal"
        size="normal"
        step={this.state.step}
        proceedType={this.state.proceedType}
        contentPrefix={this.props.contentPrefix}
        onShow={this.onShow}
        onHide={this.onHide}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
        proceedLabel="Dodaj do ramówki"
      >
        <div className="ScheduleItemModal modal-body">
         {this.renderFileInput()}
         {this.renderDateInputs()}
         {this.renderOptionalFields()}
        </div>
        <div>
          progress
        </div>
        <div>
          acknowledgementElement
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
