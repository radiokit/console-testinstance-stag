import React from 'react';
import { debounce } from 'lodash';
import ConsoleAutosuggest from '../../../../widgets/admin/console_autosuggest.jsx';

import queryFits from '../../../../helpers/query_fits';

const itemQualifies =
  (query, getItemName) =>
    item => queryFits(getItemName(item), query);

const filterItems =
  (query, getItemName) =>
    collection =>
      collection.filter(itemQualifies(query, getItemName));


const SimpleConsoleAutosuggest = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    items: React.PropTypes.object.isRequired,
    getItemName: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return { query: null };
  },

  handleInputChange(event, { newValue }) {
    const { onInputChange = () => null } = this.props;
    this.setState({ query: newValue });
    onInputChange(newValue);
  },

  handleValueChange(_, { suggestion }) {
    const { onChange = () => null } = this.props;
    onChange(suggestion);
    this.setState({ query: null });
  },

  renderRepository(item) {
    return (
      <div>{this.props.getItemName(item)}</div>
    );
  },

  render() {
    const { value, items, getItemName } = this.props;
    const valueName = value ? getItemName(value) : '';
    const { query } = this.state;
    const qualifier = query ? filterItems(query, getItemName) : v => v;
    const selectedItems = qualifier(items)
        .toList()
        .sortBy(getItemName)
        .take(100)
      ;
    const inputValue = query === null ? valueName : query;
    const inputProps = {
      value: inputValue,
      onChange: this.handleInputChange,
      type: 'search',
      placeholder: 'Pick a item',
    };
    return (
      <ConsoleAutosuggest
        id="vaultpicker"
        suggestions={selectedItems.toArray()}
        renderSuggestion={this.renderRepository}
        onSuggestionsUpdateRequested={() => null}
        getSuggestionValue={() => inputValue}
        inputProps={inputProps}
        onSuggestionSelected={this.handleValueChange}
      />
    );
  },
});

export default SimpleConsoleAutosuggest;
