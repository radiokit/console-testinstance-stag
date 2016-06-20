import React from 'react';
import SimpleConsoleAutosuggest from '../../../../widgets/autosuggest/simple_console_autosuggest.jsx';

const getFileName = file => file.get('name', '');

const FilePickerWidget = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    files: React.PropTypes.object.isRequired,
    isLoading: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      placeholder: 'Search files',
    };
  },

  render() {
    return (
      <SimpleConsoleAutosuggest
        placeholder={this.props.placeholder}
        value={
          this.props.value &&
          this.props.files.find(file => this.props.value.get('id') === file.get('id')) ||
          null
        }
        onChange={this.props.onChange}
        onInputChange={this.props.onInputChange}
        items={this.props.files}
        getItemName={getFileName}
        isLoading={this.props.isLoading}
      />
    );
  },
});

export default FilePickerWidget;
