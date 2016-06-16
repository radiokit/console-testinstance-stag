import React from 'react';
import connect from 'immview-react-connect';
import { debounce } from 'lodash';
import FilePickerWidget from './file_picker_widget.jsx';
import FilesDomain from '../../../../services/FilesDomain';

const recentFilesLimit = 10;
const searchFiles = debounce((input, userAccountID) => {
  FilesDomain.searchFiles(input, userAccountID);
}, 200);

const FilePicker = React.createClass({
  propTypes: {
    availableUserAccounts: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onClearInput: React.PropTypes.func,
    // connector
    files: React.PropTypes.object.isRequired,
    isLoadingFiles: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      displayRecent: true,
    };
  },

  componentDidMount() {
    const { availableUserAccounts } = this.props;

    (availableUserAccounts || []).forEach(
      userAccount => {
        FilesDomain.loadRecentFiles(recentFilesLimit, userAccount.get('id'));
      }
    );
  },

  getFiles() {
    return this.props.files;
  },

  getTimeSortedFiles() {
    return this.getFiles()
      .sort(
        (a, b) => (new Date(a.get('updated_at')) - new Date(b.get('updated_at')))
      );
  },

  getRecentFiles() {
    return this.getTimeSortedFiles().take(recentFilesLimit);
  },

  handleInputChange(input) {
    const { availableUserAccounts } = this.props;

    (availableUserAccounts || []).forEach(
      userAccount => {
        searchFiles(input, userAccount.get('id'));
      }
    );

    if (input === '') {
      this.setState({ displayRecent: true });
      this.props.onClearInput();
    } else if (this.state.displayRecent) {
      this.setState({ displayRecent: false });
    }
  },

  render() {
    return (
      <FilePickerWidget
        {...this.props}
        files={this.state.displayRecent ? this.getRecentFiles() : this.getFiles()}
        onInputChange={this.handleInputChange}
        isLoading={this.props.isLoadingFiles}
      />
    );
  },
});

export default connect(
  FilePicker,
  FilesDomain,
  (FilesDomainState) => {
    const files = FilesDomainState
      .get('files')
      .filter(
        (record) => record
          .get('metadata_items')
          .find((metadataItem) => metadataItem.get('value_duration') !== null)
      );

    const isLoadingFiles = FilesDomainState.get('loading');

    return {
      files,
      isLoadingFiles,
    };
  }
);
