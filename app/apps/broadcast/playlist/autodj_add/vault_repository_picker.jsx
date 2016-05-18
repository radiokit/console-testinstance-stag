import React from 'react';
import connect from 'immview-react-connect';
import { debounce } from 'lodash';
import ConsoleAutosuggest from '../../../../widgets/admin/console_autosuggest.jsx';
import RepositoriesDomain from '../../../../services/RepositoriesDomain';

import queryFits from '../../../../helpers/query_fits';

const searchFiles = debounce(
  query => RepositoriesDomain.searchRepositories(query, { maxAge: 60000 }),
  1000
);

const getRepositoryName = repository => repository.get('name', '');

const repositoryQualifies =
  query =>
    repository => queryFits(getRepositoryName(repository), query);

const filterRepositories =
  query =>
    collection =>
      collection.filter(repositoryQualifies(query));


const VaultRepositoryPicker = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    // connector
    repositories: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return { query: null };
  },

  componentWillMount() {
    searchFiles('');
  },

  handleInputChange(event, { newValue, method }) {
    this.setState({ query: newValue });
    console.log('searching for', newValue);
    searchFiles(newValue);
  },

  handleValueChange(_, { suggestion }) {
    const { onChange = () => null } = this.props;
    onChange(suggestion);
    this.setState({ query: null });
  },

  renderRepository(repository) {
    return (
      <div>{getRepositoryName(repository)}</div>
    );
  },

  render() {
    const { value } = this.props;
    const valueName = value ? getRepositoryName(value) : '';
    const { query } = this.state;
    const qualifier = query ? filterRepositories(query) : v => v;
    const repositories = qualifier(this.props.repositories)
      .toList()
      .sortBy(getRepositoryName)
      .take(100)
      ;
    const inputValue = query === null ? valueName : query;
    const inputProps = {
      value: inputValue,
      onChange: this.handleInputChange,
      type: 'search',
      placeholder: 'Pick a repository',
    };
    return (
      <ConsoleAutosuggest
        id="vaultpicker"
        suggestions={repositories.toArray()}
        renderSuggestion={this.renderRepository}
        onSuggestionsUpdateRequested={() => null}
        getSuggestionValue={() => inputValue}
        inputProps={inputProps}
        onSuggestionSelected={this.handleValueChange}
      />
    );
  },
});

export default connect(
  VaultRepositoryPicker,
  RepositoriesDomain,
  (data) => ({
    repositories: data.get('entities'),
  })
);
