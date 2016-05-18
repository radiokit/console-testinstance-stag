import React from 'react';
import Autosuggest from 'react-autosuggest';

const FileAutosuggestInput = React.createClass({

  render() {

    return (
      <span className="twitter-typeahead">
        <Autosuggest
        />
      </span>
    );
  },
});

export default FileAutosuggestInput;
