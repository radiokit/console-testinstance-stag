import React from 'react';
// github.com/moroshko/react-autosuggest
import Autosuggest from 'react-autosuggest';
import LoadingWidget from '../general/loading_widget.jsx';

import './console_autosuggest.scss';
const ConsoleAutosuggest = React.createClass({
  propTypes: {
    suggestions: React.PropTypes.array,
    onSuggestionsUpdateRequested: React.PropTypes.func,
    getSuggestionValue: React.PropTypes.func,
    renderSuggestion: React.PropTypes.func,
    inputProps: React.PropTypes.object,
    shouldRenderSuggestions: React.PropTypes.func,
    multiSection: React.PropTypes.bool,
    renderSectionTitle: React.PropTypes.func,
    getSectionSuggestions: React.PropTypes.func,
    onSuggestionSelected: React.PropTypes.func,
    focusInputOnSuggestionClick: React.PropTypes.bool,
    id: React.PropTypes.string,
  },

  render() {
    const { theme, ...autosuggestProps } = this.props;

    return (
      <span className="twitter-typeahead">
        <Autosuggest
          {...autosuggestProps}
        />
      <LoadingWidget className="ConsoleAutosuggest__spinner" />
      </span>
    );
  },
});

export default ConsoleAutosuggest;
