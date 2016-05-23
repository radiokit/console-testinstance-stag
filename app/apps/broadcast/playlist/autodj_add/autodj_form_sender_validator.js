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
      (anyDaySelected, day) => anyDaySelected || weekdays.get(`day${day}`, false),
      false
    ) && ('AutoDJFormSender.noDateSelected'),
  ];
}

function validateHourRange(hours = Map()) {
  return [
    !hours.get('start') && ('AutoDJFormSender.noStartDate'),
    !hours.get('end') && ('AutoDJFormSender.noEndDate'),
  ];
}

function validateRotationDetails(details = Map()) {
  return [
    details.get('tags', List()).count() === 0 && ('AutoDJFormSender.noTagsError'),
    ...validateWeekdays(details.get('weekdays')),
    ...validateHourRange(details.get('hours')),
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
    ...validateWeekdays(details.get('weekdays')),
    ...validateHourRange(details.get('hours')),
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
    !form.get('repository') && ('AutoDJFormSender.noRepositoryError'),
    !form.get('details') && ('AutoDJFormSender.noDetailsError'),
    ...({
      shuffle: validateShuffleDetails,
      rotation: validateRotationDetails,
      none: validateNothing,
    })[form.get('type', 'none')](form.get('details')),
  ].filter(v => !!v);
}

