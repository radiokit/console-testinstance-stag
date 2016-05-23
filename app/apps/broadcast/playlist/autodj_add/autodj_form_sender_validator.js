import {
  Map,
  List,
} from 'immutable';
import {
  range,
  reduce,
} from 'lodash';
import counterpart from 'counterpart';

function validateWeekdays(weekdays = Map()) {
  return [
    !reduce(
      range(0, 7),
      (anyDaySelected, day) => anyDaySelected || weekdays.get(`day${day}`, false),
      false
    ) && counterpart('AutoDJFormSender.noDateSelected'),
  ];
}

function validateHourRange(hours = Map()) {
  return [
    !hours.get('start') && counterpart('AutoDJFormSender.noStartDate'),
    !hours.get('end') && counterpart('AutoDJFormSender.noEndDate'),
  ];
}

function validateRotationDetails(details = Map()) {
  return [
    details.get('tags', List()).count() === 0 && counterpart('AutoDJFormSender.noTagsError'),
    ...validateWeekdays(details.get('weekdays')),
    ...validateHourRange(details.get('hours')),
  ];
}

function validateShuffleInput(input = Map()) {
  return [
    (typeof input.get('tag') !== 'object') && counterpart('AutoDJFormSender.tagMissingError'),
    (typeof input.get('ratio') !== 'number') && counterpart('AutoDJFormSender.ratioMissingError'),
  ];
}

function validateShuffleDetails(details = Map()) {
  return [
    details.get('tags', List()).count() === 0 && counterpart('AutoDJFormSender.noTagsError'),
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
    !form.get('type') && counterpart('AutoDJFormSender.noTypeError'),
    !form.get('repository') && counterpart('AutoDJFormSender.noRepositoryError'),
    !form.get('details') && counterpart('AutoDJFormSender.noDetailsError'),
    ...({
      shuffle: validateShuffleDetails,
      rotation: validateRotationDetails,
      none: validateNothing,
    })[form.get('type', 'none')](form.get('details')),
  ].filter(v => !!v);
}

