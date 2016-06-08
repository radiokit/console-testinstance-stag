import React from 'react';
import SimpleConsoleAutosuggest from './simple_console_autosuggest.jsx';

import counterpart from 'counterpart';
import localePL from './contenttype_picker_pl';
import localeEN from './contenttype_picker_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

function getContentTypeName(contentType) {
  return contentType.get('name') || counterpart('ContentTypePicker.noName');
}

const ContentTypePicker = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    items: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <SimpleConsoleAutosuggest
        {...this.props}
        placeholder={this.props.placeholder || counterpart('ContentTypePicker.placeholder')}
        getItemName={getContentTypeName}
      />
    );
  },
});

export default ContentTypePicker;
