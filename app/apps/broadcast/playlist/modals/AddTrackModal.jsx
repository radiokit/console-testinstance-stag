import React, { PropTypes } from 'react';
import Translate from 'react-translate-component';

import ModalWidget from '../../../../widgets/admin/modal_widget.jsx';
import LoadingWidget from '../../../../widgets/general/loading_widget.jsx';
import FilePickerWidget from '../../../../widgets/vault/file_picker_widget.jsx';
import RadioKit from '../../../../services/RadioKit';
import ScheduleItemForm from './ScheduleItemForm.jsx';
import 'whatwg-fetch';
import './AddTrackModal.scss';

const AddTrackModal = React.createClass({
  propTypes: {
    offset: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
  },

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
      fileSearch: '',
      modalSize: 'normal',
      modalTitle: 'apps.broadcast.playlist.add_modal.account',
    };
    const availableAccounts = this.context.availableAccounts;

    if (availableAccounts.size === 1) {
      this.fetchRepositories(availableAccounts.first().get('id'));

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
    }, () => {
      this.fetchRepositories(account.get('id'));
    });
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
    this.setState({ loading: false, loaded: true }, this.props.onSave);
  },

  onScheduleItemError(error) {
    this.setState({
      loading: false,
      error,
    });
  },

  fetchRepositories(accountId) {
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
      .where('references', 'deq', 'user_account_id', accountId)
      .order('name', 'asc')
      .on('fetch', this.onFetchRepositoriesSuccess)
      .on('error', this.onFetchRepositoriesFailure)
      .fetch();
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
      const lineupBaseUrl = this.context.currentBroadcastChannel.get('lineup_base_url');
      const lineupChannelId = this.context.currentBroadcastChannel.get('lineup_channel_id');

      if(lineupBaseUrl === '' ||
         lineupBaseUrl === null || 
         lineupChannelId === '' || 
         lineupChannelId === null) {
        
        // Deprecated backend for storing playlist
        RadioKit
          .record('plumber', 'Media.Input.File.RadioKit.Vault')
          .on('loaded', this.onScheduleItemSaved)
          .on('error', this.onScheduleItemError)
          .create(scheduleItem);
      
      } else {
        const formData = new FormData();

        formData.append('file_name', track.name);
        formData.append('file_id', this.state.file.get('id'));
        formData.append('cue_in_at', track.startDate.format("YYYY-MM-DDTHH:mm:ss")); // Do not send time zone
        formData.append('cue_out_at', track.endDate.format("YYYY-MM-DDTHH:mm:ss")); // Do not send time zone

        const that = this;

        fetch(`${lineupBaseUrl}/api/lineup/v1.0/channel/${lineupChannelId}/playlist/track`, {
          method: 'POST',
          body: formData,
        }).then(function(response) {
          that.onScheduleItemSaved();
        }).catch(function(error) {
          that.onScheduleItemError();
        });
      }
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
      <FilePickerWidget
        limit={50}
        onFileChoose={this.onFileSelect}
        repository={this.state.repository}
      />
    );
  },

  renderForm() {
    return (
      <ScheduleItemForm
        offset={this.props.offset}
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
