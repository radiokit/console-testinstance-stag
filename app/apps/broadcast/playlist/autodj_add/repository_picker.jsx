import React from 'react';
import SimpleConsoleAutosuggest from '../../../../widgets/autosuggest/simple_console_autosuggest.jsx';

const getRepositoryName = repository => repository.get('name', '');

const RepositoryPicker = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    repositories: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      placeholder: 'Pick a repository',
    };
  },

  render() {
    return (
      <SimpleConsoleAutosuggest
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange}
        onInputChange={this.props.onInputChange}
        items={this.props.repositories}
        getItemName={getRepositoryName}
      />
    );
  },
});

export default RepositoryPicker;
