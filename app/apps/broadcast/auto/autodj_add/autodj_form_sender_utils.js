import {
  Map,
  List,
} from 'immutable';
import RadioKit from '../../../../services/RadioKit';
import sprintf from 'tiny-sprintf';
import validateForm from './autodj_form_sender_validator';

export {
  validateForm,
  shuffleFormToWeeklyItem,
  formToWeeklyItem,
  sendWeeklyItem,
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function formToWeeklyItem(form) {
  const transformer = ({
    shuffle: shuffleFormToWeeklyItem,
  })[form.get('type')];
  if (!transformer) {
    throw new Error('AutoDJFormSender:utils:formToWeeklyItem - No type of details selected');
  }
  return transformer(form);
}

function shuffleFormToWeeklyItem(form) {
  return Map({
    name: form.getIn(['name']),
    broadcast_content_type_id: form.getIn(['weeklyplan', 'id']),
    time_start: formatHour(form.getIn(['hours', 'start'])),
    time_stop: formatHour(form.getIn(['hours', 'end'])),
    on_monday: form.getIn(['weekdays', 0], false),
    on_tuesday: form.getIn(['weekdays', 1], false),
    on_wednesday: form.getIn(['weekdays', 2], false),
    on_thursday: form.getIn(['weekdays', 3], false),
    on_friday: form.getIn(['weekdays', 4], false),
    on_saturday: form.getIn(['weekdays', 5], false),
    on_sunday: form.getIn(['weekdays', 6], false),
    tag_contents: form
      .getIn(['details', 'tags'], List())
      .map(tagItem => Map({
        name: tagItem.getIn(['tag', 'name']),
        item_id: tagItem.getIn(['tag', 'id']),
        percentage: Math.round(tagItem.getIn(['ratio']) * 100),
      })),
  });
}

function formatHour(hour = Map()) {
  return `${
    sprintf('%02s', hour.get('hour') | 0)
    }:${
    sprintf('%02s', hour.get('minutes') | 0)
    }:${
    sprintf('%02s', hour.get('seconds') | 0)
    }`;
}

export function sendWeeklyItem(entity) {
  return new Promise(
    (resolve, reject) => {
      RadioKit
        .record('agenda', 'Schedule.Weekly.Item')
        .on('loaded', resolve)
        .on('warning', reject)
        .on('error', reject)
        .create(entity)
      ;
    }
  );
}
