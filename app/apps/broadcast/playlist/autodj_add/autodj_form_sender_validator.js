import {
  Map,
  List,
} from 'immutable';
import counterpart from 'counterpart';

function validateRange(range = Map()) {
  const { start, end } = range.toJS();
  return [
    !start && counterpart('AutoDJFormSender.rangeNoStartError'),
    !end && counterpart('AutoDJFormSender.rangeNoEndError'),
    new Date(start) >= new Date(end) && counterpart('AutoDJFormSender.rangeStartAfterEndError'),
  ];
}

function validateRotationDetails(details = Map()) {
  return [
    details.get('tags', List()).count() === 0 && counterpart('AutoDJFormSender.noTagsError'),
    details.get('range', List()).count() === 0 && counterpart('AutoDJFormSender.noRangeError'),
    ...validateRange(details.get('range')),
  ];
}

function validateShuffleInput(input = Map()) {
  return [
    typeof input.get('tag') !== 'object' && counterpart('AutoDJFormSender.tagMissingError'),
    typeof input.get('ratio') !== 'number' && counterpart('AutoDJFormSender.ratioMissingError'),
  ];
}

function validateShuffleDetails(details = Map()) {
  return [
    details.get('tags', List()).count() === 0 && counterpart('AutoDJFormSender.noTagsError'),
    details.get('range', List()).count() === 0 && counterpart('AutoDJFormSender.noRangeError'),
    ...validateRange(details.get('range')),
    ...details.get('tags', List()).toArray().map(validateShuffleInput),
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

