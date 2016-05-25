import React from 'react';
import connect from 'immview-react-connect';
import moment from 'moment';
import FilePickerWidget from './file_picker_widget.jsx';
import FilesDomain from '../../../../services/FilesDomain';

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
    FilesDomain.loadFiles();
  },

  handleInputChange(input) {
    // todo stuff
    console.log(this.props.files.count());

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
        moment(a.get('updated_at')).isAfter(b.get('updated_at')) ? -1 : 1)
      ).take(20);
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
      .filter((record) => record.get('stage') === 'current')
      .filter(
        (record) => record
          .get('metadata_items')
          .find((metadataItem) => metadataItem.get('value_duration') !== null)
      )

  ), (data) => ({
    files: data,
  })
);
