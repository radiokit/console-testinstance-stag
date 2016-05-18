import React from 'react';
import ConsoleAutosuggest from '../console_autosuggest.jsx';

const FileAutosuggestInput = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    searchKey: React.PropTypes.string.isRequired,
    limit: React.PropTypes.number,
    placeholder: React.PropTypes.string,
    colorMatchingPhrase: React.PropTypes.bool,
    onFileSelected: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      value: '',
      suggestions: this.getSuggestions(''),
    };
  },

  getSuggestions(value) {
    if (value === '') {
      return [];
    }
    const lowercaseValue = value.toLowerCase();
    return this.props.data.filter((item) =>
      item.get(this.props.searchKey).toLowerCase().includes(lowercaseValue)
    ).take(this.props.limit || this.props.data.count()).toJS();
  },

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  },

  getSuggestionValue(suggestion) {
    return suggestion[this.props.searchKey];
  },

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion[this.props.searchKey]}</span>
    );
  },

  onSuggestionSelected(event, { suggestion }) {
    this.props.onFileSelected(suggestion);
  },

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  },

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.placeholder || '',
      value,
      onChange: this.onChange,
    };
    return (
      <span className="twitter-typeahead">
        <ConsoleAutosuggest
          suggestions={suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </span>
    );
  },
});

export default FileAutosuggestInput;
