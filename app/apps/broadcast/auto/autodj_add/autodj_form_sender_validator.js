import {
  Map,
  List,
} from 'immutable';
import {
  range,
  reduce,
} from 'lodash';

export {
  validateForm as default,
  validateForm,
};

function validateForm(form = Map()) {
  return [
    !form.get('type') && ('AutoDJFormSender.noTypeError'),
    !form.get('weeklyplan') && ('AutoDJFormSender.noContentTypeError'),
    !form.get('details') && ('AutoDJFormSender.noDetailsError'),
    ...validateWeekdays(form.get('weekdays')),
    ...validateHourRange(form.get('hours')),
    ...({
      shuffle: validateShuffleDetails,
      rotation: validateRotationDetails,
      none: validateNothing,
    })[form.get('type', 'none')](form.get('details')),
  ].filter(v => !!v);
}

function validateNothing() {
  return [];
}

function validateWeekdays(weekdays = Map()) {
  return [
    !reduce(
      range(0, 7),
      (anyDaySelected, day) => anyDaySelected || weekdays.get(day, false),
      false
    ) && ('AutoDJFormSender.noDateSelected'),
  ];
}

function validateHourRange(hours = Map()) {
  return [
    !hours.get('start') && ('AutoDJFormSender.noStartHour'),
    !hours.get('end') && ('AutoDJFormSender.noEndHour'),
    (hourToSeconds(hours.get('start')) > hourToSeconds(hours.get('end'))) &&
      'AutoDJFormSender.startAfterEndError',
  ];
}

function hourToSeconds(hour = Map()) {
  return (hour.get('hour') | 0) * 3600 +
    (hour.get('minutes') | 0) * 60 +
    (hour.get('seconds') | 0);
}

function validateRotationDetails(details = Map()) {
  // details can be also null
  const normalizedDetails = details || Map();
  return [
    normalizedDetails.get('tags', List()).count() === 0 && ('AutoDJFormSender.noTagsError'),
  ];
}

function validateShuffleDetails(details) {
  // details can be also null
  const normalizedDetails = details || Map();
  return [
    normalizedDetails.get('tags', List()).count() === 0 && ('AutoDJFormSender.noTagsError'),
    ...normalizedDetails
      .get('tags', List())
      .map(validateShuffleInput)
      .reduce((result, errors) => result.concat(errors), []),
  ];
}

function validateShuffleInput(input = Map()) {
  return [
    (typeof input.get('tag') !== 'object') && ('AutoDJFormSender.tagMissingError'),
    (typeof input.get('ratio') !== 'number') && ('AutoDJFormSender.ratioMissingError'),
  ];
}

