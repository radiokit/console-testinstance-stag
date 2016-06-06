import {
  Map,
  List,
} from 'immutable';
import {
  range,
  reduce,
} from 'lodash';

function validateWeekdays(weekdays = Map()) {
  return [
    !reduce(
      range(0, 7),
      (anyDaySelected, day) => anyDaySelected || weekdays.get(day, false),
      false
    ) && ('AutoDJFormSender.noDateSelected'),
  ];
}

function hourToSeconds(hour = Map()) {
  return (hour.get('hour') | 0) * 3600 +
    (hour.get('minutes') | 0) * 60 +
    (hour.get('seconds') | 0);
}

function validateHourRange(hours = Map()) {
  return [
    !hours.get('start') && ('AutoDJFormSender.noStartHour'),
    !hours.get('end') && ('AutoDJFormSender.noEndHour'),
    (hourToSeconds(hours.get('start')) > hourToSeconds(hours.get('end'))) &&
      'AutoDJFormSender.startAfterEndError',
  ];
}

function validateRotationDetails(details = Map()) {
  return [
    details.get('tags', List()).count() === 0 && ('AutoDJFormSender.noTagsError'),
  ];
}

function validateShuffleInput(input = Map()) {
  return [
    (typeof input.get('tag') !== 'object') && ('AutoDJFormSender.tagMissingError'),
    (typeof input.get('ratio') !== 'number') && ('AutoDJFormSender.ratioMissingError'),
  ];
}

function validateShuffleDetails(details = Map()) {
  return [
    details.get('tags', List()).count() === 0 && ('AutoDJFormSender.noTagsError'),
    ...details
      .get('tags', List())
      .map(validateShuffleInput)
      .reduce((result, errors) => result.concat(errors), []),
  ];
}

function validateNothing() {
  return [];
}

export default function validateForm(form = Map()) {
  return [
    !form.get('type') && ('AutoDJFormSender.noTypeError'),
    !form.get('weeklyplan') && ('AutoDJFormSender.noContentTypeError'),
    !form.get('repository') && ('AutoDJFormSender.noRepositoryError'),
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

