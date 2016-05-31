import React from 'react';
import SimpleConsoleAutosuggest from './simple_console_autosuggest.jsx';

import counterpart from 'counterpart';
import localePL from './tag_picker_pl';
import localeEN from './tag_picker_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

const getTagName = repository => repository.get('name', '');

const TagPicker = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    tags: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      placeholder: counterpart('TagPicker.placeholder'),
    };
  },

  render() {
    return (
      <SimpleConsoleAutosuggest
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange}
        onInputChange={this.props.onInputChange}
        items={this.props.tags}
        getItemName={getTagName}
      />
    );
  },
});

export default TagPicker;
