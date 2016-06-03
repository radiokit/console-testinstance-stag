import React from 'react';
import SimpleConsoleAutosuggest from './simple_console_autosuggest.jsx';

import counterpart from 'counterpart';
import localePL from './weeklyplan_picker_pl';
import localeEN from './weeklyplan_picker_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

function getWeeklyPlanName(weeklyplan) {
  return weeklyplan.get('name') || counterpart('WeeklyPlanPicker.noName');
}

const WeeklyPlanPicker = React.createClass({
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
        placeholder={this.props.placeholder || counterpart('WeeklyPlanPicker.placeholder')}
        getItemName={getWeeklyPlanName}
      />
    );
  },
});

export default WeeklyPlanPicker;
