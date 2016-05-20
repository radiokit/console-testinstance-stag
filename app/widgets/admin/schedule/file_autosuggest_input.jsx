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
    value: React.PropTypes.string.isRequired,
    selectedFile: React.PropTypes.object,
    onValueChanged: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      suggestions: [],
    };
  },

  getSuggestions() {
    const lowercaseValue = this.props.value.toLowerCase();
    if (lowercaseValue === '') {
      return [];
    }
    return this.props.data.filter((item) =>
      item.get(this.props.searchKey).toLowerCase().includes(lowercaseValue)
    ).take(this.props.limit || this.props.data.count()).toJS();
  },

  onChange(event, { newValue }) {
    this.props.onValueChanged(newValue);
  },

  onBlur() {
    const newValue = this.props.selectedFile ? this.props.selectedFile.name : '';
    this.props.onValueChanged(newValue);
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
    const inputProps = {
      placeholder: this.props.placeholder || '',
      value: this.props.value,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };
    return (
      <span className="twitter-typeahead">
        <ConsoleAutosuggest
          suggestions={this.state.suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          focusInputOnSuggestionClick={false}
        />
      </span>
    );
  },
});

export default FileAutosuggestInput;
