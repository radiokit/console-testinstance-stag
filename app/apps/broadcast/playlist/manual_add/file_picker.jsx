import React from 'react';
import connect from 'immview-react-connect';
import FilePickerWidget from './file_picker_widget.jsx';
import FilesDomain from '../../../../services/FilesDomain';

const recentFilesLimit = 20;
const FilePicker = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onClearInput: React.PropTypes.func,
    files: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      displayRecent: true,
    };
  },

  componentDidMount() {
    FilesDomain.loadRecentFiles({ limit: recentFilesLimit });
  },

  handleInputChange(input) {
    // TODO FilesDomain.searchFiles()
    if (input === '') {
      this.setState({ displayRecent: true });
      this.props.onClearInput();
    } else {
      if (this.state.displayRecent) {
        this.setState({ displayRecent: false });
      }
    }
  },

  getRecentFiles() {
    return this.props.files
      .sort((a, b) => (
        new Date(a.get('updated_at')) - new Date(b.get('updated_at'))
      )).take(recentFilesLimit);
  },

  render() {
    return (
      <FilePickerWidget
        {...this.props}
        files={this.state.displayRecent ? this.getRecentFiles() : this.props.files}
        onInputChange={this.handleInputChange}
      />
    );
  },
});

export default connect(
  FilePicker,
  FilesDomain.map(
    (data) => data
      .get('files')
      .filter(
        (record) => record
          .get('metadata_items')
          .find((metadataItem) => metadataItem.get('value_duration') !== null)
      )

  ), (data) => ({
    files: data,
  })
);
