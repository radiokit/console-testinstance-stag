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
        value={this.props.value}
        onChange={this.props.onChange}
        onInputChange={this.props.onInputChange}
        items={this.props.files}
        getItemName={getFileName}
      />
    );
  },
});

export default FilePickerWidget;
