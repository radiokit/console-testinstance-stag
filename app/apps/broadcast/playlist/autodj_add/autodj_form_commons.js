import {
  Map,
} from 'immutable';

export const STEPS_NAMES = [
  'type',
  'repository',
  'details',
  'time',
  'plan',
  'finishing',
];

export const AUTODJ_OPTIONS = [
  'shuffle',
  // 'rotation', sending
  // TODO 'query', form, validation, sending
];

export const EMPTY_RANGE = Map({
  start: Map({
    hour: 0,
    minutes: 0,
    seconds: 0,
  }),
  end: Map({
    hour: 0,
    minutes: 0,
    seconds: 0,
  }),
});

export const EMPTY_WEEKDAYS = Map();

export const EMPTY_MODEL = Map({
  type: AUTODJ_OPTIONS[0],
  repository: null,
  weeklyplan: null,
  weekdays: EMPTY_WEEKDAYS,
  hours: EMPTY_RANGE,
});
