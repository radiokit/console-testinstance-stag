import React, { PropTypes } from 'react';
import Translate from 'react-translate-component';

import ModalWidget from '../../../../widgets/admin/modal_widget.jsx';
import LoadingWidget from '../../../../widgets/general/loading_widget.jsx';
import TableBrowser from '../../../../widgets/admin/table_browser_widget.jsx';
import RadioKit from '../../../../services/RadioKit';
import ScheduleItemForm from './ScheduleItemForm.jsx';
import './AddTrackModal.scss';

const AddTrackModal = React.createClass({
  contextTypes: {
    availableAccounts: PropTypes.object.isRequired,
    currentBroadcastChannel: PropTypes.object.isRequired,
  },

  getInitialState() {
    const baseState = {
      account: null,
      repository: null,
      file: null,
      loading: false,
      loaded: false,
      error: null,
      modalSize: 'normal',
      modalTitle: 'apps.broadcast.playlist.add_modal.account',
    };
    const availableAccounts = this.context.availableAccounts;

    if (availableAccounts.size === 1) {
      return {
        ...baseState,
        account: availableAccounts.first(),
        modalTitle: 'apps.broadcast.playlist.add_modal.repository',
      };
    }

    return baseState;
  },

  onModalShow() {
    this.setState(this.getInitialState());
  },

  onAccountClick(account) {
    this.setState({
      account,
      loading: true,
    }, this.fetchRepositories);
  },

  onRepositoryClick(repository) {
    this.setState({
      repository,
      modalSize: 'large',
      modalTitle: 'apps.broadcast.playlist.add_modal',
    });
  },

  onFetchRepositoriesSuccess(_event, _query, repositories) {
    this.setState({
      repositories,
      loading: false,
      modalTitle: 'apps.broadcast.playlist.add_modal.repository',
    });
  },

  onFetchRepositoriesFailure(error) {
    this.setState({
      loading: false,
      error,
    });
  },

  onFileSelect(file) {
    this.setState({ file });
  },

  onScheduleItemSaved() {
    this.setState({ loading: false, loaded: true });
  },

  onScheduleItemError(error) {
    this.setState({
      loading: false,
      error,
    });
  },

  fetchRepositories() {
    RadioKit
      .query('vault', 'Data.Record.Repository')
      .select(
        'id',
        'name',
        'metadata_schemas.id',
        'metadata_schemas.name',
        'metadata_schemas.key',
        'metadata_schemas.kind',
        'metadata_schemas.tag_category_id',
      )
      .joins('metadata_schemas')
      .where('references', 'deq', 'user_account_id', this.state.account.get('id'))
      .order('name', 'asc')
      .on('fetch', this.onFetchRepositoriesSuccess)
      .on('error', this.onFetchRepositoriesFailure)
      .fetch();
  },

  buildFileAttributes() {
    return {
      name: { renderer: 'string', sortable: true },
      inserted_at: { renderer: 'datetime', sortable: true },
    };
  },

  buildFileQuery() {
    return RadioKit
      .query('vault', 'Data.Record.File')
      .select(
        'id',
        'name',
        'inserted_at',
        'stage',
        'metadata_items.id',
        'metadata_items.metadata_schema_id',
        'metadata_items.value_string',
        'metadata_items.value_db',
        'metadata_items.value_text',
        'metadata_items.value_float',
        'metadata_items.value_integer',
        'metadata_items.value_duration',
        'metadata_items.value_date',
        'metadata_items.value_datetime',
        'metadata_items.value_time',
        'metadata_items.value_file',
        'metadata_items.value_image',
        'metadata_items.value_url',
      )
      .joins('metadata_items')
      .where('record_repository_id', 'eq', this.state.repository.get('id'))
      .where('stage', 'in', 'current', 'archive');
  },

  closeModal() {
    this.refs.modal && this.refs.modal.hide && this.refs.modal.hide();
  },

  saveTrack(track) {
    const scheduleItem = {
      name: track.name,
      file: this.state.file.get('id'),
      cue_in_at: track.startDate.toISOString(),
      cue_out_at: track.endDate.toISOString(),
      references: {
        broadcast_channel_id: this.context.currentBroadcastChannel.get('id'),
      },
    };

    this.setState({ loading: true }, () => {
      RadioKit
        .record('plumber', 'Media.Input.File.RadioKit.Vault')
        .on('loaded', this.onScheduleItemSaved)
        .on('error', this.onScheduleItemError)
        .create(scheduleItem);
    });
  },

  renderAccount(account) {
    const onClick = this.onAccountClick.bind(this, account);

    return (
      <li key={account.get('id')} className="tile">
        <a onClick={onClick} className="tile-content">
          <div className="tile-text">
            {account.get('name')}
          </div>
        </a>
      </li>
    );
  },

  renderAccountPicker() {
    const accounts = this.context.availableAccounts.map(this.renderAccount);

    return (
      <ul className="list divider-full-bleed">
        {accounts}
      </ul>
    );
  },

  renderRepository(repository) {
    const onClick = this.onRepositoryClick.bind(this, repository);

    return (
      <li key={repository.get('id')} className="tile">
        <a onClick={onClick} className="tile-content">
          <div className="tile-text">
            {repository.get('name')}
          </div>
        </a>
      </li>
    );
  },

  renderRepositoryPicker() {
    if (!this.state.repositories) {
      return null;
    }

    const repositories = (this.state.repositories).map(this.renderRepository);

    return (
      <ul className="list divider-full-bleed">
        {repositories}
      </ul>
    );
  },

  renderFilePicker() {
    if (!this.state.repository) {
      return null;
    }

    return (
      <TableBrowser
        limit={50}
        recordsLinkFunc={this.onFileSelect}
        attributes={this.buildFileAttributes()}
        contentPrefix="widgets.vault.file_browser.table"
        requestFullRecords
        recordsQuery={this.buildFileQuery()}
      />
    );
  },

  renderForm() {
    return (
      <ScheduleItemForm
        file={this.state.file}
        schemas={this.state.repository.get('metadata_schemas')}
        timezone={this.context.currentBroadcastChannel.get('timezone')}
        onCancel={this.closeModal}
        onSave={this.saveTrack}
      />
    );
  },

  renderLoading() {
    if (!this.state.loading) {
      return null;
    }

    return (
      <LoadingWidget
        info
        infoTextKey="apps.broadcast.playlist.add_modal.loading"
        className="AddTrackModal-loadingWidget"
      />
    );
  },

  renderSuccessInfo() {
    return (
      <div className="AddTrackModal-errorInfo">
        <div className="modal-body">
          <Translate
            component="p"
            content="apps.broadcast.playlist.add_modal.success_info"
          />
        </div>
        <div className="modal-footer">
          <Translate
            component="button"
            className="btn btn-primary"
            content="apps.broadcast.playlist.add_modal.close_button"
            onClick={this.closeModal}
          />
        </div>
      </div>
    );
  },

  renderErrorInfo() {
    return (
      <div className="AddTrackModal-errorInfo">
        <div className="modal-body">
          <Translate
            component="p"
            content="general.errors.communication.general"
          />
        </div>
        <div className="modal-footer">
          <Translate
            component="button"
            className="btn btn-primary"
            content="apps.broadcast.playlist.add_modal.close_button"
            onClick={this.closeModal}
          />
        </div>
      </div>
    );
  },

  render() {
    let content = null;

    if (this.state.loading) {
      content = this.renderLoading();
    } else if (this.state.loaded) {
      content = this.renderSuccessInfo();
    } else if (this.state.error) {
      content = this.renderErrorInfo();
    } else if (!this.state.account) {
      content = this.renderAccountPicker();
    } else if (!this.state.repository) {
      content = this.renderRepositoryPicker();
    } else if (!this.state.file) {
      content = this.renderFilePicker();
    } else {
      content = this.renderForm();
    }

    return (
      <ModalWidget
        ref="modal"
        size={this.state.modalSize}
        contentPrefix={this.state.modalTitle}
        onShow={this.onModalShow}
      >
        {content}
      </ModalWidget>
    );
  },
});

export default AddTrackModal;
